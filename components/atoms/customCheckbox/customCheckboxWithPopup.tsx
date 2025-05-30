// Utils & Config
import React from "react";

// External components
import { Typography, useTheme, Checkbox } from "@material-ui/core";
import { CustomCheckboxWithPopupProps } from "./interfaces";

export const CustomCheckboxWithPopup = (props: CustomCheckboxWithPopupProps) => {
    const theme = useTheme();

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox checked={props.checked} onChange={props.onChange} color={props.color || "primary"} name={props.name} />
            <Typography variant="body2" color="primary" style={{ fontSize: "13px", marginLeft: theme.spacing(0.5) }}>
                {props.label}
                <b onClick={props.handleOpenModal} style={{ cursor: "pointer" }}>
                    {props.boldText}
                </b>
            </Typography>
        </div>
    );
};

export default CustomCheckboxWithPopup;
