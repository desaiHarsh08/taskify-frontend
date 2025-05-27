import { selectRefetch } from "@/app/slices/refetchSlice";
import TaskList from "@/components/all-tasks/TaskList";
import Pagination from "@/components/global/Pagination";
import TaskSummary from "@/lib/task-summary";
import { fetchCustomerById } from "@/services/customer-apis";
import { fetchFunctionById } from "@/services/function-apis";
import { fetchFunctionTemplateById } from "@/services/function-template-apis";
import {
  //   fetchApprovalStatusTasks,
  //   fetchDismantleDueTasks,
  //   fetchEstimateDueTasks,
  //   fetchPendingApprovalDueTasks,
  fetchTasksByFilters,
  FilterBy,
} from "@/services/task-apis";
import { fetchTaskTemplateById } from "@/services/task-template-apis";
import { useEffect, useState } from "react";
import { Badge, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { format } from "date-fns";

export default function MIS() {
  const refetchFlag = useSelector(selectRefetch);
  const [loading] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [pageData, setPageData] = useState({
    pageNumber: 1,
    pageSize: 0,
    totalPages: 1,
    totalRecords: 1,
  });

  const [tasks, setTasks] = useState<TaskSummary[]>([]);

  const [selectedFilter, setSelectedFilter] =
    useState<FilterBy>("Dismantle Due");

  const filterOptions: FilterBy[] = [
    "Dismantle Due",
    "Estimate Due",
    "Pending Approval",
    "Approval Received",
    "Approval Reject",
    "Awaiting Approval",
    "Work in Progress",
    "Ready",
    "Pending Bills",
    "Lathe",
  ];

  useEffect(() => {
    fetchFilteredTasks(selectedFilter, false);
  }, [refetchFlag, selectedFilter, pageData.pageNumber]);

  const fetchFilteredTasks = async (filterBy: FilterBy, status: boolean) => {
    if (filterBy === "Approval Received") {
      status = true;
    } else if (filterBy === "Approval Reject") {
      status = false;
    }

    const response = await fetchTasksByFilters(
      pageData.pageNumber,
      filterBy,
      status
    );
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

  // Helper to fetch all filtered tasks across all pages
  const fetchAllFilteredTasks = async (filterBy: FilterBy, status: boolean) => {
    let allTasks: TaskSummary[] = [];
    let page = 1;
    let totalPages = 1;
    do {
      const response = await fetchTasksByFilters(page, filterBy, status);
      allTasks = allTasks.concat(response.content);
      totalPages = response.totalPages;
      page++;
    } while (page <= totalPages);
    return allTasks;
  };

  const handleDownload = async () => {
    setLoadingDownload(true);
    let status = false;
    if (selectedFilter === "Approval Received") status = true;
    else if (selectedFilter === "Approval Reject") status = false;

    const allTasks = await fetchAllFilteredTasks(selectedFilter, status);

    if (allTasks.length === 0) {
      alert("No data available to download.");
      return;
    }

    // Customer key mapping for user-friendly column names (without birthDate, anniversaryDate, id, and parentCompanyId)
    const customerKeyMap: Record<string, string> = {
      name: "Customer Name",
      email: "Customer Email",
      personOfContact: "Person Of Contact",
      phone: "Customer Phone",
      state: "Customer State",
      address: "Customer Address",
      residenceAddress: "Customer Residence Address",
      city: "Customer City",
      pincode: "Customer Pincode",
      gst: "Customer GST",
    };

    // Mapping for user-friendly pump details keys
    const pumpKeyMap: Record<string, string> = {
      pumpMake: "Pump Make",
      pumpType: "Pump Type",
      stage: "Stage",
      serialNumber: "Serial Number",
      motorMake: "Motor Make",
      hp: "HP",
      volts: "Volts",
      phase: "Phase",
    };

    // Collect all unique pumpDetails keys
    const allPumpKeys = Array.from(
      new Set(
        allTasks.flatMap((task) =>
          task.pumpDetails ? Object.keys(task.pumpDetails) : []
        )
      )
    );

    const formattedData = [];

    for (let i = 0; i < allTasks.length; i++) {
      const customer = await fetchCustomerById(allTasks[i].customerId);
      
      if (!allTasks[i].functionId) continue;
      
      const functionInstance = await fetchFunctionById(allTasks[i].functionId);
      const taskTemplate = await fetchTaskTemplateById(
        allTasks[i].taskTemplateId as number
      );
      const functionTemplate = await fetchFunctionTemplateById(
        functionInstance.functionTemplateId as number
      );

      const {
        abbreviation,
        jobNumber,
        priorityType,
        closedAt,
        updatedAt,
        receiptNoteCreatedAt,
      } = allTasks[i];

      // Spread customer keys as separate columns with user-friendly names
      const customerObj = customer as Record<string, any>;
      const customerColumns: Record<string, any> = {};
      Object.keys(customerKeyMap).forEach((key) => {
        customerColumns[customerKeyMap[key]] = customerObj[key] || "";
      });

      // Spread pump details keys as separate columns with user-friendly names
      const pumpDetails = (allTasks[i].pumpDetails || {}) as Record<
        string,
        any
      >;
      const pumpDetailsColumns: Record<string, any> = {};
      allPumpKeys.forEach((key) => {
        const mappedKey = pumpKeyMap[key] || key;
        pumpDetailsColumns[mappedKey] = pumpDetails[key] || "";
      });

      // Format date fields for export
      const formatDate = (date: string | Date | undefined) =>
        date ? format(new Date(date), "dd MMM yyyy, HH:mm") : "";
      const formattedUpdatedAt = formatDate(
        (updatedAt ?? undefined) as string | Date | undefined
      );
      const formattedClosedAt = formatDate(
        (closedAt ?? undefined) as string | Date | undefined
      );
      const formattedReceiptNoteCreatedAt = formatDate(
        (receiptNoteCreatedAt ?? undefined) as string | Date | undefined
      );

      formattedData.push({
        id: i + 1,
        "Task Flow": taskTemplate.title,
        Code: abbreviation,
        Priority: priorityType,
        ...customerColumns,
        Function: functionTemplate.title,
        "Job Number": jobNumber,
        "Updated At": formattedUpdatedAt,
        "Closed At": formattedClosedAt,
        "Receipt Note Created At": formattedReceiptNoteCreatedAt,
        ...pumpDetailsColumns,
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
    link.download = `${selectedFilter}-tasks-${new Date().toLocaleDateString("en-IN", { year: "numeric", month: "2-digit", day: "2-digit" })}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setLoadingDownload(false);
  };

  return (
    <div className="container-fluid p-3 h-100 w-100 overflow-auto">
      <div className="w-100 d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <span
              className="me-2 text-secondary"
              style={{ fontWeight: 500, fontSize: "15px" }}
            >
              Filter By:
            </span>
            <Form.Select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value as FilterBy)}
              style={{ width: "200px" }}
            >
              {filterOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
            <Badge bg="primary">{pageData.totalRecords}</Badge>
          </div>
        </div>
        <div>
          <Button
            variant="success"
            onClick={handleDownload}
            disabled={loadingDownload}
          >
            {loadingDownload ? "Downloading..." : "Download"}
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
