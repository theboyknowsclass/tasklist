import asyncHandler from "express-async-handler";
import { Task } from "../domain/task";
import { pool } from "../db";

export const getTasks = asyncHandler(async (_req, res, _next) => {
  try {
    const result = await pool.query(
      "SELECT id, name, sortOrder FROM tasks ORDER BY sortOrder ASC"
    );
    const tasks: Task[] = result.rows;
    res.send(tasks);
  } catch (error) {
    console.error("Error fetching tasks", error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

export const updateTasks = asyncHandler(async (req, res, _next) => {
  const tasks = req.body as Task[];

  // check for valid body
  if (!tasks) {
    res.status(400).json({ error: "No tasks provided" });
    return;
  }

  // build a list of placeholders and values for the query
  const placeHolders = []; // used to hold the placeholders for the query e.g. $1, $2, $3 etc.
  const values = [];
  let placeHolderCount = 1;

  for (const task of tasks) {
    placeHolders.push(
      `($${placeHolderCount}, $${placeHolderCount + 1}, $${
        placeHolderCount + 2
      })`
    );
    values.push(task.id, task.name, task.sortorder);
    placeHolderCount += 3;
  }

  // connect to the database
  const client = await pool.connect();

  // upsert the tasks as a transaction
  try {
    await client.query("BEGIN");
    const query = `
        INSERT INTO tasks (id, name, sortorder)
        VALUES ${placeHolders.join(", ")}
        ON CONFLICT (id)
        DO UPDATE SET
          sortorder = EXCLUDED.sortorder
      `;
    await client.query(query, values);
    await client.query("COMMIT");
    res.status(200);
  } catch (e) {
    res.status(500).json({ e });
    console.error("Error saving tasks", e);
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }
});

module.exports = { getTasks, updateTasks };
