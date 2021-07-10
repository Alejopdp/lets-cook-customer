import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useStyles } from './styles';
import { NutritionalInformationTableProps, NutricionalInfo } from './interfaces';

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
})

export default NutritionalInformationTable;