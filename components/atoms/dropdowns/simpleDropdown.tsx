import * as React from "react";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
