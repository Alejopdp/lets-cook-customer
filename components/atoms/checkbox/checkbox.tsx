import React from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { CustomCheckboxProps } from "./interfaces";

export const CustomCheckbox = (props: CustomCheckboxProps) => {
    return (
        <FormControlLabel
            control={
                <Checkbox checked={props.checked} value={props.value} onChange={props.handleChange} color="primary" name={props.name} />
            }
            label={props.label}
        />
    );
};

export default CustomCheckbox;
