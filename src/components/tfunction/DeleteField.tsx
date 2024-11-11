import Button from "../ui/Button";

type DeleteFieldProps = {
  onContinue: () => void;
};

export default function DeleteField({ onContinue }: DeleteFieldProps) {
  return (
    <div>
      {" "}
      <p className="fs-5 fw-medium mb-2">
        Are you sure that you want to delete this field?
      </p>
      <p>This process will not be undone, once marked.</p>
      <div className="mt-5 d-flex justify-content-end">
        <Button onClick={onContinue}>Okay, Proceed</Button>
      </div>
    </div>
  );
}
