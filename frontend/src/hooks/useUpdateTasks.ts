import { useMutation, useQueryClient } from "react-query";
import { protectedResources } from "../authConfig";
import { Task } from "../domain/task";
import { useCallback } from "react";
import { useFetchWithMsal } from ".";

export const useUpdateTasks = () => {
  const { executeFetch } = useFetchWithMsal({
    scopes: protectedResources.apiTaskList.scopes.write,
  });

  const queryFunction = useCallback(
    async (data: Task[]) => {
      return await executeFetch<Task[], null>(
        "POST",
        protectedResources.apiTaskList.endpoint,
        data ?? []
      );
    },
    [executeFetch]
  );

  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: queryFunction,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return query;
};
