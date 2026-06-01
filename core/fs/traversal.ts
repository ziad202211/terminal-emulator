import { FSNode } from "../../types/fs";
import { splitPath } from "../../utils/path";

const findNodeByPath = (root: FSNode, path: string): FSNode | null => {
if (!path.startsWith("/")) return null;

const parts = splitPath(path);

let current: FSNode = root;

for (const part of parts) {
if (current.type !== "directory") return null;

const next = current.children[part];

if (!next) return null;

current = next;
}

return current;
};

export default findNodeByPath;