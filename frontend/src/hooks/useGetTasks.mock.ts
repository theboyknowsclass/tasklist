import { UseQueryResult } from "react-query";
import { Task } from "../domain/task";
import * as Hook from "./useGetTasks";

export const useGetTasksMock = (
  overrides = {}
): UseQueryResult<Task[], Error> => {
  const mockHook = {
    data: [] as Task[],
    isLoading: false,
    ...overrides,
  } as UseQueryResult<Task[], Error>;

  vi.spyOn(Hook, "useGetTasks").mockReturnValue(mockHook);

  return mockHook;
};
