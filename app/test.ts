// test.ts
import { sessionManager, tabManager, getActiveSession } from "../core/runtime/shell";
import { rootFs } from "../core/fs/seed";

const s1 = sessionManager.createSession(rootFs);
const s2 = sessionManager.createSession(rootFs);

const t1 = tabManager.createTab("Tab 1", s1.id);
const t2 = tabManager.createTab("Tab 2", s2.id);

tabManager.setActiveTab(t1.id);
console.log("tab1 session:", getActiveSession());

tabManager.setActiveTab(t2.id);
console.log("tab2 session:", getActiveSession());