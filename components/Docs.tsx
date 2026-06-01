import "./docs.css";

const COMMANDS = [
  { name: "ls",    badge: "nav",  badgeLabel: "navigation", desc: "List contents of the current or a given directory.",         usage: "ls [path]"    },
  { name: "cd",    badge: "nav",  badgeLabel: "navigation", desc: "Change working directory. Supports .. and absolute paths.",  usage: "cd <path>"    },
  { name: "pwd",   badge: "nav",  badgeLabel: "navigation", desc: "Print the current working directory path.",                  usage: "pwd"          },
  { name: "cat",   badge: "io",   badgeLabel: "i/o",        desc: "Print the contents of a file to output.",                   usage: "cat <file>"   },
  { name: "touch", badge: "io",   badgeLabel: "i/o",        desc: "Create a new empty file at the given path.",                usage: "touch <file>" },
  { name: "mkdir", badge: "io",   badgeLabel: "i/o",        desc: "Create a new directory at the given path.",                 usage: "mkdir <dir>"  },
  { name: "rm",    badge: "io",   badgeLabel: "i/o",        desc: "Remove a file or directory from the filesystem.",           usage: "rm <path>"    },
  { name: "cls",   badge: "util", badgeLabel: "utility",    desc: "Clear terminal output and current session history.",        usage: "cls"          },
];

const SESSION_INFO = [
  { label: "isolation",   value: "Each tab holds its own session — independent cwd and history."    },
  { label: "filesystem",  value: "All sessions share one in-memory virtual FS, seeded at startup."  },
  { label: "persistence", value: "State is in-memory only. A page refresh resets everything."       },
];

export default function Docs() {
  return (
    <div className="docs-root">

      <div className="docs-header">
        <span className="docs-title">terminal.docs</span>
        <span className="docs-version">v0.1.0 · in-memory · next.js</span>
      </div>

      <section className="docs-section">
        <div className="docs-section-label">filesystem</div>
        <div className="fs-tree">
          <div className="fs-row"><span className="fs-root">/</span></div>
          <div className="fs-i1"><div className="fs-row"><span className="fs-connector">└─</span><span className="fs-dir">home/</span></div></div>
          <div className="fs-i2"><div className="fs-row"><span className="fs-connector">├─</span><span className="fs-dir">notes/</span></div></div>
          <div className="fs-i3"><div className="fs-row"><span className="fs-connector">├─</span><span className="fs-file">note1.txt</span></div></div>
          <div className="fs-i3"><div className="fs-row"><span className="fs-connector">└─</span><span className="fs-file">note2.txt</span></div></div>
          <div className="fs-i2"><div className="fs-row"><span className="fs-connector">└─</span><span className="fs-dir">user/</span></div></div>
          <div className="fs-i3"><div className="fs-row"><span className="fs-connector">├─</span><span className="fs-file">file1.txt</span></div></div>
          <div className="fs-i3"><div className="fs-row"><span className="fs-connector">└─</span><span className="fs-file">file2.txt</span></div></div>
        </div>
      </section>

      <section className="docs-section">
        <div className="docs-section-label">commands</div>
        <div className="cmd-grid">
          {COMMANDS.map(({ name, badge, badgeLabel, desc, usage }) => (
            <div key={name} className="cmd-card">
              <div className="cmd-top">
                <span className="cmd-name">{name}</span>
                <span className={`cmd-badge badge-${badge}`}>{badgeLabel}</span>
              </div>
              <div className="cmd-desc">{desc}</div>
              <div className="cmd-usage">{usage}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="docs-section">
        <div className="docs-section-label">session model</div>
        <div className="session-grid">
          {SESSION_INFO.map(({ label, value }) => (
            <div key={label} className="session-card">
              <div className="session-label">{label}</div>
              <div className="session-value">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="docs-footer">
        <span>GazeGuard Terminal · browser runtime</span>
        <span>type <code>cls</code> to clear</span>
      </div>

    </div>
  );
}