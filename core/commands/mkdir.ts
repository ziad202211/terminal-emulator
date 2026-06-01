import { resolvePath, getParentPath } from "../../utils/path";
import findNodeByPath from "../fs/traversal";
import type { Context } from "../runtime/executor";

export function mkdir(ctx: Context, args: string[]): string {
if (args.length === 0) {
return "Usage: mkdir <directory_name>";
}

const target = args[0];

if (target === "." || target === "..") {
return "mkdir: invalid directory name";
}

const resolved = resolvePath(ctx.cwd, target);
const parentPath = getParentPath(resolved);

const parentNode = findNodeByPath(ctx.fs, parentPath);

if (!parentNode) {
return `Parent directory not found: ${parentPath}`;
}

if (parentNode.type !== "directory") {
return `Not a directory: ${parentPath}`;
}

const parts = resolved.split("/").filter(Boolean);
const dirName = parts[parts.length - 1];

if (parentNode.children[dirName]) {
return `Directory already exists: ${dirName}`;
}

parentNode.children[dirName] = {
type: "directory",
name: dirName,
children: {},
};

return `Directory created: ${dirName}`;
}