import { Task } from "./interfaces/task.interface";
import * as fs from "fs";

import {
  Tasks,
  deleteTask,
  reindexTasks,
  saveTask,
  setIsDone,
} from "./services/task.service";
import { saveTasksInFile, unloadFromFile } from "./services/file.service";
import { ask, promptTitle, readline } from "./utils/prompt.utils";

const MENU_TEXT = `
=========================
1 — Добавить задачу
2 — Показать задачи
3 — Поменять статус задачи
4 — Удалить задачу
5 — Сохранить
0 — Выйти
=========================
`;

var menuStatus = 1;

async function saveTasksProcess() {
  if (isEmptyTasks()) return;
  try {
    await saveTasksInFile(Tasks);
    console.log("Вы успешно сохранили все данные в файл");
  } catch {
    console.log("Ошибка сохранения данных в файл");
  }
}

async function unloadFromFileProcess(): Promise<void> {
  if (!fs.existsSync("tasks.json")) {
    return;
  }
  const input = await ask(
    "Загрузить данные из файла? Если вы их сохраняли ранее y/n"
  );
  switch (input.trim()) {
    case "y":
      try {
        console.clear();
        await unloadFromFile(Tasks);
        console.log("Вы выгрузили данные из файла");
      } catch (err) {
        console.log("Ошибка выгрузки данных из файла");
      }
      break;
    case "n":
      console.clear();
      console.log("Вы отказались выгружать данные из файла");
      break;
    default:
      await unloadFromFileProcess();
  }
}

async function deleteTaskProcess(): Promise<void> {
  const id = (await ask("Введите номер задачи")).trim();

  if (!deleteTask(parseInt(id))) return;

  if (parseInt(id) !== Tasks.size + 1) reindexTasks();
}

function isEmptyTasks(): boolean {
  if (Tasks.size === 0) {
    console.log("Ваш список тасков пустой");
    return true;
  }
  return false;
}

async function setIsDoneTaskProcess(): Promise<void> {
  if (isEmptyTasks()) return;
  const id = await ask("Введите номер задачи");
  try {
    setIsDone(parseInt(id.trim()));
  } catch {
    console.log("Ошибка смены статуса выполнения");
  }
}

function getTasks(): void {
  console.log("\n==== Ваши Задачи ====");
  Tasks.forEach((task) => {
    console.log(
      `
Номер: ${task?.id}
Описание: ${task?.title}
Выполнил: ${task?.isDone ? "Да" : "Нет"}\n`
    );
  });
}

async function addTaskProcess(): Promise<void> {
  const title = await promptTitle();

  const newTask = saveTask(title);

  console.log(`Задача ${newTask.id} добавлена: "${newTask.title}"`);
}

async function menu(input: number): Promise<void> {
  switch (input) {
    case 1:
      console.clear();
      await addTaskProcess();
      break;
    case 2:
      console.clear();
      getTasks();
      break;
    case 3:
      console.clear();
      await setIsDoneTaskProcess();

      break;
    case 4:
      console.clear();
      await deleteTaskProcess();

      break;
    case 5:
      console.clear();
      await saveTasksProcess();
      break;
    case 0:
      menuStatus = 0;
      break;
    default:
      console.log("Такой цифры нет");
  }
}

async function app() {
  console.clear();
  await unloadFromFileProcess();

  while (menuStatus != 0) {
    console.log(MENU_TEXT);
    const input = await ask("Введите номер меню: ");
    await menu(parseInt(input));
  }
  readline.close();
}

app();
