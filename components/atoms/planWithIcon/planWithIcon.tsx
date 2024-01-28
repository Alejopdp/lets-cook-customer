// Utils & Config
import React, { useState } from "react";
import clsx from "clsx";

// External components
import { ButtonBase, Typography } from "@material-ui/core";
import { PlanWithIconProp } from "./interfaces";
import useStyles from "./styles";

export const PlanWithIcon = (props: PlanWithIconProp) => {
    const { box, checkedBox, icon, hoverBox } = useStyles();
    const [isHover, setIsHover] = useState(false);
    const image = props.isSelected || isHover ? props.plan.iconWithColor : props.plan.icon;

    return (
        <ButtonBase
            focusRipple
            className={clsx(box, { [checkedBox]: props.isSelected }, { [hoverBox]: isHover })}
            onClick={() => props.onClick(props.plan)}
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
        >
            <img src={image} className={icon} />
            <Typography variant="subtitle2" color="textPrimary">
                {props.plan.name}
            </Typography>
        </ButtonBase>
    );
};

export default PlanWithIcon;
