import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    height: 440,
  },
});

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (uen, column, isRedirect) => {
    return (e) => {
      e.preventDefault();
      // console.log(`You clicked on row with uen ${uen}, in column ${column}.`);
      if (isRedirect) {
        window.location.href = `/org/${uen}`;
      }
    };
  };

  function goToExplorer(transactionHash) {
    const ropstenURL = "https://ropsten.etherscan.io/tx/";
    window.open(ropstenURL + transactionHash, "_blank");
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table' style={props.style}>
          <TableHead>
            <TableRow>
              {props.columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                    {props.columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          onClick={handleClick(
                            row.UEN,
                            column.label,
                            props.isRedirect
                          )}
                          style={{
                            cursor: props.isRedirect ? "pointer" : "auto",
                          }}
                        >
                          {
                            // If the cell type is a number, format it
                            column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : // Else if the cell is transaction hash and is valid, show link
                            column.id === "transactionHash" &&
                              row.transactionHash !== "nil" ? (
                              // eslint-disable-next-line
                              <a
                                href='#'
                                onClick={() =>
                                  goToExplorer(row.transactionHash)
                                }
                              >
                                {value ? value.slice(0, 10) + "..." : ""}
                              </a>
                            ) : // Else if donor, shorten the donor address
                            column.id === "donor" && value ? (
                              value.slice(0, 10) + "..."
                            ) : (
                              // Else display the value itself.
                              value
                            )
                          }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component='div'
        count={props.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
