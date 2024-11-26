import { selectRefetch } from "@/app/slices/refetchSlice";
import MonthlyTaskStats from "@/components/taskboard/MonthlyTaskStats";
import OverallTaskStats from "@/components/taskboard/OverallTaskStats";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TaskList from "@/components/all-tasks/TaskList";
import Task from "@/lib/task";
import {
  fetchAllTasks,
  fetchClosedTasks,
  fetchOverdueTasks,
  fetchPendingTasks,
  fetchTaskByPriority,
  fetchTasksByAbbreviationOrDate,
} from "@/services/task-apis";

import Button from "@/components/ui/Button";
import Pagination from "@/components/global/Pagination";
import { useAuth } from "@/hooks/useAuth";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function TaskBoard() {
  const { accessToken, user } = useAuth();
  console.log("accessToken: ", accessToken);
  console.log("user: ", user);
  const refetchFlag = useSelector(selectRefetch);

  const [pageData, setPageData] = useState({
    pageNumber: 1,
    pageSize: 0,
    totalPages: 1,
    totalRecords: 0,
  });
  const [taskAbbreviation, setTaskAbbreviation] = useState("");
  const [createdDate, setCreatedDate] = useState(
    `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`
  );
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [tabs, setTabs] = useState([
    { tabLabel: "All Tasks", isSelected: true },
    { tabLabel: "Overdue Tasks", isSelected: false },
    { tabLabel: "HIGH", isSelected: false },
    { tabLabel: "MEDIUM", isSelected: false },
    { tabLabel: "NORMAL", isSelected: false },
    { tabLabel: "Pending", isSelected: false },
    { tabLabel: "Closed", isSelected: false },
  ]);

  useEffect(() => {
    const selectedTab = tabs.find((tab) => tab.isSelected);
    if (selectedTab?.tabLabel === "All Tasks") {
      getAllTasks(pageData.pageNumber);
    } else if (selectedTab?.tabLabel === "Overdue Tasks") {
      getOverdueTasks(pageData.pageNumber);
    } else if (
      selectedTab?.tabLabel === "HIGH" ||
      selectedTab?.tabLabel === "MEDIUM" ||
      selectedTab?.tabLabel === "NORMAL"
    ) {
      getTasksByPriority(selectedTab.tabLabel, pageData.pageNumber);
    } else if (selectedTab?.tabLabel === "Pending") {
      getPendingTasks(pageData.pageNumber);
    } else if (selectedTab?.tabLabel === "Closed") {
      getClosedTasks(pageData.pageNumber);
    }
  }, [refetchFlag, tabs, pageData.pageNumber]);

  const getAllTasks = async (pageNumber: number) => {
    try {
      const response = await fetchAllTasks(pageNumber);
      console.log(response);
      handleOrderoByEdited(response.content);
      setPageData({
        pageNumber: pageNumber,
        pageSize: response.pageSize,
        totalPages: response.totalPages,
        totalRecords: response.totatRecords,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderoByEdited = (tasks: Task[]) => {
    let tmpTasks: Task[] = [...tasks];
    let tmpDate = new Date();
    for (let t = 0; t < tasks.length; t++) {
      const task = tasks[t];
      if (task && task.functionInstances) {
        for (let i = 0; i < task?.functionInstances?.length; i++) {
          for (
            let j = 0;
            j < task.functionInstances[i].fieldInstances.length;
            j++
          ) {
            const fieldDate = new Date(
              task.functionInstances[i].fieldInstances[j].updatedAt as Date
            );
            if (fieldDate > tmpDate) {
              tmpDate = fieldDate;
              tmpTasks = [task, ...tmpTasks];
            }
          }
        }
      }
    }

    setAllTasks(tasks);
  };

  const getTasksByPriority = async (priority: string, page: number) => {
    try {
      const response = await fetchTaskByPriority(page, priority);
      console.log(response);
      handleOrderoByEdited(response.content);
      setPageData({
        pageNumber: page,
        pageSize: response.pageSize,
        totalPages: response.totalPages,
        totalRecords: response.totatRecords,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getPendingTasks = async (page: number) => {
    try {
      const response = await fetchPendingTasks(page);
      console.log(response);
      handleOrderoByEdited(response.content);
      setPageData({
        pageNumber: page,
        pageSize: response.pageSize,
        totalPages: response.totalPages,
        totalRecords: response.totatRecords,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getOverdueTasks = async (page: number) => {
    try {
      const response = await fetchOverdueTasks(page);
      console.log("overdue task from db:", response);
      handleOrderoByEdited(response.content);
      setPageData({
        pageNumber: page,
        pageSize: response.pageSize,
        totalPages: response.totalPages,
        totalRecords: response.totatRecords,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getClosedTasks = async (page: number) => {
    try {
      const response = await fetchClosedTasks(page);
      console.log(response);
      handleOrderoByEdited(response.content);
      setPageData({
        pageNumber: page,
        pageSize: response.pageSize,
        totalPages: response.totalPages,
        totalRecords: response.totatRecords,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabChange = (index: number) => {
    const newTabs = tabs.map((tab, idx) => {
      if (idx === index) {
        return { ...tab, isSelected: true };
      } else {
        return { ...tab, isSelected: false };
      }
    });

    setTabs(newTabs);
  };

  const handleReset = () => {
    setTaskAbbreviation("");

    const selectedTab = tabs.find((tab) => tab.isSelected);
    if (selectedTab?.tabLabel === "All Tasks") {
      getAllTasks(1);
    } else if (selectedTab?.tabLabel === "Overdue Tasks") {
      getOverdueTasks(pageData.pageNumber);
    } else if (
      selectedTab?.tabLabel === "HIGH" ||
      selectedTab?.tabLabel === "MEDIUM" ||
      selectedTab?.tabLabel === "NORMAL"
    ) {
      getTasksByPriority(selectedTab.tabLabel, pageData.pageNumber);
    } else if (selectedTab?.tabLabel === "Pending") {
      getPendingTasks(pageData.pageNumber);
    } else if (selectedTab?.tabLabel === "Closed") {
      getClosedTasks(pageData.pageNumber);
    }
  };

  const handleSearchTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetchTasksByAbbreviationOrDate(
        1,
        taskAbbreviation,
        createdDate
      );
      setAllTasks(response.content);
      setPageData({
        pageNumber: 1,
        pageSize: response.pageSize,
        totalPages: response.totalPages,
        totalRecords: response.totatRecords,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid p-3 h-100 w-100 border overflow-auto">
      <div id="taskboard-area" className="gap-5 h-100">
        <div id="taskboard-a1">
          <OverallTaskStats />
          {/* {window.innerWidth > 767 ? <AllTasks /> : <MonthlyTaskStats />} */}
        </div>
        <div id="taskboard-a2">
          <h3 className="mb-3">
            This Month ({months[new Date().getMonth()]}{" "}
            {new Date().getFullYear()})
          </h3>
          <div className="overflow-y-auto">
            <MonthlyTaskStats />
          </div>
          <div className="my-5">
            <h3>All Tasks</h3>
            <div className="w-100 overflow-auto">
              <ul
                className="p-0 d-flex gap-3 border-bottom mt-3"
                style={{ listStyle: "none", minWidth: "100%" }}
              >
                {tabs.map((tab, index) => (
                  <li
                    key={tab.tabLabel}
                    onClick={() => handleTabChange(index)}
                    style={{
                      cursor: "pointer",
                      fontSize: "15px",
                      minWidth: "110px",
                    }}
                    className={`${tab.isSelected ? "border-bottom text-primary border-primary" : ""} pb-2 text-center`}
                  >
                    {tab.tabLabel}
                  </li>
                ))}
              </ul>
            </div>
            <form
              className="d-flex align-items-center gap-2"
              onSubmit={handleSearchTask}
            >
              <div className="my-3">
                <input
                  type="text"
                  className="form-control"
                  value={taskAbbreviation}
                  onChange={(e) => setTaskAbbreviation(e.target.value)}
                  placeholder="type task_id..."
                />
              </div>
              <div className="my-3">
                <input
                  type="date"
                  className="form-control"
                  value={createdDate}
                  onChange={(e) => setCreatedDate(e.target.value)}
                  placeholder="type task_id..."
                />
              </div>
              <div className="my-3 d-flex gap-2">
                <Button>Search</Button>
                <Button type="button" variant="info" onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </form>
            <div className="w-100 overflow-auto">
              <TaskList
                tasks={allTasks}
                onSelectTask={() => {}}
                selectedTasks={[]}
                pageData={pageData}
              />
            </div>
            <Pagination
              setPageData={setPageData}
              pageNumber={pageData.pageNumber}
              totalPages={pageData.totalPages}
              pageSize={pageData.pageSize}
              totalRecords={pageData.totalRecords}
            />
          </div>
          {/* {window.innerWidth > 767 ? <MonthlyTaskStats /> : <AllTasks />} */}
        </div>
      </div>
    </div>
  );
}
