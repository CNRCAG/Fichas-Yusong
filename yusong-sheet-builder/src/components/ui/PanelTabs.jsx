function PanelTabs({ tabs, activeTab, onChange }) {
  return (
    <nav className="panel-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={activeTab === tab.id ? "active" : ""}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

export default PanelTabs;