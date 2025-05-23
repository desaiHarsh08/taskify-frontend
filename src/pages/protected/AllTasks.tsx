import { toggleLoading } from "@/app/slices/loadingSlice";
import TaskList from "@/components/all-tasks/TaskList";
import Pagination from "@/components/global/Pagination";
import Button from "@/components/ui/Button";
import TaskSummary from "@/lib/task-summary";
import { fetchAllTasks, getSearchTask } from "@/services/task-apis";
import { useEffect, useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { useDispatch } from "react-redux";

export default function AllTasks() {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTasks] = useState<TaskSummary[]>([]);
  const [pageData, setPageData] = useState({
    pageNumber: 1,
    pageSize: 0,
    totalPages: 0,
    totalRecords: 0,
  });
  const [allTasks, setAllTasks] = useState<TaskSummary[]>([]);

  useEffect(() => {
    getTasks(pageData.pageNumber);
  }, [pageData.pageNumber]);

  const getTasks = async (page: number) => {
    try {
      dispatch(toggleLoading());
      setLoading(true);
      const response = await fetchAllTasks(page);
      setPageData({
        pageNumber: page,
        pageSize: response.pageSize,
        totalPages: response.totalPages,
        totalRecords: response.totalRecords,
      });
      setAllTasks(response.content);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(toggleLoading());
      setLoading(false);
    }
  };

  const handleSelectTask = (_task: TaskSummary) => {
    // let newSelectedTask = [];
    // if (selectedTasks.some((t) => t.id === task.id)) {
    //   // Remove the task
    //   newSelectedTask = selectedTasks.filter((t) => t.id !== task.id);
    // } else {
    //   // Add the task
    //   newSelectedTask = [...selectedTasks];
    //   newSelectedTask.push(task);
    // }
    // setSelectedTasks(newSelectedTask);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(toggleLoading());
    try {
      setLoading(true);
      const response = await getSearchTask(searchText, pageData.pageNumber);
      console.log(response);
      setAllTasks(response.content);
      setPageData({
        pageNumber: response.pageNumber,
        pageSize: response.pageSize,
        totalPages: response.totalPages,
        totalRecords: response.totalRecords,
      });
    } catch (error) {
      console.log(error);
      //   if (error.response.data.statusCode === 404) {
      //     alert(error.response.data.message);
      //   }
    } finally {
      dispatch(toggleLoading());
      setLoading(false);
    }
  };

  return (
    <div className="px-3 py-3 h-100 w-100 overflow-auto ">
      <div className="mb-3">
        <h2>All Tasks</h2>
        <p>View all of the settings from here!</p>
      </div>
      <div id="actions-container" className="d-flex gap-2 align-items-center">
        <div
          id="all-tasks-action"
          className="d-flex gap-2 align-items-center w-100"
        >
          <div className="d-flex gap-2">
            <Button variant="danger" disabled>
              <MdDeleteSweep />
              <span>Delete All</span>
            </Button>
            <Button variant="warning" disabled>
              <span>Select</span>
            </Button>
          </div>
          <form className="my-4 d-flex gap-2" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control py-0"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="type task id..."
              style={{ width: "170px" }}
            />
            <Button variant="info" size="sm">
              Search
            </Button>
          </form>
        </div>
      </div>
      <div className="w-100 overflow-auto">
        {allTasks.length > 0 && (
          <TaskList
            loading={loading}
            pageData={pageData}
            tasks={allTasks}
            selectedTasks={selectedTasks}
            onSelectTask={handleSelectTask}
          />
        )}
      </div>
      <Pagination
        pageNumber={pageData.pageNumber}
        totalPages={pageData.totalPages}
        setPageData={setPageData}
        pageSize={pageData.pageSize}
        totalRecords={pageData.totalRecords}
      />
    </div>
  );
}
