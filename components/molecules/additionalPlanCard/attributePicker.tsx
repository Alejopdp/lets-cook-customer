import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import { QuantityBox } from "@atoms";
import { AttributePickerProps } from "./interface";

const AttributePicker = (props: AttributePickerProps) => {
    return (
        <Box marginBottom={2}>
            <Typography>{props.title}</Typography>
            <Box display="flex">
                {props.values.map((value, index) => (
                    <QuantityBox
                        key={index}
                        label={value}
                        name={value}
                        onChange={() => props.handleAttributeClick(props.title, value)}
                        value={value}
                        state={value === props.selectedAttributes[props.title]}
                        size="sm"
                    />
                ))}
            </Box>
        </Box>
    );
};

AttributePicker.propTypes = {};

export default AttributePicker;
