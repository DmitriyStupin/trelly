import {useTaskDetails} from "../bll/useTaskDetails.ts";
import styles from './TaskDetails.module.css'

type Props = {
  selectedTaskId: string | null
  boardId: string | null
}

export function TaskDetails({selectedTaskId, boardId}: Props) {
  const { taskDetails } = useTaskDetails(selectedTaskId, boardId)

  return <div className={styles.task}>
    <h3>Task Details</h3>
    {!taskDetails && !selectedTaskId && 'Задача не выбрана'}
    {!taskDetails && selectedTaskId && 'Загрузка...'}
    {taskDetails && selectedTaskId && taskDetails.id !== selectedTaskId && 'Загрузка...'}
    {taskDetails && (
      <div>
        <p><strong>Title:</strong> {taskDetails.attributes.title}</p>
        <p>
          <strong>Board title:</strong> {taskDetails.attributes.boardTitle}
        </p>
        <p>
          <strong>Description:</strong> {taskDetails.attributes.description || "no description"}
        </p>
      </div>
    )}
  </div>
}