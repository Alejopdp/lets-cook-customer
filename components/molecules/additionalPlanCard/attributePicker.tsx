import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import { QuantityBox } from "@atoms";
import { AttributePickerProps } from "./interface";

const AttributePicker = (props: AttributePickerProps) => {
    return (
        <Box marginBottom={2}>
            <Typography variant="body2" color="textPrimary" style={{ fontSize: "14px", fontWeight: 600 }}>
                {props.title}
            </Typography>
            <Box display="flex">
                {props.values.map((value, index) => (
                    <QuantityBox
                        idForHtml={`${Math.random() * Date.now()}${value}${index}${props.title}`}
                        key={`${value}${index}${props.title}`}
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
