// Utils & config
import React from "react";

// External components
import { Box, Typography } from "@material-ui/core";
import { CheckoutDetailItemProps } from "./interface";

const CheckoutDetailItem = (props: CheckoutDetailItemProps) => {
    return (
        <Box display="flex" justifyContent="space-between" marginBottom={2}>
            <Typography style={{ fontSize: 16 }}>{props.title}</Typography>
            <Typography style={{ fontSize: 16 }}>{props.value}</Typography>
        </Box>
    );
};

export default CheckoutDetailItem;
