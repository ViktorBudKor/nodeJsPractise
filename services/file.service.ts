import * as fs from "fs";
import { Task } from "../interfaces/task.interface";

export async function saveTasksInFile(
  tasksMap: Map<number, Task>
): Promise<void> {
  const tasksArray: Task[] = [];
  for (let task of tasksMap.values()) {
    tasksArray.push(task);
  }
  await fs.promises.writeFile("tasks.json", JSON.stringify(tasksArray), {
    encoding: "utf-8",
  });
}

export async function unloadFromFile(Tasks: Map<number, Task>): Promise<void> {
  const data = await fs.promises.readFile("tasks.json", {
    encoding: "utf-8",
  });
  if (!data) return;

  const tasksFromFile: Task[] = JSON.parse(data);
  for (let task of tasksFromFile) {
    Tasks.set(task.id, task);
  }
}
