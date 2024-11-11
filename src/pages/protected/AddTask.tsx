import CreateNewTask from "@/components/taskboard/CreateNewTask";
import MyToast from "@/components/ui/MyToast";
import { useState } from "react";

export default function AddTask() {
  const [showToast, setShowToast] = useState(false);
  const [showMessage, setShowMessage] = useState("");
  return (
    <div className="p-3">
      <h2>Add Task</h2>
      <p>Create a new task!</p>
      <p className="my-2 mt-4">
        A unit of work or activity to be accomplished within the system,
        representing a specific objective or goal.
      </p>
      <CreateNewTask
        setShowToast={setShowToast}
        setShowMessage={setShowMessage}
      />
      <MyToast
        show={showToast}
        message={showMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
