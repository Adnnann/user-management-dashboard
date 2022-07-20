import { Pagination } from "@mui/material/";

export default function PaginationComponent({
  numberOfPages,
  handleChange,
  page,
  className,
}) {
  return (
    <div className={className}>
      <Pagination
        key={page}
        count={numberOfPages}
        page={page}
        onChange={handleChange}
      />
    </div>
  );
}
