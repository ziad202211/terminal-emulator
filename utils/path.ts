export function splitPath(path: string): string[] {
return path.split("/").filter(Boolean);
}

export function isAbsolutePath(path: string): boolean {
return path.startsWith("/");
}

export function resolvePath(cwd: string, input: string): string {
  const isAbs = input.startsWith("/");

  const base = isAbs ? [] : splitPath(cwd);
  const parts = splitPath(input);

  const stack: string[] = [...base];

  for (const p of parts) {
    if (p === "." || p === "") continue;

    if (p === "..") {
      stack.pop();
      continue;
    }

    stack.push(p);
  }

  return "/" + stack.join("/");
}

export function getParentPath(path: string): string {
const parts = splitPath(path);

if (parts.length === 0) return "/";

parts.pop();

return "/" + parts.join("/");
}

export function normalizePath(path: string): string {
return resolvePath("/", path);
}