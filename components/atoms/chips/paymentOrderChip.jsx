// Utils & Config
import React from "react";
import clsx from "clsx";

// External components
import { makeStyles, Chip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    chip: {
        textTransform: "uppercase",
        fontWeight: 500,
        color: "white",
    },
    chipStatusActive: {
        backgroundColor: theme.palette.primary.main,
    },
    chipStatusBilled: {
        backgroundColor: theme.palette.primary.dark,
    },
    chipStatusCancelled: {
        backgroundColor: "#FC1919",
    },
    chipStatusRejected: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

const PaymentOrderChip = (props) => {
    const classes = useStyles();

    let chipBackgroundColor;
    switch (props.variant) {
        case "PAYMENT_ORDER_ACTIVE":
            chipBackgroundColor = classes.chipStatusActive;
            break;
        case "PAYMENT_ORDER_BILLED":
            chipBackgroundColor = classes.chipStatusBilled;
            break;
        case "PAYMENT_ORDER_CANCELLED":
            chipBackgroundColor = classes.chipStatusCancelled;
            break;
        case "PAYMENT_ORDER_REJECTED":
            chipBackgroundColor = classes.chipStatusRejected;
            break;
        default:
            chipBackgroundColor = classes.chipStatusActive;
            break;
    }

    return <Chip label={props.label} className={clsx(classes.chip, chipBackgroundColor)} />;
};

export default PaymentOrderChip;
