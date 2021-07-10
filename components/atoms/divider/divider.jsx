// Utils & Config
import React from 'react';
import { useStyles } from "./styles";

// External components
import { Box, Typography } from '@material-ui/core';

export const Divider = () => {
    const { box, lines } = useStyles();

    return (
        <Box className={box}>
            <Box className={lines}></Box>

            <Typography variant="body1">
                o
            </Typography>

            <Box className={lines}></Box>
        </Box>
    )
};

export default Divider;