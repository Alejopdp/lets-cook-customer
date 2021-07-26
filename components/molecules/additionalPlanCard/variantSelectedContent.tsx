import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, useTheme } from "@material-ui/core";
import { VariantSelectedContentProps } from "./interface";

// Icons & Images
import RotateRight from "@material-ui/icons/RotateRight";

const VariantSelectedContent = (props: VariantSelectedContentProps) => {
    const theme = useTheme();
    return (
        <Box>
            <Box marginBottom={3}>
                {props.variant.attributes.map((attr, index) => (
                    <>
                    <Typography variant='body2' style={{fontSize:'14px', fontWeight: 600, marginBottom: theme.spacing(1)}}>
                        {attr[0]}
                    </Typography>
                    <Typography key={index} variant="body2">
                        {attr[1]}
                    </Typography>
                    </>
                ))}
            </Box>
            <Typography color="primary" style={{ fontSize: 18, fontWeight: "bold", marginBottom: theme.spacing(3) }}>
                Valor: {props.variant.price} €
            </Typography>
            <Box display="flex" alignItems="center">
                <RotateRight style={{ marginRight: 8 }} /> <Typography variant='body2' style={{fontSize:'16px'}}>Plan {props.selectedFrequency}</Typography>
            </Box>
        </Box>
    );
};

VariantSelectedContent.propTypes = {};

export default VariantSelectedContent;
