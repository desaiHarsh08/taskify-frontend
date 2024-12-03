import Task from "@/lib/task";
import User from "@/lib/user";
import styles from "@/styles/AssignUserTaskCard.module.css";

type AssignUserTaskCardProps = {
  user: User;
  assignedUser: User;
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
  setAssignedUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export default function AssignUserTaskCard({
  user,
  task,
  setTask,
  setAssignedUser,
}: AssignUserTaskCardProps) {
  const handleUserClick = (givenUser: User) => {
    setTask((prev) => ({ ...prev, assignedToUserId: user.id }));
    setAssignedUser(givenUser);


  };

  return (
    <div
      onClick={() => handleUserClick(user)}
      className={`${styles["assign-user-card"]} d-flex gap-3 p-2 border align-items-center rounded`}
    >
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={user?.id === task?.assignedToUserId}
          onChange={() => handleUserClick(user)}
        />
      </div>
      <div className="d-flex flex-column gap-1">
        <div className="d-flex gap-2">
          <p>{user.name}</p>
          <p className="badge text-bg-info text-light">
            {/* {user.department === "NONE" ? "ADMIN" : user.department} */}
          </p>
        </div>
        <p>{user.email}</p>
      </div>
    </div>
  );
}
