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
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Chip from "@material-ui/core/Chip";
import PaymentOrderChip from "../../atoms/chips/paymentOrderChip";

const useStyles = makeStyles({
    root: {
        width: "100%",
        borderRadius: "8px",
        boxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
        webkitBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
        mozBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
    },
});

const PaymentsTable = (props) => {
    const columnsNewTable = [
        { id: "paymentDate", label: "Fecha de pago", minWidth: 100 },
        { id: "paymentOrderId", label: "Número de orden", minWidth: 100 },
        { id: "plans", label: "Descripción", minWidth: 100 },
        { id: "totalAmount", label: "Monto total", minWidth: 100 },
        { id: "status", label: "Estado", minWidth: 100 },
        { id: "seeMore", label: "", minWidth: 50 },
    ]

    function createNewData(paymentDate, paymentOrderId, plans, totalAmount, status, seeMore) {
        return { paymentDate, paymentOrderId, plans, totalAmount, status, seeMore };
    }

    const newRows = [
        createNewData("01/08/2021", "42270", "Plan Familiar - 2 recetas para 2 personas / Plan Vinos - 3 vinos", "30€", { status: "PAYMENT_ORDER_ACTIVE", humanStatus: "ACTIVO" }, "Ver"),
        createNewData("01/08/2021", "42270", "Plan Familiar - 2 recetas para 2 personas / Plan Vinos - 3 vinos", "30€", { status: "PAYMENT_ORDER_BILLED", humanStatus: "PROCESADO" }, "Ver"),
        createNewData("01/08/2021", "42270", "Plan Familiar - 2 recetas para 2 personas / Plan Vinos - 3 vinos", "30€", { status: "PAYMENT_ORDER_CANCELLED", humanStatus: "CANCELADO" }, "Ver"),
        createNewData("01/08/2021", "42270", "Plan Familiar - 2 recetas para 2 personas / Plan Vinos - 3 vinos", "30€", { status: "PAYMENT_ORDER_REJECTED", humanStatus: "RECHAZADO" }, "Ver"),
    ];


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

    const getLabelDisplayedRows = ({ from, to, count }) => {
        return `${from}-${to} de ${count !== -1 ? count : `más que ${to}`}`
    }


    return (
        <Paper className={classes.root}>
            <TableContainer>
                <Table aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columnsNewTable.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, fontWeight: 600 }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {newRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow role="checkbox" tabIndex={-1} key={row.code}>
                                    {columnsNewTable.map((column) => {
                                        let value = row[column.id];
                                        if (column.id === "seeMore") {
                                            value = (
                                                <IconButton size="small" aria-label="close" onClick={() => props.onClick(row.paymentOrderId)}>
                                                    <VisibilityIcon />
                                                </IconButton>
                                            );
                                        } else if (column.id === "status") {
                                            value = (
                                                <PaymentOrderChip label={value.humanStatus} variant={value.status} />
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
                labelRowsPerPage='Filas por página'
                labelDisplayedRows={getLabelDisplayedRows}
                count={newRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default PaymentsTable;