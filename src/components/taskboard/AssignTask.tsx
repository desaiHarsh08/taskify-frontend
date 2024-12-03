import User from "@/lib/user";
import Button from "../ui/Button";
import AssignUserTaskCard from "./AssignUserTaskCard";
import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "@/services/auth-apis";
import Task from "@/lib/task";
import DepartmentType from "@/lib/department-type";
import { useSelector } from "react-redux";
import { selectLoading } from "@/app/slices/loadingSlice";

type AssignTaskProps = {
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
  assignedUser: User | null;
  setAssignedUser: React.Dispatch<React.SetStateAction<User | null>>;
  onNavigateModal: (
    modalKey: keyof {
      taskType: boolean;
      taskPriority: boolean;
      customer: boolean;
      taskInfo: boolean;
      assignTask: boolean;
      selectDepartment: boolean;
    }
  ) => void; // Define the keys in the type
  onContinue: () => Promise<void>;
  selectedDepartment: DepartmentType;
};

export default function AssignTask({
  task,
  setTask,
  setAssignedUser,
  onNavigateModal,
  assignedUser,
  onContinue,
  selectedDepartment,
}: AssignTaskProps) {
  const loadingVisibility = useSelector(selectLoading);

  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTxt, setSearchTxt] = useState("");

  useEffect(() => {
    fetchAllUsers(1)
      .then((data) => {
        setUsers(data.content);
        setFilteredUsers(data.content);
      })
      .catch((error) => console.log(error));
  }, [selectedDepartment]);

  //   useEffect(() => {}, [filteredUsers]);

  //   const isRoleExist = (txt: string, roles: Role[]) => {
  //     return roles.some((role) =>
  //       role.roleType.toLowerCase().includes(txt.toLowerCase())
  //     );
  //   };

  const handleSearchTxtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);
    const newFilteredUser = users.filter((user) => {
      if (
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
        // user.department.toLowerCase().includes(value.toLowerCase()) ||
        // isRoleExist(value, user.roles)
      ) {
        console.log("got user:", user);
        return user;
      }
    });

    setSearchTxt(value);
    setFilteredUsers(newFilteredUser as User[]);
  };

  return (
    <div
      className="d-flex flex-column justify-content-between"
      style={{ height: "400px" }}
    >
      <div>
        <input
          type="text"
          className="form-control d-block mb-4"
          value={searchTxt}
          onChange={handleSearchTxtChange}
          placeholder="type to search..."
        />
        <div
          className="d-flex flex-column gap-2 overflow-y-auto"
          style={{ height: "300px" }}
        >
          {filteredUsers.length === 0 && <p>No user found!</p>}
          {filteredUsers && filteredUsers.map((user, userIndex) => (
            <AssignUserTaskCard
              key={`user-${userIndex}`}
              user={user}
              task={task}
              setTask={setTask}
              assignedUser={assignedUser as User}
              setAssignedUser={setAssignedUser}
            />
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-end px-2 gap-2 mb-1">
        <Button
          outline
          variant="secondary"
          onClick={() => onNavigateModal("selectDepartment")}
        >
          Back
        </Button>
        <Button disabled={loadingVisibility} onClick={onContinue}>
          {loadingVisibility ? "Assigning..." : "Continue"}
        </Button>
      </div>
    </div>
  );
}
