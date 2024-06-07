import {
  DragDropContext,
  DropResult,
  Droppable,
  DroppableProvided,
} from "@hello-pangea/dnd";
import reorder from "./reorder";
import { TaskListMemo } from "..";
import { useTaskListStore } from "../../../store";

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
    ).map((task, index) => ({ ...task, sortorder: index }));

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
