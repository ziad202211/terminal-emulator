import { resolvePath } from "../../utils/path";
import findNodeByPath from "../fs/traversal";
import type { Context } from "../runtime/executor";

export function cd(ctx: Context, args: string[]) {
  const target = args[0];

  if (!target) return "cd: missing path";

  const resolved = resolvePath(ctx.cwd, target);
  const node = findNodeByPath(ctx.fs, resolved);

  if (!node) return "cd: no such file or directory";
  if (node.type !== "directory") return "cd: not a directory";

  ctx.setCwd(resolved);

  return resolved; // مهم
}