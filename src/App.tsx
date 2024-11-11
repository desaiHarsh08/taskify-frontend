import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Root from "@/pages/public/Root";
import Settings from "@/pages/protected/Settings";
import UserSettings from "@/pages/protected/UserSettings";
import Customers from "@/pages/protected/Customers";
import AllTasks from "@/pages/protected/AllTasks";
import TaskBoard from "@/pages/protected/TaskBoard";
import HomeLayout from "@/components/layouts/HomeLayout";
import Task from "./pages/protected/Task";
import TFunction from "./pages/protected/TFunction";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ParentCompanies from "./pages/protected/ParentCompanies";
import AddTask from "./pages/protected/AddTask";
import AddCustomer from "./pages/protected/AddCustomer";
import SearchTask from "./pages/protected/SearchTask";
import Report from "./pages/protected/Report";
import ActivityLogs from "./pages/protected/ActivityLogs";
import { AuthProvider } from "./providers/AuthProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/home",
    element: (
      <AuthProvider>
        <HomeLayout />
      </AuthProvider>
    ),
    children: [
      { path: "", element: <TaskBoard /> },
      { path: "activity-logs", element: <ActivityLogs /> },
      {
        path: "tasks",
        element: <Outlet />,
        children: [
          { path: "", element: <AllTasks /> },
          {
            path: ":taskId",
            element: <Outlet />,
            children: [
              { path: "", element: <Task /> },
              { path: ":functionId", element: <TFunction /> },
            ],
          },
        ],
      },
      { path: "add-task", element: <AddTask /> },
      { path: "add-customer", element: <AddCustomer /> },
      {
        path: "search-task",
        element: <Outlet />,
        children: [
          { path: "", element: <SearchTask /> },
          {
            path: ":taskId",
            element: <Outlet />,
            children: [
              { path: "", element: <Task /> },
              { path: ":functionId", element: <TFunction /> },
            ],
          },
        ],
      },
      { path: "report", element: <Report /> },
      { path: "customers", element: <Customers /> },
      { path: "parent-companies", element: <ParentCompanies /> },
      { path: "settings", element: <Settings /> },
      { path: "user-settings", element: <UserSettings /> },
    ],
  },
]);
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
