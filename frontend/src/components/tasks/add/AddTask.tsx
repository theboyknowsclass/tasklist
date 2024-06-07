import { Button, TextField, Tooltip } from "@mui/material";
import React, { useState } from "react";
import styles from "./AddTask.module.css";
import { useTaskListStore } from "../../../store";

export const AddTask: React.FC = () => {
  const [taskName, setTaskName] = useState<string | null>(null);
  const addTask = useTaskListStore((state) => state.addTask);
  const tasks = useTaskListStore((state) => state.tasks);

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(() => event.target.value);
  };

  const handleAddTask = () => {
    if (!taskName) {
      return;
    }

    addTask({
      name: taskName,
      sortorder: tasks.length,
      id: crypto.randomUUID(),
    });
    setTaskName(null);
  };

  return (
    <div className={styles.addTaskContainer}>
      <TextField
        data-testid="task-name-input"
        label="Task"
        value={taskName || ""}
        onChange={handleTaskChange}
        variant="outlined"
        size="small"
        inputProps={{ maxLength: 250 }}
      />
      <Tooltip title={taskName ? "Add Task" : "Please Enter a Task Name"} arrow>
        <div>
          <Button
            data-testid="add-task-button"
            variant="contained"
            color="primary"
            onClick={handleAddTask}
            disabled={!taskName}
          >
            Add Task
          </Button>
        </div>
      </Tooltip>
    </div>
  );
};
