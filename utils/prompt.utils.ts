import * as readlineModule from "readline";
export const readline = readlineModule.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    readline.question(question + " ", (answer) => {
      resolve(answer);
    });
  });
}

export async function promptTitle(): Promise<string> {
  while (true) {
    const input = (
      await ask("Введите название задачи (1–100 символов):")
    ).trim();
    if (input.length === 0) {
      console.log("Заголовок не может быть пустым.");
    } else if (input.length > 100) {
      console.log("Заголовок не должен превышать 100 символов.");
    } else {
      return input;
    }
  }
}
