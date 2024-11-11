import TaskPrototypeTab from "@/components/settings/TaskPrototypeTab";
import UsersTab from "@/components/settings/UsersTab";
import Button from "@/components/ui/Button";
import { useState } from "react";

export default function Settings() {
  const [tabs, setTabs] = useState([
    { label: "Users", isSelected: true },
    { label: "Task Prototype", isSelected: false },
  ]);

  const handleTabSelected = (tabLabel: string) => {
    const newTabs = tabs.map((tab) => ({
      ...tab,
      isSelected: tab.label == tabLabel,
    }));

    setTabs(newTabs);
  };

  return (
    <div className="px-3 py-3 h-100">
      <div>
        <h2>Settings</h2>
        <p>Edit all of the settings from here!</p>
      </div>
      <div className="my-3" style={{ minHeight: "85%" }}>
        {/* Tabs */}
        <div className="d-flex gap-2 border-bottom pb-3">
          {tabs.map((tab) => (
            <Button
              key={tab.label}
              type="button"
              onClick={() => handleTabSelected(tab.label)}
              variant="secondary"
              outline={!tab.isSelected}
              disabled={tab.label === "Task Prototype"}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        {/* Selected Tab Area */}
        <div className="h-100">
          {tabs.map((tab) => {
            if (tab.isSelected) {
              if (tab.label === "Users") {
                return <UsersTab />;
              } else {
                return <TaskPrototypeTab />;
              }
            }
          })}
        </div>
      </div>
    </div>
  );
}
