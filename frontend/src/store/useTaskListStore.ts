import create from "zustand";
import { Task } from "../domain/task";

interface TaskListStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTasks: (tasks: Task[]) => void;
}

export const useTaskListStore = create<TaskListStore>((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTasks: (tasks) => set((_) => ({ tasks })),
}));
