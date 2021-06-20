// Utils & Config
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

// External components
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    box: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    lines: {
        height: "1px",
        // backgroundColor: theme.palette.text.primary,
        backgroundColor: "lightGrey",
        width: "45%"
    }
}));

const Divider = () => {
    const { box, lines } = useStyles();

    return (
        <Box className={box}>
            <Box className={lines}></Box>

            <Typography variant="body1">
                ó
            </Typography>

            <Box className={lines}></Box>
        </Box>
    )
};

export default Divider;