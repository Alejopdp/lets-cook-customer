// Utils & Config
import React, { useState } from 'react';
import useStyles from "./styles";
import clsx from "clsx";
import PropTypes from "prop-types";

// External components
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { Plan } from '../../../helpers/serverRequests';

interface PlanWithIconProp {
    isSelected: boolean;
    plan: Plan;
    onClick: (plan: Plan) => void;
}

const PlanWithIcon = (props: PlanWithIconProp) => {
    const { box, text, checkedBox } = useStyles();

    return (
        <Box className={clsx(box, { [checkedBox]: props.isSelected })}>
            <FormControlLabel
                onClick={() => props.onClick(props.plan)}
                control={
                    <Checkbox
                        color="primary"
                        icon={<img src={props.plan.icon} height={50} width={50} />}
                        checkedIcon={<img src={props.plan.iconWithColor} height={50} width={50} />}
                        name={props.plan.name}
                        checked={props.isSelected}
                    />}
                label={
                    <Typography variant="subtitle1" className={text}>
                        {props.plan.name}
                    </Typography>
                }
                labelPlacement="bottom"
            />
        </Box>
    )
}

export default PlanWithIcon;
