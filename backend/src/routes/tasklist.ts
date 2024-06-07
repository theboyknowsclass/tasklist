// taskList.ts - Task List module.

import express from "express";
import { Task } from "../domain/task";
import { pool } from "../db";
const router = express.Router();

// Task List Get
router.get("/tasklist", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, sortOrder FROM tasks ORDER BY sortOrder ASC"
    );
    const tasks: Task[] = result.rows;
    res.send(tasks);
  } catch (error) {
    console.error("Error fetching tasks", error);
    res.sendStatus(500).json({ error: "Error fetching tasks" });
  }
});

// Task List Post
router.post("/tasklist", async (req, res) => {
  const tasks = req.body as Task[];
  if (!tasks) {
    res.sendStatus(400);
    return;
  }

  const placeHolders = [];
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

  const client = await pool.connect();
  let status = 200;
  let error = null;

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
  } catch (e) {
    error = e;
    status = 500;
    console.error("Error saving tasks", e);
    await client.query("ROLLBACK");
  } finally {
    client.release();
  }

  if (error) {
    res.status(status).json({ error });
  } else {
    res.status(status);
  }
});

export default router;
