// Utils & Config
import React from 'react';
import { useStyles } from "./styles";

// External components
import { Box, Typography, Grid } from '@material-ui/core';

export const Divider = () => {
    const { grid, lines, text } = useStyles();

    return (
        <Grid item xs={12} className={grid}>
            {/* <Box className={box}> */}
            <Box className={lines}></Box>
            <Typography variant="body1" className={text}>
                o
            </Typography>
            <Box className={lines}></Box>
            {/* </Box> */}
        </Grid>
    )
};

export default Divider;