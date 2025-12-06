import { createRoot } from 'react-dom/client'
import './index.css'
import {TasksList} from "./ui/TasksList.tsx";
import {TaskDetails} from "./ui/TaskDetails.tsx";
import {useTaskSelection} from "./bll/useTaskSelection.ts";
import styles from './MainPage.module.css'

const rootEl = document.getElementById('root')
const reactRoot = createRoot(rootEl!)

reactRoot.render(<MainPage />)

function MainPage() {
  const { selectedTaskId, setSelectedTaskId, boardId, setBoardId } = useTaskSelection()

  const handleTaskSelect = (id: string | null): void => {
    setSelectedTaskId(id)
  }

  const handleBoardSelect = (id: string | null): void => {
    setBoardId(id)
  }
  
  return (
    <div>
      <div className={styles.container}>
        <TasksList
          onTaskSelect={handleTaskSelect}
          onBoardSelect={handleBoardSelect}
          selectedTaskId={selectedTaskId}
        />
        <TaskDetails selectedTaskId={selectedTaskId} boardId={boardId} />
      </div>
    </div>
  )
}