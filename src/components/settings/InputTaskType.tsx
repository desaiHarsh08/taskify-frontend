import Button from "../ui/Button";

type InputTaskTypeProps = {
  onCancel: () => void;
  onContinue: () => void;
};

export default function InputTaskType({
  onCancel,
  onContinue,
}: InputTaskTypeProps) {
  return (
    <form className="container" style={{ height: "450px" }}>
      <div className="mb-3">
        <label htmlFor="taskType" className="form-label">
          Task Prototype Name
        </label>
        <input type="text" className="form-control" id="taskType" />
      </div>
      <div className="d-flex justify-content-center">
        <img
          src="/task-prototype-image.jpg"
          alt="task-prototype-image.jpg"
          style={{ height: "300px" }}
        />
      </div>
      <div className="d-flex gap-2 mt-4 justify-content-end">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" size="md" onClick={onContinue}>
          Continue
        </Button>
      </div>
    </form>
  );
}
