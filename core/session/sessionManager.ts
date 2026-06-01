import { Session } from "../../types/session";
import { FSNode } from "../../types/fs";


export class SessionManager {
private sessions = new Map<string, Session>();

createSession(fs: FSNode): Session {
const session: Session = {
    id: crypto.randomUUID(),
    cwd: "/",
    history: [],
    fs,
};
this.sessions.set(session.id, session);
return session;
}
getSession(id: string) {
return this.sessions.get(id);
}
deleteSession(id: string) {
this.sessions.delete(id);
}
getAllSessions() {
  return Array.from(this.sessions.values());
}
}