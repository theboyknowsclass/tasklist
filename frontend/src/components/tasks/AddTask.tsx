import { Button, TextField, Tooltip } from "@mui/material";
import React, { useState } from "react";
import styles from "./AddTask.module.css";
import { useTaskListStore } from "../../store/useTaskListStore";

export const AddTask: React.FC = () => {
  const [taskName, setTaskName] = useState<string | null>(null);
  const addTask = useTaskListStore((state) => state.addTask);

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName((state) => event.target.value);
  };

  const handleAddTask = () => {
    if (!taskName) {
      return;
    }

    // Add your logic here to update the state with the new task
    console.log("Adding task:", taskName);

    addTask({
      name: taskName,
      sortOrder: 0,
      id: Math.random().toString(),
    });
    setTaskName(null);
  };

  return (
    <div className={styles.addTaskContainer}>
      <TextField
        label="Task"
        value={taskName || ""}
        onChange={handleTaskChange}
        variant="outlined"
        size="small"
      />
      <Tooltip title={taskName ? "Add Task" : "Please Enter a Task Name"} arrow>
        <div>
          <Button
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
