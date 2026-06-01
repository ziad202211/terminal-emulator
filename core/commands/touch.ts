import { resolvePath, getParentPath } from "../../utils/path";
import findNodeByPath from "../fs/traversal";
import type { Context } from "../runtime/executor";

export function touch(ctx: Context, args: string[]): string {
if (args.length === 0) {
return "Usage: touch <filename>";
}

const target = args[0];

if (target === "." || target === "..") {
return "touch: invalid file name";
}

const resolved = resolvePath(ctx.cwd, target);

const parentPath = getParentPath(resolved);
const fileName = resolved.split("/").filter(Boolean).pop()!;

const parentNode = findNodeByPath(ctx.fs, parentPath);

if (!parentNode) {
return `Parent directory not found: ${parentPath}`;
}

if (parentNode.type !== "directory") {
return `Not a directory: ${parentPath}`;
}

if (parentNode.children[fileName]) {
const existing = parentNode.children[fileName];
return existing.type === "directory"
    ? `Not a file: ${target}`
    : `File already exists: ${target}`;
}

parentNode.children[fileName] = {
type: "file",
name: fileName,
content: "",
};

return `File created: ${target}`;
}