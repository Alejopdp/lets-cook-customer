// Utils & Config
import React, { useMemo } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import { useRouter } from "next/router";
// const langs = require("../../lang").comoFunciona;
import { CalendarCardProps } from "../interfaces";

// External Components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

// Internal components
import BoxWithTitleAndTextButton from "../../../molecules/specificBox/boxWithTitleAndTextButton";
import DataDisplay from "../../../molecules/dataDisplay/dataDisplay";

const useStyles = makeStyles((theme) => ({
    nextChargeGrid: {
        [theme.breakpoints.down("sm")]: {
            marginTop: theme.spacing(2),
        },
        [theme.breakpoints.up("sm")]: {
            borderLeft: "2px dashed #E5E5E5",
            paddingLeft: theme.spacing(4),
        },
    },
}));

const CalendarCard = (props: CalendarCardProps) => {
    const lang = props.lang;
    const theme = useTheme();
    const classes = useStyles();
    // const router = useRouter();
    // const lang = langs[router.locale];

    const skipperdOrdersQty = useMemo(() => props.skippedOrders.length, [props.skippedOrders]);
    return (
        <BoxWithTitleAndTextButton
            title={lang.title}
            btnText={lang.skipWeekBtnText}
            handleClick={props.handleClick}
            hideButton={props.isOneTime}
        >
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <DataDisplay title={lang.nextDeliveryTitle} text={props.schedule.nextDelivery} />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.nextChargeGrid}>
                    <DataDisplay title={lang.nextPaymentTitle} text={props.schedule.nextPayment} />
                </Grid>
                {props.skippedOrders.length > 0 && (
                    <Grid item xs={12} style={{ marginTop: theme.spacing(3) }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <InfoOutlinedIcon fontSize="small" color="secondary" />
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                style={{ fontSize: "14px", opacity: 0.7, marginLeft: theme.spacing(0.5) }}
                            >
                                {lang.skippedWeeksInfo}:{" "}
                                {props.skippedOrders.map((order, index) =>
                                    skipperdOrdersQty === 1
                                        ? `${order.weekLabel}`
                                        : index === 0
                                        ? `${order.weekLabel}`
                                        : index === skipperdOrdersQty - 1
                                        ? ` y ${order.weekLabel}`
                                        : `, ${order.weekLabel}`
                                )}
                            </Typography>
                        </div>
                    </Grid>
                )}
            </Grid>
        </BoxWithTitleAndTextButton>
    );
};

export default CalendarCard;
