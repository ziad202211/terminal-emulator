import "./terminal.css";

function openDocs() {
  window.open(`${window.location.origin}/docs`, "_blank");
}

export default function TabBar({ tabs, activeId, onSwitch, onClose, onNewTab }: any) {
  return (
    <div className="term-titlebar">
      <div className="term-dots">
        <div className="dot dot-red" />
        <div className="dot dot-yellow" />
        <div className="dot dot-green" />
      </div>

      <div className="term-tabs">
        {tabs.map((tab: any) => (
          <button
            key={tab.id}
            className={`term-tab${tab.id === activeId ? " active" : ""}`}
            onClick={() => onSwitch(tab.id)}
          >
            <span>{tab.title}</span>
            <span
              className="tab-close"
              onClick={(e) => { e.stopPropagation(); onClose(tab.id); }}
            >×</span>
          </button>
        ))}
      </div>

      <button className="btn-new-tab" onClick={onNewTab}>+</button>
      <button className="btn-new-tab" onClick={openDocs}>Docs</button>
    </div>
  );
}