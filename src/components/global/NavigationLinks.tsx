import { GoWorkflow } from "react-icons/go";

import { IoIosPeople } from "react-icons/io";
import { MdDeveloperBoard } from "react-icons/md";
import { MdWorkHistory } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { SlLogout } from "react-icons/sl";
import { IoLogoWebComponent } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { TbSubtask } from "react-icons/tb";
import { FaPeopleGroup } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { TbReportAnalytics } from "react-icons/tb";

const links = [
  { path: "/home", label: "Dashboard", icon: <MdDeveloperBoard /> },
  { path: "add-task", label: "Add Task", icon: <TbSubtask /> },
  { path: "add-customer", label: "Add Customer", icon: <FaPeopleGroup /> },
  { path: "search-task", label: "Search Task", icon: <CiSearch /> },
  { path: "report", label: "Report", icon: <TbReportAnalytics /> },
  { path: "activity-logs", label: "Activity Logs", icon: <MdWorkHistory /> },
  { path: "tasks", label: "All Tasks", icon: <GoWorkflow /> },
  { path: "settings", label: "Settings", icon: <IoSettingsOutline /> },
  { path: "/", label: "Logout", icon: <SlLogout /> },
];

const accordianLinks = [
  { path: "customers", label: "Customers", icon: <IoIosPeople /> },
  {
    path: "parent-companies",
    label: "Parent Companies",
    icon: <IoLogoWebComponent />,
  },
];

export default function NavigationLinks() {
  const { pathname } = useLocation();

  const accordianItems = (
    <div
      className="accordion bg-dark"
      id="accordionExample"
      style={{ borderColor: "transparent" }}
    >
      <div className="accordion-item" style={{ borderColor: "transparent" }}>
        <h2 className="accordion-header">
          <button
            className="accordion-button bg-dark border-0 text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            Masters
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body d-flex flex-column bg-dark">
            {accordianLinks.map((alink) => (
              <Link
                key={alink.path}
                to={alink.path}
                className="d-flex gap-2 my-1 text-white"
                style={{ textDecoration: "none" }}
              >
                <p>{alink.icon}</p>
                <p>{alink.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const content = (
    <ul
      className="list-group d-flex flex-column gap-2 px-3"
      style={{ width: "85%" }}
    >
      {links.map((link, index) => {
        return (
          <>
            <li
              key={link.path + index}
              style={{ listStyle: "none" }}
              className={`w-100 d-flex ${pathname.endsWith(link.path) && link.label !== "History" ? "bg-secondary rounded" : ""}`}
            >
              <Link
                to={link.path}
                className={`d-flex gap-2 align-items-center text-white`}
                style={{ textDecoration: "none" }}
              >
                <p className="fs-5">{link.icon}</p>
                <p>{link.label}</p>
              </Link>
            </li>
            {index === 5 && accordianItems}
          </>
        );
      })}
    </ul>
  );
  return content;
}
