// Utils & Config
import React, { useState } from 'react';
import useStyles from "./styles";
import clsx from "clsx";
import PropTypes from "prop-types";

// External components
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

const QuantityBox = ({  }) => {
    const { box, checkedBox } = useStyles();

    const checkeado = false;

    return (
        <Box className={checkeado === true ? clsx(box, checkedBox) : box }>
            <Checkbox
                color="primary"
                icon={
                    <Typography variant="subtitle1">
                        1
                    </Typography>
                }
                checkedIcon={
                    <Typography variant="subtitle1">
                        1
                    </Typography>
                }
                name="checked"
                checked={checkeado}
            />
        </Box>
    )
}

QuantityBox.propTypes = {
    icon: PropTypes.string.isRequired,
    checkedIcon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

export default QuantityBox;
