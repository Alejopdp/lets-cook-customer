import React from "react";
import { Box, Typography } from "@material-ui/core";
import { CheckoutValueItemProps } from "./interface";

const CheckoutValueItem = (props: CheckoutValueItemProps) => {
    return (
        <Box display="flex" justifyContent="space-between" marginBottom={2} paddingTop={2}>
            <Typography style={{ fontSize: 18, fontWeight: 600 }} color="primary">
                {props.title}
            </Typography>
            <Typography style={{ fontSize: 18, fontWeight: 600 }} color="primary">
                {props.value} €/semana
            </Typography>
        </Box>
    );
};

export default CheckoutValueItem;
