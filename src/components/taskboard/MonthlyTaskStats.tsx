import { MonthlyStats } from "@/lib/monthly-stats";
import { fetchMonthlyStats } from "@/services/task-apis";
import { useEffect, useState } from "react";

export default function MonthlyTaskStats() {
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchMonthlyStats();
        setMonthlyStats(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div
      className="d-flex justify-content-evenly border"
    //   style={{ minWidth: "1464px" }}
    >
      <div className="w-100 border-end">
        <div className="pb-0 pt-2">
          <p className="card-text border-bottom fs-5 d-flex gap-2 align-items-center fw-semibold justify-content-center py-0">
            All Tasks
          </p>
        </div>
        <div className="d-flex gap-2 align-items-center justify-content-center">
          {/* <img
            src="/month-tasks-img.jpeg"
            alt="month-tasks-img.jpeg"
            height={70}
          /> */}
          <span className="fs-4">{monthlyStats?.tasks}</span>
        </div>
      </div>
      <div className="w-100 border-end">
        {/* <div className="card-header">This month (September 2024)</div> */}
        <div className="pb-0 pt-2">
          <p className="card-text border-bottom fs-5 d-flex gap-2 align-items-center fw-semibold justify-content-center py-0">
            Completed
          </p>
        </div>
        <div className="d-flex gap-2 align-items-center justify-content-center">
          {/* <img
            src="/completed-task-img.avif"
            alt="completed-task-img.avif"
            height={70}
          /> */}
          <span className="fs-4">{monthlyStats?.closedTasks}</span>
        </div>
      </div>
      <div className="w-100 border-end">
        <div className="pb-0 pt-2">
          <p className="card-text border-bottom fs-5 d-flex gap-2 align-items-center fw-semibold justify-content-center py-0">
            High Priority
          </p>
        </div>
        <div className="d-flex gap-2 align-items-center justify-content-center">
          {/* <img
            src="/high-priority-img.png"
            alt="high-priority-img.png"
            height={70}
          /> */}
          <span className="fs-4">{monthlyStats?.highPriorityTasks}</span>
        </div>
      </div>
      <div className="w-100">
        <div className="pb-0 pt-2">
          <p className="card-text border-bottom fs-5 d-flex gap-2 align-items-center fw-semibold justify-content-center py-0">
            Pending Task
          </p>
        </div>
        <div className="d-flex gap-2 align-items-center justify-content-center">
          {/* <img src="/pending-img.webp" alt="pending-img.webp" height={70} /> */}
          <span className="fs-4">{monthlyStats?.pendingTasks}</span>
        </div>
      </div>
    </div>
  );
}
