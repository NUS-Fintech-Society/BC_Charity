import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

// const columns = [
//     { id: 'name', label: 'Name', minWidth: 170 },
//     {
//         id: 'cause',
//         label: 'Cause',
//         minWidth: 170,
//         align: 'left',
//         format: (value) => value.toLocaleString('en-US'),
//     },
//     {
//         id: 'website',
//         label: 'Website',
//         minWidth: 170,
//         align: 'left',
//         format: (value) => value.toLocaleString('en-US'),
//     },
//     {
//         id: 'address',
//         label: 'Address',
//         minWidth: 170,
//         align: 'right',
//         format: (value) => value.toLocaleString('en-US'),
//     },
// ];

// function createData(name, cause, website, address) {
//     return { name, cause, website, address };
// }

// const rows = [
//     createData("Singapore Cancer Society", "Fighting Cancer", "http://www.singaporecancersociety.org.sg/", "15 Enggor Street #04-01/04 Realty Centre, Singapore 079716"),
//     createData("Children’s Cancer Foundation", "Fighting Cancer", "https://www.ccf.org.sg/", "8 Sinaran Drive #03-01 Oasia Hotel Novena, Singapore 307470"),
//     createData("HCA Hospice Care", "Hospice Care", "http://www.hca.org.sg", "705 Serangoon Road #03-01 Kwong Wai Shiu Hospital, Singapore 328127 "),
//     createData("Movement for the Intellectually Disabled of Singapore (MINDS)", "Persons with Intellectual Disability", "http://www.minds.org.sg", "800 Margaret Drive, Singapore 149310")
// ];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function StickyHeadTable(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {props.columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {props.columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
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
                rowsPerPageOptions={[5, 10, 50]}
                component="div"
                count={props.rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
