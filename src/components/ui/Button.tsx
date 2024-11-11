import { ButtonHTMLAttributes, forwardRef, ReactNode, Ref } from "react";
import { Variant } from "@/lib/variantTypes"

type ButtonSize = "sm" | "md" | "lg";

type ButtonType = "submit" | "button";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  type?: ButtonType;
  variant?: Variant;
  outline?: boolean;
  size?: ButtonSize;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      type = "submit",
      variant = "primary",
      outline = false,
      size = "md",
      ...props
    }: ButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={`btn ${outline ? "btn-outline-" + variant : "btn-" + variant} btn-${size} border border-${variant} px-2 py-1`}
        style={size === "md" ? { fontSize: "14px" } : {}}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
