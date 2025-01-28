import { Customer } from "@/lib/customer";
import { TaskStats } from "@/lib/task-stats";
import { fetchStats } from "@/services/task-apis";
import React, { useEffect, useState } from "react";
import { FiType } from "react-icons/fi";
import { IoIosPeople } from "react-icons/io";
import { RiAlarmWarningFill } from "react-icons/ri";
import { SiTask } from "react-icons/si";
import PieChartComponent from "./PieChartComponent";

export default function TaskStatsComponent() {
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [customerDetails, setCustomerDetails] = useState<Customer>({
    name: "",
    email: "",
    personOfContact: "",
    phone: "",
    state: "",
    address: "",
    residenceAddress: "",
    city: "",
    pincode: "",
    parentCompanyId: null,
    gst: "",
  });

  useEffect(() => {
    getTaskStats();
  }, []);

  const getTaskStats = async () => {
    try {
      const response = await fetchStats();
      setStats(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="overall-task-stats">
      <div className={`card stat-card`}>
        <div className="card-header">Task Stats</div>
        <div className="card-body">
          <p className="card-text fs-5 d-flex gap-2 align-items-center">
            <SiTask />
            <span className="fw-semibold">All Tasks</span>
          </p>
          <p className="card-text">Since November 8, 2024</p>
        </div>
        <div className="px-3 pb-3">
          <span className="fs-4">{stats?.tasks}</span>
        </div>
      </div>
      <div className={`card stat-card`}>
        <div className="card-header">Task Stats</div>
        <div className="card-body">
          <p className="card-text fs-5 d-flex gap-2 align-items-center">
            <RiAlarmWarningFill className="text-danger" />
            <span className="fw-semibold text-danger">Overdue!</span>
          </p>
          <p className="card-text">Since November 8, 2024</p>
          <div className="px-3 pt-4">
            <span className="fs-4 text-danger">{stats?.overdueTasks}</span>
          </div>
        </div>
      </div>
      <div className={`card stat-card`}>
        <div className="card-header">Task Stats</div>
        <div className="card-body">
          <p className="card-text fs-5 d-flex gap-2 align-items-center">
            <FiType />
            <span className="fw-semibold">Task Type</span>
          </p>
          <p className="card-text">
            N ({stats?.newPumpTasks}), S ({stats?.serviceTasks})
          </p>
        </div>
      </div>
      <div className={`card stat-card`}>
        <div className="card-header">Customers Stats</div>
        <div className="card-body">
          <p className="card-text fs-5 d-flex gap-2 align-items-center">
            <IoIosPeople />
            <span className="fw-semibold">Customers</span>
          </p>
          <p className="card-text">Since November 8, 2024</p>
        </div>
        <div className="px-3 pb-3">
          <span className="fs-4">{stats?.customers}</span>
        </div>
      </div>
      <div className={`card stat-card`} style={{border: "none"}}>
        {/* <PieChartComponent />
        <p className="text-center">Task Bifurgation</p> */}
      </div>
    </div>
  );
}
