import "@/styles/Loading.css";

export default function Loading() {
  return (
    <div
      className="absolute vw-100 top-0 bg-body-secondary z-3"
      style={{ height: "1px" }}
    >
      <div id="loading-bar" className="bg-primary h-100 w-25 rounded"></div>
    </div>
  );
}
