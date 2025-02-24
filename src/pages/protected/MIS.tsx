import { selectRefetch } from "@/app/slices/refetchSlice";
import TaskList from "@/components/all-tasks/TaskList";
import Pagination from "@/components/global/Pagination";
import TaskSummary from "@/lib/task-summary";
import { fetchCustomerById } from "@/services/customer-apis";
import { fetchFunctionById } from "@/services/function-apis";
import { fetchFunctionTemplateById } from "@/services/function-template-apis";
import {
  fetchApprovalStatusTasks,
  fetchDismantleDueTasks,
  fetchEstimateDueTasks,
  fetchPendingApprovalDueTasks,
} from "@/services/task-apis";
import { fetchTaskTemplateById } from "@/services/task-template-apis";
import { useEffect, useState } from "react";
import { Badge, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";

export default function MIS() {
  const refetchFlag = useSelector(selectRefetch);
  const [loading] = useState(false);
  const [pageData, setPageData] = useState({
    pageNumber: 1,
    pageSize: 0,
    totalPages: 1,
    totalRecords: 1,
  });

  const [tasks, setTasks] = useState<TaskSummary[]>([]);
  const [tabs, setTabs] = useState([
    { tabLabel: "Dismantle Due", isSelected: true },
    { tabLabel: "Estimate Due", isSelected: false },
    { tabLabel: "Pending Approval", isSelected: false },
    { tabLabel: "Approval Received", isSelected: false },
    { tabLabel: "Approval Reject", isSelected: false },
  ]);

  useEffect(() => {
    const selectedTab = tabs.find((tab) => tab.isSelected);
    if (selectedTab?.tabLabel === "Dismantle Due") {
      getDismantleDueTasks();
    } else if (selectedTab?.tabLabel === "Estimate Due") {
      getEstimateDueTasks();
    } else if (selectedTab?.tabLabel === "Pending Approval") {
      getPendingApprovalTasks();
    } else if (selectedTab?.tabLabel === "Approval Received") {
      getApprovalStatusTasks(true);
    } else if (selectedTab?.tabLabel === "Approval Reject") {
      getApprovalStatusTasks(false);
    }
  }, [refetchFlag, tabs, pageData.pageNumber]);

  const getDismantleDueTasks = async () => {
    const response = await fetchDismantleDueTasks(pageData.pageNumber);
    setTasks(response.content);
    let totalRecords = response.totalRecords;
    console.log(response, totalRecords);

    setPageData({
      pageNumber: response.pageNumber,
      pageSize: response.pageSize,
      totalPages: response.totalPages,
      totalRecords: response.totalRecords,
    });
  };

  const getEstimateDueTasks = async () => {
    const response = await fetchEstimateDueTasks(pageData.pageNumber);
    setTasks(response.content);
    setPageData({
      pageNumber: response.pageNumber,
      pageSize: response.pageSize,
      totalPages: response.totalPages,
      totalRecords: response.totalRecords,
    });
  };
  const getPendingApprovalTasks = async () => {
    const response = await fetchPendingApprovalDueTasks(pageData.pageNumber);
    setTasks(response.content);
    setPageData({
      pageNumber: response.pageNumber,
      pageSize: response.pageSize,
      totalPages: response.totalPages,
      totalRecords: response.totalRecords,
    });
  };

  const getApprovalStatusTasks = async (status: boolean) => {
    const response = await fetchApprovalStatusTasks(
      pageData.pageNumber,
      status
    );
    setTasks(response.content);
    setPageData({
      pageNumber: response.pageNumber,
      pageSize: response.pageSize,
      totalPages: response.totalPages,
      totalRecords: response.totalRecords,
    });
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

  const handleDownload = async () => {
    if (tasks.length === 0) {
      alert("No data available to download.");
      return;
    }

    const formattedData = [];

    for (let i = 0; i < tasks.length; i++) {
      const customer = await fetchCustomerById(tasks[i].customerId);
      const functionInstance = await fetchFunctionById(tasks[i].functionId);
      const taskTemplate = await fetchTaskTemplateById(
        tasks[i].taskTemplateId as number
      );
      const functionTemplate = await fetchFunctionTemplateById(
        functionInstance.functionTemplateId as number
      );

      const { abbreviation, jobNumber, priorityType, closedAt, updatedAt } =
        tasks[i];

      formattedData.push({
        id: i + 1,
        flow: taskTemplate.title,
        abbreviation,
        priorityType,
        customer: customer.name,
        function: functionTemplate.title,
        jobNumber,
        updatedAt,
        closedAt,
      });
    }

    // Convert tasks to worksheet format
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");

    // Create an Excel file and trigger download
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });

    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    const selectedTab = tabs.find((tab) => tab.isSelected);
    link.download = `${selectedTab?.tabLabel}-tasks.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container-fluid p-3 h-100 w-100 overflow-auto">
      <div className="w-100 d-flex justify-content-between">
        <ul
          className="p-0 d-flex gap-3 align-items-center border-bottom mt-3"
          style={{ listStyle: "none" }}
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
              {tab.tabLabel}{" "}
              {tab.isSelected && <Badge>{pageData.totalRecords}</Badge>}
            </li>
          ))}
        </ul>
        <div>
          <Button variant="success" onClick={handleDownload}>
            Download
          </Button>
        </div>
      </div>
      <div className="overflow-auto">
        <div className="w-100 ">
          <TaskList
            loading={loading}
            tasks={tasks}
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
    </div>
  );
}
