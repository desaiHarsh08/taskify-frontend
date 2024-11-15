import React, { useState } from "react";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import User from "@/lib/user";
import RoleType from "@/lib/role-type";
import { addNewUser } from "@/services/auth-apis";
import { useDispatch } from "react-redux";
import { toggleLoading } from "@/app/slices/loadingSlice";
import { toggleRefetch } from "@/app/slices/refetchSlice";
import axios from "axios";

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

export default function AddUser() {
  const dispatch = useDispatch();

  const [selectedRole, setSelectedRole] = useState<RoleType>("OPERATOR");
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    phone: "",
    disabled: false,
    departments: [{ name: "QUOTATION", roles: [{ type: "ADMIN" }] }],
  });

  const handleUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRole = () => {

    // if (!newUser.roles.find((ele) => ele.roleType === selectedRole)) {
    //   newUser.roles.push({
    //     roleType: selectedRole,
    //   });
    // }

    // setUser(newUser);
  };

//   const handleRemoveRole = (role: RoleType) => {
//     // const newUser = { ...user };

//     // newUser.roles = newUser.roles.filter((ele) => ele.roleType !== role);

//     // setUser(newUser);
//   };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(toggleLoading());
    try {
      const response = await addNewUser(user);
      console.log(response);
      setOpenModal(false);
      dispatch(toggleLoading());
    } catch (error) {
      console.log(error);
      setOpenModal(false);
      dispatch(toggleLoading());
      // Check if error is an AxiosError
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data.statusCode === 422) {
          alert("User already exists... try editing the user profile");
        } else {
          console.error(
            "Error response:",
            error.response?.data || error.message
          );
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
    } finally {
      setOpenModal(false);
      dispatch(toggleRefetch());
    }
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Add User</Button>
      <Modal
        open={openModal}
        onHide={() => setOpenModal(false)}
        heading={"New User!"}
        centered
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <div style={{ height: "300px" }} className="overflow-auto pb-4">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={user.name}
                onChange={handleUserChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={user.email}
                onChange={handleUserChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                name="phone"
                type="text"
                className="form-control"
                onChange={handleUserChange}
                value={user.phone}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="department" className="form-label">
                Department
              </label>
              {/* <select
                name="department"
                className="form-select"
                value={user.department}
                onChange={handleUserChange}
              >
                {departments.map((dept, index) => (
                  <option key={`deptIndex-${index}`} value={dept}>
                    {dept}
                  </option>
                ))}
              </select> */}
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <div className="d-flex gap-3 ">
                <select
                  name="role"
                  className="form-select"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as RoleType)}
                >
                  {roles.map((role, index) => (
                    <option key={`roleIndex-${index}`} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <Button
                  size="sm"
                  variant="success"
                  onClick={handleAddRole}
                  type="button"
                >
                  Add
                </Button>
              </div>
              {/* {user.roles.length > 0 && (
                <ul
                  className="p-2 pb-3 border mt-3 pt-3 d-flex flex-column gap-2"
                  style={{ listStyle: "none" }}
                >
                  {user.roles.map((role, roleIndex) => (
                    <li
                      key={`userRole-${roleIndex}`}
                      className="border p-2 px-3 bg-light d-flex justify-content-between align-items-center"
                    >
                      <p>{role.roleType}</p>

                      <Button
                        outline
                        variant="dark"
                        onClick={() => handleRemoveRole(role.roleType)}
                        type="button"
                      >
                        X
                      </Button>
                    </li>
                  ))}
                </ul> */}
              {/* )} */}
            </div>
          </div>
          <div className="mt-4 d-flex justify-content-end border-top pt-3">
            <Button
              disabled={
                user.name.trim() === "" ||
                user.email.trim() === "" ||
                user.phone.trim() === "" 
                // user.roles.length === 0
              }
            >
              Create
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
