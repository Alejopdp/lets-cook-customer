// Utils & Config
import React, { useState } from 'react';
import useStyles from "./styles";
import clsx from "clsx";
import PropTypes from "prop-types";

// External components
import Image from "next/image";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

const PlanWithIcon = ({ icon, name, checkedIcon }) => {
    const { box, text, checkedBox } = useStyles();

    const checkeado = true;

    return (
        <Box className={checkeado === true ? clsx(box, checkedBox) : box }>
            <FormControlLabel
                control={
                    <Checkbox
                        color="primary"
                        icon={<Image src={icon} height={50} width={50} />}
                        checkedIcon={<Image src={checkedIcon} height={50} width={50} />}
                        name="checked"
                        checked={checkeado}
                    />}
                label={
                    <Typography variant="subtitle1" className={text}>
                        {name}
                    </Typography>
                }
                labelPlacement="bottom"
            />
        </Box>
    )
}

PlanWithIcon.propTypes = {
    icon: PropTypes.string.isRequired,
    checkedIcon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

export default PlanWithIcon;
