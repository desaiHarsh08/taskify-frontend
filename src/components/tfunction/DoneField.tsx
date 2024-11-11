import Button from "../ui/Button";

type DoneFieldProps = {
  onContinue: () => void;
};

export default function DoneField({ onContinue }: DoneFieldProps) {
  return (
    <div>
      <p className="fs-5 fw-medium mb-2">
        Are you sure that you want to mark this field as done?
      </p>
      <p>This process will not be undone, once marked.</p>
      <div className="mt-5 d-flex justify-content-end">
        <Button onClick={onContinue}>Okay, Proceed</Button>
      </div>
    </div>
  );
}
