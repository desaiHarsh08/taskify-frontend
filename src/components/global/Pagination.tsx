import Button from "../ui/Button";

type PaginationProps = {
  pageNumber: number;
  pageSize?: number;
  totalPages: number;
  totalRecords?: number;
  setPageData: React.Dispatch<
    React.SetStateAction<{
      pageNumber: number;
      pageSize: number;
      totalPages: number;
      totalRecords: number;
    }>
  >;
};

export default function Pagination({
  pageNumber,
  totalPages,
  setPageData,
}: PaginationProps) {

  return (
    <div className="d-flex gap-2">
      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index}
          outline={pageNumber !== index + 1}
          onClick={() =>
            setPageData((prev) => ({ ...prev, pageNumber: index + 1 }))
          }
        >
          {index + 1}
        </Button>
      ))}
    </div>
  );
}
