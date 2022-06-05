import React from "react";
import { Box, Typography } from "@material-ui/core";
import { CheckoutValueItemProps } from "./interface";
import { useLang } from "@hooks";

const CheckoutValueItem = (props: CheckoutValueItemProps) => {
    const [lang] = useLang("checkoutStep");

    return (
        <Box display="flex" justifyContent="space-between" paddingTop={2}>
            <Typography style={{ fontSize: 18, fontWeight: 600 }} color="primary">
                {props.title}
            </Typography>
            <Typography style={{ fontSize: 18, fontWeight: 600 }} color="primary">
                {props.value} €/{lang.checkoutDetails.week}
            </Typography>
        </Box>
    );
};

export default CheckoutValueItem;
