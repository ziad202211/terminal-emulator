import type { Context } from "../runtime/executor";
export function pwd(ctx: Context) {
    return ctx.cwd;
}
