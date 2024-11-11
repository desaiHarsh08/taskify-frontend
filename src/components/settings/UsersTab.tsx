import DepartmentType from "@/lib/department-type";
import RoleType from "@/lib/role-type";
import User from "@/lib/user";
import { fetchUsersByDepartmentAndRole } from "@/services/auth-apis";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { FaEdit } from "react-icons/fa";
import AddUser from "./AddUser";
import { useSelector } from "react-redux";
import { selectRefetch } from "@/app/slices/refetchSlice";

const departments = [
  "QUOTATION",
  "ACCOUNTS",
  "DISPATCH",
  "SERVICE",
  "CUSTOMER",
  "NONE",
];

const roles = [
  "ADMIN",
  "OPERATOR",
  "SALES",
  "MARKETING",
  "ACCOUNTS",
  "DISPATCH",
  "TECHNICIAN",
  "SURVEYOR",
];

export default function UsersTab() {
  const refetchFlag = useSelector(selectRefetch);

  const [filters, setFilters] = useState<{
    department: DepartmentType;
    role: RoleType;
  }>({
    department: "NONE",
    role: "ADMIN",
  });
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers();
  }, [filters, refetchFlag]);

  const getUsers = async () => {
    try {
      const response = await fetchUsersByDepartmentAndRole(filters);
      setUsers(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-3">
      <AddUser />
      <form className="d-flex gap-4 my-4">
        <div className="mb-3 d-flex align-items-center gap-3">
          <label htmlFor="department" className="form-label">
            Department
          </label>
          <select
            className="form-select"
            value={filters.department}
            onChange={(e) =>
              setFilters((prev) => {
                if ((e.target.value as DepartmentType) === "NONE") {
                  return {
                    department: e.target.value as DepartmentType,
                    role: "ADMIN",
                  };
                }
                return {
                  ...prev,
                  department: e.target.value as DepartmentType,
                };
              })
            }
          >
            {departments.map((dept, index) => (
              <option key={`deptIndex-${index}`} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3 d-flex align-items-center gap-3">
          <label htmlFor="department" className="form-label">
            Role
          </label>
          <select
            className="form-select"
            value={filters.role}
            onChange={(e) =>
              setFilters((prev) => {
                if ((e.target.value as RoleType) === "ADMIN") {
                  return {
                    department: "NONE",
                    role: e.target.value as RoleType,
                  };
                }

                return {
                  ...prev,
                  role: e.target.value as RoleType,
                };
              })
            }
          >
            {roles.map((role, index) => (
              <option key={`roleIndex-${index}`} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <Button variant="info">Search</Button>
        </div>
      </form>
      <div id="users" className="w-100 overflow-auto">
        <div className="d-flex border fw-medium bg-light" style={{minWidth: "1466px", overflow: "auto"}}>
          <p style={{ width: "4%" }} className="py-2 border-end text-center">
            Sr. No.
          </p>
          <p
            style={{ width: "13.71%" }}
            className="py-2 border-end text-center"
          >
            Name
          </p>
          <p
            style={{ width: "13.71%" }}
            className="py-2 border-end text-center"
          >
            Email
          </p>
          <p
            style={{ width: "13.71%" }}
            className="py-2 border-end text-center"
          >
            Department
          </p>
          <p
            style={{ width: "13.71%" }}
            className="py-2 border-end text-center"
          >
            Roles
          </p>
          <p
            style={{ width: "13.71%" }}
            className="py-2 border-end text-center"
          >
            Active
          </p>
          <p
            style={{ width: "13.71%" }}
            className="py-2 border-end text-center"
          >
            Phone
          </p>
          <p style={{ width: "13.71%" }} className="py-2 text-center">
            Actions
          </p>
        </div>
        <div className="border-start border-end border-bottom" style={{minWidth: "1466px", overflow: "auto"}}>
          {users.map((user, userIndex) => (
            <div className="d-flex border-bottom">
              <p
                style={{ width: "4%" }}
                className="px-1 py-2 border-end text-center"
              >
                {userIndex + 1}.
              </p>
              <p
                style={{ width: "13.71%" }}
                className="px-1 py-2 border-end text-center"
              >
                {user.name}
              </p>
              <p
                style={{ width: "13.71%" }}
                className="px-1 py-2 border-end text-center d-flex justify-content-center"
              >
                {user.email}
              </p>
              <p
                style={{ width: "13.71%" }}
                className="py-2 border-end text-center"
              >
                {/* {user.department} */}
              </p>
              <p
                style={{ width: "13.71%" }}
                className="py-2 border-end text-center"
              >
                {/* {user.roles.map((role, roleIndex) => (
                  <>
                    <span key={`roleIndex-${roleIndex}`}>{role.roleType}</span>
                    {user.roles.length > 1 && <span>,</span>}
                  </>
                ))} */}
              </p>
              <p
                style={{ width: "13.71%" }}
                className="py-2 border-end text-center"
              >
                {!user.disabled ? (
                  <span className="badge text-bg-success">Yes</span>
                ) : (
                  <span className="badge text-bg-danger">No</span>
                )}
              </p>
              <p
                style={{ width: "13.71%" }}
                className="py-2 border-end text-center"
              >
                {user.phone}
              </p>
              <p style={{ width: "13.71%" }} className="py-2 text-center">
                <Button variant="warning">
                  <FaEdit />
                </Button>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
