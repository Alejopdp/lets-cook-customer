import React from "react";
import { withStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip, { TooltipProps } from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

const LightTooltipWrapper = withStyles((theme: Theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: "rgba(0, 0, 0, 0.87)",
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);

const LightTooltip = (props) => {
    return <LightTooltipWrapper title={props.text}>{props.children}</LightTooltipWrapper>;
};

export default LightTooltip;
