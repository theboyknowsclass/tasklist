// taskList.ts - Task List module.

import express from "express";
const router = express.Router();

var taskList = [
  { id: "1", sortOrder: 1, name: "Task 1" },
  { id: "2", sortOrder: 2, name: "Task 2" },
];

// Task List Get
router.get("/tasklist", (req, res) => {
  res.send(taskList);
});

export default router;
