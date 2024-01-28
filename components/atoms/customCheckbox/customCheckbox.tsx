// Utils & Config
import React from "react";

// External components
import { Typography, useTheme, Checkbox } from "@material-ui/core";
import { CustomCheckboxProps } from "./interfaces";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    borderColor: {
        borderColor: `${theme.palette.primary.main}!important`,
    },
}));

export const CustomCheckbox = (props: CustomCheckboxProps) => {
    const { borderColor } = useStyles();
    const theme = useTheme();

    return (
        <div style={{ display: "flex", alignItems: "flex-start" }}>
            <Checkbox
                checked={props.checked}
                onChange={props.onChange}
                color={"primary"}
                name={props.name}
                style={{ borderColor: theme.palette.primary.main }}
                className={borderColor}
            />
            <Typography variant="body2" color="primary" style={{ fontSize: "13px", marginLeft: theme.spacing(0.5) }}>
                {props.label}
            </Typography>
        </div>
    );
};

export default CustomCheckbox;
