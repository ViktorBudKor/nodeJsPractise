# nodeJsPractise

## Краткое описание

Консольное приложение для управления списком задач (ToDo) созданное во время учебной практики. Позволяет добавлять, просматривать, менять статус, удалять задачи и сохранять/загружать их из JSON-файла (`tasks.json`).

## Настройка TypeScript

В проекте используется файл `tsconfig.json` (в корне проекта) с такими опциями:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist",
    "downlevelIteration": true
  },
  "include": ["index.ts", "services", "utils", "interfaces"]
}
```

## Инструкции по запуску

1. Убедитесь, что установлен Node.js. Установите зависимости проекта

```bash
npm install
```

2. Скомпилируйте приложение:

```bash
npx tsc
```

Это скомпилирует все указанные файлы в папку `dist/`. Далее запустите приложение:

3. Запустите приложение:

```bash
node dist/index.js
```

4. Следуйте подсказкам меню.

## Список реализованных функций

- `addTaskProcess()` — Добавляет новую задачу через ввод названия.
- `getTasks()` — Отображает все текущие задачи.
- `setIsDoneTaskProcess()` — Меняет статус выполнения задачи.
- `deleteTaskProcess()` — Удаляет задачу по её номеру и перенумеровывает оставшиеся.
- `saveTasksProcess()` — Сохраняет текущие задачи в файл `tasks.json`.
- `unloadFromFileProcess()` — Предлагает загрузить задачи из файла при старте.

Вспомогательные функции:

- `ask(question: string): Promise<string>` — Запрашивает ввод из консоли.
- `promptTitle(): Promise<string>` — Валидирует и запрашивает корректное название задачи.
- `saveTasks(tasksMap: Map<number, Task>)` — Записывает все задачи в файл.
- `unloadFromFile(Tasks: Map<number, Task>)` — Читает задачи из файла и загружает их в память.
- `deleteTask(id: number): boolean` — Удаляет задачу по идентификатору.
- `reindexTasks()` — Переиндексирует ключи задач в Map.
- `setIsDone(id: number)` — Переключает поле `isDone` у задачи.
- `isEmptyTasks(): boolean` — Проверяет, пуст ли список задач.

---

**Приятного использования!**

---
