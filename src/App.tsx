import './App.css'
import {useEffect, useState} from "react";
import type {GlobalTaskListItemJsonApiData, TaskDetailsDto} from "./dal/api.ts";

function App() {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [selectedTask, setSelectedTask] = useState<{ id: string, attributes: TaskDetailsDto } | null>(null)
  const [tasks, setTasks] = useState<GlobalTaskListItemJsonApiData[] | null>(null)
  const [boardId, setBoardId] = useState<string | null>(null)

  useEffect(() => {
    console.log("effect")
    fetch("https://trelly.it-incubator.app/api/1.0/boards/tasks", {
      headers: {
        'api-key': 'cf60db86-8e7f-4d64-b085-f791bc69c47a',
      }
    })
      .then(response => response.json())
      .then(json => setTasks(json.data))
  }, []);

  useEffect(() => {
    fetch(`https://trelly.it-incubator.app/api/1.0/boards/${boardId}/tasks/${selectedTaskId}`, {
      headers: {
        'api-key': 'cf60db86-8e7f-4d64-b085-f791bc69c47a',
      }
    })
      .then(response => response.json())
      .then(json => setSelectedTask(json.data))
  }, [selectedTaskId, boardId])

  if (tasks === null) {
    return <p>Загрузка...</p>
  }

  if (tasks.length === 0) {
    return <p>Задачи отсутствуют</p>
  }

  return (
    <>
      <h1>Список дел</h1>
      <button
        onClick={() => {
          setSelectedTaskId(null)
          setSelectedTask(null)
        }}
        type="button"
      >
        Сбросить выделение
      </button>
      <div
        style={{
          display: 'flex',
          gap: "30px",
        }}
      >
        <ul>
          {tasks.map((task) => {
            return (
              <li
                onClick={() => {
                  setSelectedTaskId(task.id)
                  setSelectedTask(null)
                  setBoardId(task.attributes.boardId)
                }}
                style={{
                  color: 'black',
                  border: task.id === selectedTaskId ? "10px solid orange" : "none",
                  padding: "20px",
                  borderRadius: "8px",
                  background: task.attributes.priority === 4 ? '#ff6700' :
                    task.attributes.priority === 3 ? '#ff9248' :
                      task.attributes.priority === 2 ? '#ffb38a' :
                        task.attributes.priority === 1 ? '#ffd7b5' : '#ffffff'
                }}
                key={task.id}
              >
                <p
                  style={{
                    textDecoration: task.attributes.status === 2 ? 'line-through' : 'none'
                  }}
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
            )
          })}
        </ul>
        <div>
          <h3>Task Details</h3>
          {!selectedTask && !selectedTaskId && 'Задача не выбрана'}
          {!selectedTask && selectedTaskId && 'Загрузка...'}
          {selectedTask && selectedTaskId && selectedTask.id !== selectedTaskId && 'Загрузка...'}
          {selectedTask && (
            <div>
              <p><strong>Title:</strong> {selectedTask.attributes.title}</p>
              <p>
                <strong>Board title:</strong> {selectedTask.attributes.boardTitle}
              </p>
              <p>
                <strong>Description:</strong> {selectedTask.attributes.description || "no description"}
              </p>
            </div>
          )}
        </div>
      </div>

    </>
  )
}

// @ts-ignore
export default App
