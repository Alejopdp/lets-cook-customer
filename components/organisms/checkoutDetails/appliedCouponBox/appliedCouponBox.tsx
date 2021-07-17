import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, IconButton } from "@material-ui/core";
import Remove from "@material-ui/icons/HighlightOff";
import { AppliedCouponBoxProps } from "./interface";

const AppliedCouponBox = (props: AppliedCouponBoxProps) => {
    return (
        <Box>
            <Typography style={{ fontWeight: 600, fontSize: 16 }}>Cupón de descuento aplicado</Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography style={{ fontSize: 16 }}>{props.couponCode}</Typography>
                <IconButton onClick={props.handleRemoveCoupon}>
                    <Remove />
                </IconButton>
            </Box>
        </Box>
    );
};

AppliedCouponBox.propTypes = {};

export default AppliedCouponBox;
