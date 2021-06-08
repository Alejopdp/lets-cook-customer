import React from 'react';
import PropTypes from "prop-types";
import { Grid, Typography } from '@material-ui/core';
import QuantityBox from '../../atoms/quantityBox/quantityBox';

const PlanSize = ({ subtitle }) => {
    return (
        <Grid item container direction="column">
            <Grid item>
                <Typography variant="body1">
                    {subtitle}
                </Typography>
            </Grid>

            <Grid item container>
                <QuantityBox />
                <QuantityBox />
                <QuantityBox />
            </Grid>
        </Grid>
    )
}

PlanSize.propTypes = {
    subtitle: PropTypes.string.isRequired,
};

export default PlanSize;