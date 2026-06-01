import { Tab } from "../../types/tab";

export class TabManager {
private tabs = new Map<string, Tab>();
private activeTabId: string | null = null;

createTab(title: string, sessionId: string): Tab {
const tab: Tab = {
    id: crypto.randomUUID(),
    title,
    sessionId,
};

this.tabs.set(tab.id, tab);

return tab;
}

getTab(id: string) {
return this.tabs.get(id);
}

getAllTabs() {
return Array.from(this.tabs.values());
}

setActiveTab(id: string) {
this.activeTabId = id;
}

getActiveTab() {
if (!this.activeTabId) return null;

return this.tabs.get(this.activeTabId);
}

deleteTab(id: string) {
this.tabs.delete(id);

if (this.activeTabId === id) {
    this.activeTabId = null;
}
}
}