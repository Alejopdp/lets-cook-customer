import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Chip from "@material-ui/core/Chip";

const columns = [
    { id: "fecha", label: "Fecha", minWidth: 100 },
    { id: "orden", label: "Orden", minWidth: 100 },
    { id: "plan", label: "Plan", minWidth: 100 },
    { id: "variante", label: "Variante", minWidth: 170 },
    { id: "monto", label: "Monto", minWidth: 100 },
    { id: "estado", label: "Estado", minWidth: 100 },
    { id: "ver", label: "", minWidth: 50 },
    /*  {
        id: "population",
        label: "Population",
        minWidth: 170,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "size",
        label: "Size\u00a0(km\u00b2)",
        minWidth: 170,
        align: "right",
        format: (value) => value.toLocaleString("en-US"),
    },
    {
        id: "density",
        label: "Density",
        minWidth: 170,
        align: "right",
        format: (value) => value.toFixed(2),
    }, */
];

function createData(fecha, orden, plan, variante, monto, estado, ver) {
    return { fecha, orden, plan, variante, monto, estado, ver };
}

const rows = [
    createData("01/08/2021", "42270", "Plan Familiar", "4 recetas para 3 personas", "30€", "ACEPTADO", "Ver"),
    createData("08/08/2021", "42271", "Plan Familiar", "4 recetas para 3 personas", "24€", "ACEPTADO", "Ver"),
    createData("15/08/2021", "42272", "Plan Familiar", "4 recetas para 3 personas", "21€", "ACEPTADO", "Ver"),
    createData("22/08/2021", "42273", "Plan Familiar", "4 recetas para 3 personas", "22€", "ACEPTADO", "Ver"),
    createData("29/08/2021", "42274", "Plan Familiar", "4 recetas para 3 personas", "32€", "ACEPTADO", "Ver"),
    createData("04/09/2021", "42275", "Plan Familiar", "4 recetas para 3 personas", "28€", "ACEPTADO", "Ver"),
    createData("11/09/2021", "42276", "Plan Familiar", "4 recetas para 3 personas", "27€", "ACEPTADO", "Ver"),
    createData("18/09/2021", "42277", "Plan Familiar", "4 recetas para 3 personas", "35€", "ACEPTADO", "Ver"),
    createData("25/09/2021", "42278", "Plan Familiar", "4 recetas para 3 personas", "31€", "ACEPTADO", "Ver"),
    createData("02/09/2021", "42279", "Plan Familiar", "4 recetas para 3 personas", "25€", "ACEPTADO", "Ver"),
    createData("09/09/2021", "42280", "Plan Familiar", "4 recetas para 3 personas", "20€", "ACEPTADO", "Ver"),
    createData("16/09/2021", "42281", "Plan Familiar", "4 recetas para 3 personas", "30€", "ACEPTADO", "Ver"),
    createData("23/09/2021", "42282", "Plan Familiar", "4 recetas para 3 personas", "29€", "ACEPTADO", "Ver"),
    createData("30/09/2021", "42283", "Plan Familiar", "4 recetas para 3 personas", "27€", "ACEPTADO", "Ver"),
    createData("07/10/2021", "42284", "Plan Familiar", "4 recetas para 3 personas", "32€", "ACEPTADO", "Ver"),
];

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
});

export default function PaymentsTable(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const theme = useTheme();

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
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        let value = row[column.id];
                                        if (value === "Ver") {
                                            value = (
                                                <IconButton size="small" aria-label="close" onClick={() => props.onClick(row)}>
                                                    <VisibilityIcon />
                                                </IconButton>
                                            );
                                        } else if (value === "ACEPTADO") {
                                            value = (
                                                <Chip
                                                    label="ACEPTADO"
                                                    style={{
                                                        backgroundColor: theme.palette.primary.main,
                                                        fontWeight: 500,
                                                        color: "white",
                                                    }}
                                                />
                                            );
                                        }
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === "number" ? column.format(value) : value}
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
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
