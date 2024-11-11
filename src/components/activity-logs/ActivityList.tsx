/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import ActivityRow from "./ActivityRow";
import { ActivityLog } from "@/lib/activity-log";
import { fetchActivityLogsByMonthAndYear } from "@/services/activitylogs-apis";
import { useSelector } from "react-redux";
import { selectRefetch } from "@/app/slices/refetchSlice";
import Pagination from "../global/Pagination";
import Button from "../ui/Button";

const columns = ["Sr. No.", "Time", "Resource", "Task Id", "Action", "By"];
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

export default function TodaysActivity() {
  const refectFlag = useSelector(selectRefetch);

  const [taskLogs, setTaskLogs] = useState<ActivityLog[] | []>([]);
  const [filters, setFilters] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    date: new Date().getDate(),
  });
  const [pageData, setPageData] = useState({
    pageNumber: 1,
    pageSize: 1,
    totalPages: 1,
    totalRecords: 0,
  });

  useEffect(() => {
    getActivities(pageData.pageNumber);
  }, [refectFlag, pageData.pageNumber]);

  const getActivities = async (pageNumber: number) => {
    try {
      const response = await fetchActivityLogsByMonthAndYear(
        pageNumber,
        filters.month,
        filters.year
      );
      setTaskLogs(response.content);
      setPageData({
        pageNumber: response.pageNumber,
        pageSize: response.pageSize,
        totalPages: response.totalPages,
        totalRecords: response.totalPages,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="todays-activity" className="py-3">
      <form
        className="d-flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          setPageData((prev) => ({ ...prev, pageNumber: 1 }));
          getActivities(1);
        }}
      >
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            value={filters.year}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                year: Number(e.target.value),
              }))
            }
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            value={filters.date}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                date: Number(e.target.value),
              }))
            }
          />
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            value={filters.month}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                month: Number(e.target.value),
              }))
            }
          >
            {months.map((month, monthIndex) => (
              <option value={monthIndex + 1}>{month}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <Button>Search</Button>
        </div>
      </form>
      <div id="todays-activity-container">
        <div className="d-flex bg-light border">
          {columns.map((column, columnIndex) => {
            const columnStyles = { width: "22.5%" };
            if (columnIndex === 0) {
              columnStyles.width = "10%";
            }

            return (
              <p
                className={`text-center py-1 ${columnIndex !== columns.length - 1 ? "border-end" : ""}`}
                style={columnStyles}
              >
                {column}
              </p>
            );
          })}
        </div>
        <div
          id="activity-rows"
          className="border-top overflow-y-auto mb-4"
          style={{ height: "550px" }}
        >
          {taskLogs.map((taskLog, index) => {
            if (filters.date === new Date(taskLog.atDate).getDate()) {
              return (
                <ActivityRow
                  key={`log-${index}`}
                  taskLog={taskLog}
                  index={index}
                />
              );
            }
          })}
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
