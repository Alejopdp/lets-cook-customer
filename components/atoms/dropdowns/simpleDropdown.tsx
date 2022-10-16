import * as React from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";

interface SimpleDropdown {
    selectedValue: string | number;
    handleChange: (e: any) => void;
    options: string[] | number[];
    label: string;
    fullWidth: boolean;
}

export default function SimpleDropdown(props) {
    return (
        <FormControl fullWidth={props.fullWidth}>
            <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.selectedValue}
                label="Age"
                onChange={props.handleChange}
            >
                {props.options.map((option) => (
                    <MenuItem value={option}>{option}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
