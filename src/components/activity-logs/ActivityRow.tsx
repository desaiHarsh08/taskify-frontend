import { ActivityLog } from "@/lib/activity-log";
import User from "@/lib/user";
import { fetchUserById } from "@/services/auth-apis";
import { getFormattedDate } from "@/utils/helpers";
import { useEffect, useState } from "react";

type ActivityRowProps = {
  taskLog: ActivityLog;
  index: number;
};

export default function ActivityRow({ taskLog, index }: ActivityRowProps) {
  const [user, setUser] = useState<User | null>(null);

  console.log(taskLog);

  useEffect(() => {
    fetchUser(taskLog.userId);
  }, []);

  const fetchUser = async (userId: number) => {
    try {
      const response = await fetchUserById(userId);
      setUser(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex border-start border-end border-bottom w-100">
      <p
        className="border-end py-2 d-flex justify-content-center align-items-center"
        style={{ width: "10%" }}
      >
        {index + 1}.
      </p>
      <p
        className="border-end py-2 d-flex justify-content-center align-items-center"
        style={{ width: "22.5%" }}
      >
        {getFormattedDate(taskLog.atDate)}
      </p>
      <p
        className="border-end py-2 d-flex justify-content-center align-items-center"
        style={{ width: "22.5%" }}
      >
        {taskLog.resourceType}
      </p>
      <p
        className="border-end py-2 d-flex justify-content-center align-items-center"
        style={{ width: "22.5%" }}
      >
        #{"taskLog.taskAbbreviation"}
      </p>
      <p
        className="border-end py-2 d-flex justify-content-center align-items-center"
        style={{ width: "22.5%" }}
      >
        {taskLog.actionType}
      </p>
      <p
        className="border-end py-2 d-flex justify-content-center align-items-center"
        style={{ width: "22.5%" }}
      >
        {user?.name}
      </p>
    </div>
  );
}
