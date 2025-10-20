import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      "&.Mui-selected": {
        background: "#3BFF81",
        color: "#fff",
      },
    },
  },
}));

export default function PaginationControlled({
  totalNumberOfPages = 1,
  handlePaginationChange,
  page,
}) {
  const classes = useStyles();
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalNumberOfPages}
        classes={{ ul: classes.ul }}
        page={page}
        shape="rounded"
        onChange={handlePaginationChange}
      />
    </Stack>
  );
}