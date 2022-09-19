import React from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

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
