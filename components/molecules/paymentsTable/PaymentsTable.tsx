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
import { PaymentsTableProps } from "./interface";

const useStyles = makeStyles({
    root: {
        width: "100%",
        borderRadius: "8px",
        boxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
        webkitBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
        mozBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
    },
});

const PaymentsTable = (props: PaymentsTableProps) => {
    const lang = props.lang;
    const columnsNewTable = [
        { id: "billingDate", label: lang.billingDate, minWidth: 100 },
        { id: "id", label: lang.id, minWidth: 100 },
        { id: "ordersQty", label: lang.ordersQty, minWidth: 100 },
        { id: "amount", label: lang.amount, minWidth: 100 },
        { id: "state", label: lang.state, minWidth: 100 },
        { id: "seeMore", label: "", minWidth: 50 },
    ];

    function createNewData(paymentDate, paymentOrderId, plans, totalAmount, status, seeMore) {
        return { paymentDate, paymentOrderId, plans, totalAmount, status, seeMore };
    }

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);
    const theme = useTheme();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getLabelDisplayedRows = ({ from, to, count }) => {
        return `${from}-${to} ${lang.labelDisplayedRows.firstText} ${count !== -1 ? count : `${lang.labelDisplayedRows.secondText} ${to}`}`;
    };

    return (
        <Paper className={classes.root}>
            <TableContainer>
                <Table aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columnsNewTable.map((column) => (
                                <TableCell key={column.id} style={{ minWidth: column.minWidth, fontWeight: 600 }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.paymentOrders?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow role="checkbox" tabIndex={-1} key={row.id}>
                                    {columnsNewTable.map((column) => {
                                        let value = column.id === "amount" ? row.amount : column.id === "id" ? row.humanId : row[column.id];
                                        if (column.id === "seeMore") {
                                            value = (
                                                <IconButton size="small" aria-label="close" onClick={() => props.onClick(row.id)}>
                                                    <VisibilityIcon />
                                                </IconButton>
                                            );
                                        } else if (column.id === "state") {
                                            value = <PaymentOrderChip label={row.humanState} variant={row.humanState} />;
                                        }
                                        return <TableCell key={column.id}>{value}</TableCell>;
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[50, 100, 250, { label: lang.rowsPerPageAllOption, value: -1 }]}
                component="div"
                labelRowsPerPage={lang.labelRowsPerPage}
                labelDisplayedRows={getLabelDisplayedRows}
                count={props.paymentOrders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default PaymentsTable;
