// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

// External components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Image from "next/image";
import { SubscriptionState } from "types/subscription";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        alignItems: "center",
    },
    text: {
        fontSize: "18px",
        fontWeight: 600,
        marginLeft: theme.spacing(1.5),
        marginRight: theme.spacing(2),
        color: theme.palette.primary.main,
    },
    chip: {
        textTransform: "uppercase",
        fontWeight: 500,
        color: "white",
    },
    chipStatusActive: {
        backgroundColor: theme.palette.primary.main,
    },
    chipStatusCancelled: {
        backgroundColor: "#FC1919",
    },
    chipStatusExpired: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

const PlanInfoWithStatus = (props) => {
    const classes = useStyles();

    let chipBackgroundColor;
    switch (props.status.value) {
        case SubscriptionState.SUBSCRIPTION_ACTIVE:
            chipBackgroundColor = classes.chipStatusActive;
            break;
        case SubscriptionState.SUBSCRIPTION_CANCELLED:
            chipBackgroundColor = classes.chipStatusCancelled;
            break;
        case SubscriptionState.SUBSCRIPTION_EXPIRED:
            chipBackgroundColor = classes.chipStatusExpired;
            break;
        default:
            chipBackgroundColor = classes.chipStatusActive;
            break;
    }

    return (
        <Box className={classes.container} style={props.style}>
            <Image unoptimized src={props.planIcon} alt={props.planName} width={32} height={32} />
            <Typography variant="body1" className={classes.text}>
                {props.planName}
            </Typography>
            <Chip label={props.status.text} className={clsx(classes.chip, chipBackgroundColor)} />
        </Box>
    );
};

export default PlanInfoWithStatus;
