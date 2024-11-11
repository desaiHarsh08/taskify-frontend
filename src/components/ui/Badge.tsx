type BadgeProps = {
  label: string;
  count: number;
};

const Badge = ({ label, count }: BadgeProps) => {
  return (
    <p className="position-relative">
      {label}
      <span
        style={{ fontSize: "14px" }}
        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger "
      >
        {count}
      </span>
    </p>
  );
};

export default Badge;
