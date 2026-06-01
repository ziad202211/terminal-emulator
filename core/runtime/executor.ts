import { FSNode } from "../../types/fs";

export type Context = {
fs: FSNode;
cwd: string;
setCwd: (path: string) => void;
};

type Command = {
name: string;
args: string[];
};

type CommandHandler = (ctx: Context, args: string[]) => string | void;

const commands: Record<string, CommandHandler> = {};

export function registerCommand(name: string, handler: CommandHandler) {
commands[name] = handler;
}

export function execute(command: Command | undefined, ctx: Context) {
  if (!command) return "invalid command";

  const handler = commands[command.name];

  if (!handler) return `Command not found: ${command.name}`;

  const result = handler(ctx, command.args);

  return result ?? ""; // مهم
}