import { Divider } from "@mui/material";
import { AddTask } from "./AddTask";
import { TaskListDnD } from "./TaskList";

export const Tasks = () => {
  return (
    <div>
      <AddTask />
      <Divider orientation="horizontal" flexItem />
      <TaskListDnD />
    </div>
  );
};
