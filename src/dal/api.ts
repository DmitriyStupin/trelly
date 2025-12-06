// ---- DETAILS ----

export type TaskDetailsDto = {
  title: string | null
  boardTitle: string
  description: string | null
}

export type TaskDetailsData = {
  id: string
  attributes: TaskDetailsDto
}

export type GetTaskOutput = {
  data: TaskDetailsData
}

const prepareHeaders = () => {
  const apiKey = import.meta.env.VITE_API_KEY
  if (!apiKey) return undefined

  return {
    'api-key': apiKey
  }
}

export const getTask = (taskId: string, boardId: string) => {
  return fetch(
    `https://trelly.it-incubator.app/api/1.0/boards/${boardId}/tasks/${taskId}`,
    {
      headers: prepareHeaders()
    }
  ).then((res) => res.json() as Promise<GetTaskOutput>);
};

// ---- LIST ----

export type GlobalTaskListItemDto = {
  priority: number
  title: string | null
  status: number
  addedAt: string
  boardId: string
}

export type GlobalTaskListItemJsonApiData = {
  id: string
  attributes: GlobalTaskListItemDto
}

export type GlobalTaskListResponse = {
  data: GlobalTaskListItemJsonApiData[]
}

export const getTasks = () => {
  return fetch("https://trelly.it-incubator.app/api/1.0/boards/tasks", {
    headers: prepareHeaders()
  }).then((res) => res.json() as Promise<GlobalTaskListResponse>);
};
