import TaskItem from "./TaskItem.tsx";
import {type GlobalTaskListItemJsonApiData} from "../dal/api.ts";
import {useTasks} from "../bll/useTasks.ts";

type Props = {
  selectedTaskId: string | null
  onTaskSelect: (id: string | null) => void
  onBoardSelect: (id: string | null) => void
}

export function TasksList({ selectedTaskId, onTaskSelect, onBoardSelect }: Props) {
  const { tasks } = useTasks()

  if (tasks === null) {
    return <p>Загрузка...</p>
  }

  if (tasks.length === 0) {
    return <p>Задачи отсутствуют</p>
  }

  const handleClick = (task: GlobalTaskListItemJsonApiData) => {
    onTaskSelect(task.id)
    onBoardSelect(task.attributes.boardId)
  }

  const handleReset = () => {
    onTaskSelect?.(null)
  }

  return (
    <div>
      <button
        onClick={handleReset}
      >
        reset
      </button>
      <ul>
        {tasks.map((task) => {
          return (
            <TaskItem
              key={task.id}
              task={task}
              isSelected={task.id === selectedTaskId}
              onTaskSelected={() => handleClick(task)}
            />
          )
        })}
      </ul>
    </div>
  )
}