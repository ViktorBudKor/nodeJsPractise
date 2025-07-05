import { Task } from "../interfaces/task.interface";

export let Tasks: Map<number, Task> = new Map();

export function deleteTask(id: number): boolean {
  const task = Tasks.get(id);
  if (!task) {
    console.log("Вы ввели неверный id");
    return false;
  }
  Tasks.delete(task.id);
  return true;
}

export function reindexTasks(): void {
  const newTasks: Map<number, Task> = new Map();
  let index = 1;
  for (let task of Tasks.values()) {
    task.id = index;
    newTasks.set(index++, task);
  }
  Tasks.clear();
  Tasks = newTasks;
}

export function setIsDone(id: number) {
  const task = Tasks.get(id);
  if (!task) {
    console.log("Вы ввели неверный id");
    return;
  }
  task.isDone = !task.isDone;
  Tasks.set(task.id, task);
}
