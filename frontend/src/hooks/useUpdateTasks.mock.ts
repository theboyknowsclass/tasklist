import { UseMutationResult } from "react-query";
import * as Hook from "./useUpdateTasks";
import { Task } from "../domain/task";

export const useUpdateTasksMock = (overrides = {}) => {
  const mockHook = {
    isLoading: false,
    mutate: vi.fn(),
    ...overrides,
  };

  vi.spyOn(Hook, "useUpdateTasks").mockReturnValue(
    mockHook as unknown as UseMutationResult<null, unknown, Task[], unknown>
  );

  return mockHook;
};
