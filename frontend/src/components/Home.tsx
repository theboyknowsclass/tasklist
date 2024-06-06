import { NavBar } from "./NavBar";
import { useCallback, useEffect } from "react";
import { useTaskListStore } from "../store/useTaskListStore";
import { Tasks } from "./tasks/Tasks";
import { useComponentWillUnmount } from "../hooks/useComponentWillUnmount";
import useFetchWithMsal from "../hooks/useFetchWithMsal";
import { protectedResources } from "../authConfig";
import { Task } from "../domain/task";

export const Home = () => {
  const { execute, isLoading } = useFetchWithMsal<Task[]>({
    scopes: protectedResources.apiTaskList.scopes.read,
  });

  const setTaskList = useTaskListStore((state) => state.updateTasks);

  const getData = useCallback(async () => {
    const response = await execute(
      "GET",
      protectedResources.apiTaskList.endpoint
    );
    console.log("RESPONSE", response);

    if (response) {
      setTaskList(response);
    }
  }, [execute, setTaskList]);

  useEffect(() => {
    getData();
  }, [getData]);

  useComponentWillUnmount(() => {
    console.log("Home component unmounted");
  });

  return (
    <div>
      <NavBar title="Tasks" />
      {isLoading ? <div>Loading</div> : <Tasks />}
    </div>
  );
};
