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
    const { box, checkedBox, icon } = useStyles();
    const { locale } = useRouter();
    const [isHover, setIsHover] = useState(false)
    const image = (props.isSelected || isHover) ? props.plan.iconWithColor : props.plan.icon

    return (
        <ButtonBase
            focusRipple
            className={clsx(box, { [checkedBox]: props.isSelected })}
            onClick={() => props.onClick(props.plan)}
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
        // focusVisibleClassName={classes.focusVisible}
        >
            <img src={image} className={icon} />
            <Typography variant="subtitle2" color='textSecondary'>
                {props.plan.name}
            </Typography>
        </ButtonBase>
    )
}

export default PlanWithIcon;
