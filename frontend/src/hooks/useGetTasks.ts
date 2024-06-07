import { UseQueryResult, useQuery } from "react-query";
import { protectedResources } from "../authConfig";
import { Task } from "../domain/task";
import { useCallback } from "react";
import { useFetchWithMsal } from ".";

export const useGetTasks = (): UseQueryResult<Task[], Error> => {
  const { executeFetch } = useFetchWithMsal({
    scopes: protectedResources.apiTaskList.scopes.read,
  });

  const queryFunction = useCallback(async () => {
    return await executeFetch<null, Task[]>(
      "GET",
      protectedResources.apiTaskList.endpoint
    );
  }, [executeFetch]);

  const query = useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: queryFunction,
    // enabled: false,
  });

  return query;
};
