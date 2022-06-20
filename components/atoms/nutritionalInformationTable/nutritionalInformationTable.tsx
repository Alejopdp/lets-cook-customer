import React, { memo } from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@material-ui/core";
import { useStyles } from "./styles";
import { NutritionalInformationTableProps, NutricionalInfo } from "./interfaces";

export const NutritionalInformationTable = memo((props: NutritionalInformationTableProps) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} elevation={0} className={classes.table}>
            <Table size="small" aria-label="a dense table">
                <TableBody>
                    {props.rows.map((row: NutricionalInfo) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.key}
                            </TableCell>
                            <TableCell align="right">{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});

export default NutritionalInformationTable;
