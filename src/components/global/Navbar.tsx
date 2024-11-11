import { Link } from "react-router-dom";
import NavigationLinks from "./NavigationLinks";

import styles from "@/styles/Navbar.module.css";

export default function Navbar() {
  return (
    <header>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <div className="d-flex gap-2 align-items-center">
            <img
              src="/taskify-logo.png"
              alt="taskify-logo"
              style={{ width: "32px", borderRadius: "50%" }}
            />
            <Link className="navbar-brand fs-6 fw-bold" to={"/home"}>
              TASKIFY SOFTWARE
            </Link>
          </div>
          <div id={styles["nav-sidebar"]}>
            <button
              className="btn navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="offcanvas offcanvas-start"
              tabIndex={-1}
              id="offcanvasExample"
              aria-labelledby="offcanvasExampleLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                  TASKIFY SOFTWARE
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <aside
                  // id="sidebar"
                  className="col-md-2 px-0 pt-3 text-white bg-dark h-100 d-flex flex-column justify-content-between align-items-center"
                >
                  <NavigationLinks />
                  <img
                    src="/sidebar-image2.png"
                    alt="sidebar-image2.png"
                    //   className="w-100"
                    style={{ width: "50%" }}
                  />
                  <p className="border-top border-secondary w-100 text-center p-2 m-0">
                    v1.3
                  </p>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
