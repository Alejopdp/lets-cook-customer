import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import { VariantSelectedContentProps } from "./interface";

// Icons & Images
import RotateRight from "@material-ui/icons/RotateRight";

const VariantSelectedContent = (props: VariantSelectedContentProps) => {
    return (
        <Box>
            <Box marginBottom={2}>
                {props.variant.attributes.map((attr, index) => (
                    <Typography key={index} variant="body2">
                        {attr[0]}: {attr[1]}
                    </Typography>
                ))}
            </Box>

            <Typography color="primary" style={{ marginTop: 8, marginBottom: 24, fontWeight: "bold" }}>
                Valor: {props.variant.price}
            </Typography>
            <Box display="flex" alignItems="center">
                <RotateRight style={{ marginRight: 8 }} /> <Typography>Subscripción {props.selectedFrequency}</Typography>
            </Box>
        </Box>
    );
};

VariantSelectedContent.propTypes = {};

export default VariantSelectedContent;
