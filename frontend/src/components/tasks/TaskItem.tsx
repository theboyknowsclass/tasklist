import { Draggable, DraggableProvided } from "@hello-pangea/dnd";
import { Task } from "../../domain/task";
import styles from "./TaskItem.module.css";

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
