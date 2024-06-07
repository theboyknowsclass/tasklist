import { Draggable, DraggableProvided } from "@hello-pangea/dnd";
import styles from "./TaskItem.module.css";
import { Task } from "../../../domain/task";

interface TaskProps {
  task: Task;
  index: number;
}

export const TaskItem = ({ task, index }: TaskProps) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided: DraggableProvided) => (
        <div
          className={styles.taskItem}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.name}
        </div>
      )}
    </Draggable>
  );
};
