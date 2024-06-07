import { useEffect } from "react";
import { Divider } from "@mui/material";
import { TaskListDnD } from "./dnd/TaskListDnD";
import { Loading, NavBar } from "..";
import {
  useComponentWillUnmount,
  useGetTasks,
  useUpdateTasks,
} from "../../hooks";
import { useTaskListStore } from "../../store";
import { AddTask } from ".";

export const Tasks = () => {
  const { data, isLoading } = useGetTasks();
  const mutation = useUpdateTasks();
  const setTaskList = useTaskListStore((state) => state.updateTasks);
  const taskList = useTaskListStore((state) => state.tasks);

  useEffect(() => {
    if (data) {
      setTaskList(data ?? []);
    }
  }, [data, setTaskList]);

  useComponentWillUnmount(() => {
    mutation.mutate(taskList);
  });

  return (
    <div>
      <NavBar title="Tasks" />
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <AddTask />
          <Divider orientation="horizontal" flexItem />
          <TaskListDnD />
        </div>
      )}
    </div>
  );
};
