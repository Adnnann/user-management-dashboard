import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  table: {
    overflowX: "none",
    [theme.breakpoints.only("xs")]: {
      maxHeight: "400px",
    },
    [theme.breakpoints.only("md")]: {
      maxHeight: "300px",
    },
    [theme.breakpoints.only("lg")]: {
      maxHeight: "500px",
    },
    [theme.breakpoints.only("xl")]: {
      maxHeight: "500px",
    },
  },
}));

const TableComponent = ({ columns, createData, createRows, rows }) => {
  const classes = useStyles();
  createData();
  createRows();

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        overflowX: "none",
        marginBottom: "50px",
      }}
    >
      <TableContainer className={classes.table}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index * 1000000}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#2F4F4F",
                    color: "whitesmoke",
                    fontWeight: "900",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow
                  key={index}
                  style={{
                    padding: "0 !important",
                    height: "90px",
                    wordBreak: "break",
                    backgroundColor: "ButtonFace",
                  }}
                >
                  {columns.map((column, index) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={Math.random() + index}
                        align={column.align}
                        style={{ wordBreak: "break-all" }}
                      >
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableComponent;
