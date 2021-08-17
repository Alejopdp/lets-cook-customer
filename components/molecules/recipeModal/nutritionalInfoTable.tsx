import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

interface NutritionalInfoTableProps {
    rows: { key: string; value: string }[];
}

export default function NutritionalInfoTable(props: NutritionalInfoTableProps) {
    return (
        <TableContainer component={Paper} elevation={0}>
            <Table size="small" aria-label="a dense table">
                <TableBody>
                    {props.rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell align="left">{row.key}</TableCell>
                            <TableCell align="right">{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
