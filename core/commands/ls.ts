import {resolvePath} from "../../utils/path";
import findNodeByPath from "../fs/traversal";
import type { Context } from "../runtime/executor";
export function ls(ctx:Context,args:string[]){
    const target = args[0] || ".";
    const resolved = resolvePath(ctx.cwd, target);
    const node = findNodeByPath(ctx.fs, resolved);

    if (!node) return "ls: no such file or directory";
    if (node.type !== "directory") {
        return node.name;
    }

    return Object.values(node.children).map(child => child.name).join("\n");
}