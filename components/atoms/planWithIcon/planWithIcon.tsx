// Utils & Config
import React, { useState } from 'react';
import clsx from "clsx";

// External components
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { Box, ButtonBase } from '@material-ui/core';
import { Plan } from '@helpers';
import { PlanWithIconProp } from './interfaces';
import useStyles from "./styles";
import { useRouter } from 'next/router';

export const PlanWithIcon = (props: PlanWithIconProp) => {
    const { box, text, checkedBox, icon } = useStyles();
    const image = props.isSelected ? props.plan.iconWithColor : props.plan.icon
    const { locale } = useRouter();

    return (
        <ButtonBase
            focusRipple
            className={clsx(box, { [checkedBox]: props.isSelected })}
            onClick={() => props.onClick(props.plan)}
        // focusVisibleClassName={classes.focusVisible}
        >
            <img src={image} className={icon} />
            <Typography variant="subtitle2" className={text}>
                {props.plan.name}
            </Typography>
        </ButtonBase>
    )
}

export default PlanWithIcon;
