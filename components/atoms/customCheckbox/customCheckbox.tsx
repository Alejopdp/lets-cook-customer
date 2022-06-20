// Utils & Config
import React from "react";

// External components
import { Typography, useTheme, Checkbox } from "@material-ui/core";
import { CustomCheckboxProps } from "./interfaces";

export const CustomCheckbox = (props: CustomCheckboxProps) => {
    const theme = useTheme();

    return (
        <div style={{ display: "flex", alignItems: "flex-start" }}>
            <Checkbox checked={props.checked} onChange={props.onChange} color={props.color || "primary"} name={props.name} />
            <Typography variant="body2" color="textSecondary" style={{ fontSize: "13px", marginLeft: theme.spacing(0.5) }}>
                {props.label}
            </Typography>
        </div>
    );
};

export default CustomCheckbox;
