import React from "react";
import { Box, Typography, IconButton } from "@material-ui/core";
import Remove from "@material-ui/icons/HighlightOff";
import { AppliedCouponBoxProps } from "./interface";

const AppliedCouponBox = (props: AppliedCouponBoxProps) => {
    return (
        <Box marginTop={4}>
            <Typography style={{ fontWeight: 600, fontSize: 16 }}>{props.text}</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography style={{ fontSize: 16 }}>{props.couponCode}</Typography>
                <IconButton onClick={props.handleRemoveCoupon}>
                    <Remove />
                </IconButton>
            </Box>
        </Box>
    );
};

export default AppliedCouponBox;
