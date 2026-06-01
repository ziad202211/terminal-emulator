import { rootFs } from "../fs/seed";
import { SessionManager } from "../session/sessionManager";
import { TabManager } from "../tab/tabManager";
import { execute } from "./executor";
import tokenize from "../../utils/tokenizer";
import parse from "../parser/parse";
import { cd } from "../commands/cd";
import { ls } from "../commands/ls";
import { pwd } from "../commands/pwd";
import { cat } from "../commands/cat";
import { mkdir } from "../commands/mkdir";
import { touch } from "../commands/touch";
import { rm } from "../commands/rm";
import {cls} from "../commands/cls";
import { registerCommand } from "./executor";


registerCommand("cd", cd);
registerCommand("ls", ls);
registerCommand("pwd", pwd);
registerCommand("cat", cat);
registerCommand("mkdir", mkdir);
registerCommand("touch", touch);
registerCommand("rm", rm);
registerCommand("cls", cls);


export const sessionManager = new SessionManager();
export const tabManager = new TabManager();

const session = sessionManager.createSession(rootFs);

const tab = tabManager.createTab("Terminal 1", session.id);

tabManager.setActiveTab(tab.id);

export function getActiveSession() {
const activeTab = tabManager.getActiveTab();

if (!activeTab) return null;

return sessionManager.getSession(activeTab.sessionId);
}

export function executeInActiveSession(input: string) {
const session = getActiveSession();

if (!session) return "No active session";

const tokens = tokenize(input);
const ast = parse(tokens);

const ctx = {
fs: session.fs,
cwd: session.cwd,
setCwd: (path: string) => {
    session.cwd = path;
},
};

const result = execute(ast, ctx);

session.history.push(input);

return result;
}
export function createTabWithSession() {
  const session = sessionManager.createSession(rootFs);

  const tab = tabManager.createTab(
    "Terminal " + (tabManager.getAllTabs().length + 1),
    session.id
  );

  tabManager.setActiveTab(tab.id);

  return tab.id;
}