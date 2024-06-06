import {
  DragDropContext,
  DropResult,
  Droppable,
  DroppableProvided,
} from "@hello-pangea/dnd";
import { ReactElement } from "react";
import { Task } from "../../domain/task";
import React from "react";
import reorder from "./reorder";
import { useTaskListStore } from "../../store/useTaskListStore";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
}

const TaskList = ({ tasks }: TaskListProps): ReactElement => {
  return (
    <>
      {tasks.map((task: Task, index: number) => (
        <TaskItem task={task} index={index} key={task.id} />
      ))}
    </>
  );
};

// Ensuring the whole list does not re-render when the droppable re-renders
const TaskListMemo = React.memo<TaskListProps>(TaskList);

export const TaskListDnD = () => {
  const tasks = useTaskListStore((state) => state.tasks);
  const setTasks = useTaskListStore((state) => state.updateTasks);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newTasks = reorder(
      tasks,
      result.source.index,
      result.destination.index
    ).map((task, index) => ({ ...task, sortOrder: index }));

    console.log("New", newTasks);
    setTasks(newTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided: DroppableProvided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <TaskListMemo tasks={tasks} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
