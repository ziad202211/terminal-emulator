import { resolvePath } from "../../utils/path";
import findNodeByPath from "../fs/traversal";
import type { Context } from "../runtime/executor";

export function rm(ctx: Context, args: string[]): string {
if (args.length === 0) {
return "Usage: rm <file|directory>";
}

const target = args[0];

if (target === "." || target === "..") {
return "rm: invalid name";
}

const resolved = resolvePath(ctx.cwd, target);

const parts = resolved.split("/").filter(Boolean);
const name = parts.pop()!;
const parentPath = parts.length === 0 ? "/" : "/" + parts.join("/");

const parentNode = findNodeByPath(ctx.fs, parentPath);

if (!parentNode) {
return `Parent directory not found: ${parentPath}`;
}

if (parentNode.type !== "directory") {
return `Not a directory: ${parentPath}`;
}

const targetNode = parentNode.children[name];

if (!targetNode) {
return `rm: cannot remove '${target}': No such file or directory`;
}

delete parentNode.children[name];

return `Removed: ${target}`;
}