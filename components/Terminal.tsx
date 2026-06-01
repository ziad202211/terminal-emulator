"use client";
import { useState } from "react";
import { createTabWithSession, executeInActiveSession, tabManager, getActiveSession } from "../core/runtime/shell";
import TabBar from "../components/Tabbar";
import Output from "../components/Output";
import Input from "../components/Input";

export default function Terminal() {
  const [outputMap, setOutputMap] = useState<Record<string, { type: string; text: string; cwd?: string }[]>>({});
  const [_, forceUpdate] = useState(0);

  const refresh = () => forceUpdate(x => x + 1);

  const activeTab = tabManager.getActiveTab();
  const tabs = tabManager.getAllTabs();
  const currentOutput = activeTab ? (outputMap[activeTab.id] ?? []) : [];

  function runCommand(input: string) {
  if (!activeTab) return;
  const session = getActiveSession();
  const cwd = session?.cwd ?? "~";

  if (input.trim() === "cls") {
    executeInActiveSession(input); // still run it to sync session.history
    setOutputMap(prev => ({ ...prev, [activeTab.id]: [] }));
    return;
  }

  const result = executeInActiveSession(input);
  setOutputMap(prev => ({
    ...prev,
    [activeTab.id]: [
      ...(prev[activeTab.id] ?? []),
      { type: "cmd", text: input, cwd },
      { type: "output", text: String(result) },
    ],
  }));
}

  function switchTab(id: string) {
    tabManager.setActiveTab(id);
    refresh();
  }

  function closeTab(id: string) {
    const allTabs = tabManager.getAllTabs();
    if (allTabs.length === 1) return;
    const idx = allTabs.findIndex(t => t.id === id);
    tabManager.deleteTab(id);
    const remaining = tabManager.getAllTabs();
    tabManager.setActiveTab(remaining[Math.max(0, idx - 1)].id);
    refresh();
  }

  function createNewTab() {
    createTabWithSession();
    refresh();
  }

  const cwd = getActiveSession()?.cwd ?? "~";

  return (
    <div className="term-root">
      <TabBar
        tabs={tabs}
        activeId={activeTab?.id}
        onSwitch={switchTab}
        onClose={closeTab}
        onNewTab={createNewTab}
      />
      <Output lines={currentOutput} />
      <Input cwd={cwd} onEnter={runCommand} />
    </div>
  );
}