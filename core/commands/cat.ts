import type { Context } from "../runtime/executor";
import { resolvePath } from "../../utils/path";
import findNodeByPath from "../fs/traversal";

export function cat(ctx: Context, args: string[]): string {
if (!args.length) {
return "Usage: cat <filename>";
}

const target = args[0];

const resolved = resolvePath(ctx.cwd, target);

const node = findNodeByPath(ctx.fs, resolved);

if (!node) {
return `File not found: ${target}`;
}

if (node.type !== "file") {
return `Not a file: ${target}`;
}

return node.content;
}