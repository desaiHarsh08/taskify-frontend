/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/global/Navbar";
import NavigationLinks from "@/components/global/NavigationLinks";

import { useDispatch, useSelector } from "react-redux";
import { selectLoading } from "@/app/slices/loadingSlice";

import "@/styles/HomeLayout.css";
import { Modal } from "react-bootstrap";
import ProtectedRoute from "../global/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { fetchTaskTemplates } from "@/services/task-apis";
import { setTaskTemplates } from "@/app/slices/taskTemplatesSlice";
// import MyToast from "../ui/MyToast";

export default function HomeLayout() {
  const navigate = useNavigate();

  const { taskId, functionId } = useParams();
  const loadingVisibility = useSelector(selectLoading);
  // const [messages, setMessages] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.disabled) {
      navigate("/", { replace: true });
    }
  }, []);

  useEffect(() => {
    fetchTaskTemplates(1)
      .then((data) => {
        console.log("data: ", data);
        dispatch(setTaskTemplates(data));
      })
      .catch((error) => console.log(error));
  }, [user?.id]);

  return (
    <ProtectedRoute>
      <Modal
        show={loadingVisibility}
        centered
        style={{ width: "100vw", display: "flex", justifyContent: "center" }}
      >
        <div className="d-flex justify-content-center">
          <Modal.Body
            className="d-flex justify-content-center align-items-center gap-3"
            style={{ backgroundColor: "transparent", width: "50px" }}
          >
            <div>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            <p>Loading...</p>
          </Modal.Body>
        </div>
      </Modal>

      <Navbar />
      <main id="home-container" className="d-flex m-0 overflow-hidden">
        <aside className={`sidebar col-md-2 px-0 pt-3 text-white bg-dark `}>
          <NavigationLinks />
          <img
            src="/sidebar-image2.png"
            alt="sidebar-image2.png"
            className="w-100"
          />
          <p className="border-top border-secondary w-100 text-center p-2 m-0">
            v3.3.0
          </p>
        </aside>
        <section id="shared-area" className="px-0 overflow-hidden">
          <div
            aria-label="breadcrumb"
            className="border px-3 pt-2"
            style={{ height: "50px" }}
          >
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/home">Home</Link>
              </li>
              {taskId && (
                <li className="breadcrumb-item">
                  <Link to={`/home/tasks/${taskId}`}>{taskId}</Link>
                </li>
              )}
              {functionId && (
                <li className="breadcrumb-item">
                  <Link to={`/home/tasks/${taskId}/${functionId}`}>
                    Function-{functionId}
                  </Link>
                </li>
              )}
            </ol>
          </div>
          <div id="shared-container" className="">
            <Outlet />
          </div>
        </section>
        {/* <MyToast  /> */}
      </main>
    </ProtectedRoute>
  );
}
