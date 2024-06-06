import { useQuery } from "react-query";
import { protectedResources } from "../authConfig";
import { Task } from "../domain/task";
import useFetchWithMsal from "./useFetchWithMsal";

const useGetTasksQuery = () => {
  const { executeBasic } = useFetchWithMsal<Task[]>({
    scopes: protectedResources.apiTaskList.scopes.read,
  });

  const queryFunction = async () => {
    return await executeBasic("GET", protectedResources.apiTaskList.endpoint);
  };

  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: queryFunction,
    enabled: false,
  });

  return query;
};
