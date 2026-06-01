import { sessionManager, tabManager } from "../runtime/shell";

export function cls(): string {
  const activeTab = tabManager.getActiveTab();

  if (!activeTab) {
    return "No active tab";
  }

  const session = sessionManager.getSession(activeTab.sessionId);

  if (!session) {
    return "No active session";
  }

  session.history = [];

  return "";
}