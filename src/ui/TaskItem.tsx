import type {GlobalTaskListItemJsonApiData} from "../dal/api.ts";
import styles from './TaskItem.module.css'
import clsx from "clsx";

type Props = {
  isSelected: boolean
  onTaskSelected: (taskId: string) => void
  task: GlobalTaskListItemJsonApiData
}

const TaskItem = ({task, isSelected, onTaskSelected}: Props) => {
  const handleClick = () => {
    onTaskSelected(task.id)
  }

  return (
    <li
      onClick={handleClick}
      className={clsx(
        styles.task,
        isSelected ? styles.selected : '',
        task.attributes.priority === 4 ? styles.highPriority : '',
        task.attributes.priority === 3 ? styles.preHighPriority : '',
        task.attributes.priority === 2 ? styles.middlePriority : '',
        task.attributes.priority === 1 ? styles.lowPriority : '',
      )}
      key={task.id}
    >
      <p
        className={task.attributes.status === 2 ? styles.lineThrough : ''}
      >
        Задача: {task.attributes.title}
      </p>
      <label htmlFor="">
        Статус задачи:
        <input
          type="checkbox"
          checked={task.attributes.status === 2}
        />
      </label>

      <p>Дата создания задачи: {new Date(task.attributes.addedAt).toLocaleDateString()}</p>
    </li>
  );
};

export default TaskItem;