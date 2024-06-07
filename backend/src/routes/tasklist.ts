// taskList.ts - Task List module.

import express from "express";
import { getTasks, updateTasks } from "../controllers/taskController";
const router = express.Router();

// Task List Get
router.get("/tasklist", getTasks);

// Task List Post
router.post("/tasklist", updateTasks);

export default router;
