import { ReactNode } from "react";
import { Variant } from "@/lib/variantTypes";

interface AlertProps {
  children: ReactNode;
  alertTitle?: string;
  alertNote?: string;
  variant: Variant;
}

const Alert = ({
  children,
  alertTitle = "Default heading",
  alertNote = "",
  variant = "success",
}: AlertProps) => {
  return (
    <div className={`alert alert-${variant}`} role="alert">
      <h4 className="alert-heading">{alertTitle}</h4>
      <p>{children}</p>
      {alertNote.length > 0 && (
        <>
          <hr />
          <p className="mb-0 p-0">{alertNote}</p>
        </>
      )}
    </div>
  );
};

export default Alert;
