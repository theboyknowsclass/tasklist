import React, { ReactElement } from "react";
import { TaskItem } from "..";
import { Task } from "../../../domain/task";

interface TaskListProps {
  tasks: Task[];
}

export const TaskList = ({ tasks }: TaskListProps): ReactElement => {
  return (
    <>
      {tasks.map((task: Task, index: number) => (
        <TaskItem task={task} index={index} key={task.id} />
      ))}
    </>
  );
};

// Ensuring the whole list does not re-render when the droppable re-renders
export const TaskListMemo = React.memo<TaskListProps>(TaskList);
