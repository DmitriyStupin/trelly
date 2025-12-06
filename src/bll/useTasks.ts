import {useEffect, useState} from "react";
import {getTasks, type GlobalTaskListItemJsonApiData} from "../dal/api.ts";

export function useTasks() {
  const [tasks, setTasks] = useState<Array<GlobalTaskListItemJsonApiData> | null>(null)

  useEffect(() => {
    getTasks()
      .then(json => setTasks(json.data))
  }, []);

  return {
    tasks
  }
}