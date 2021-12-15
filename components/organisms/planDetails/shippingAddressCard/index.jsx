// Utils & Config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import { useRouter } from "next/router";
// const langs = require("../../lang").comoFunciona;

// External Components

// Internal components
import BoxWithTitle from "../../../molecules/specificBox/boxWithTitle";
import DataDisplay from "../../../molecules/dataDisplay/dataDisplay";

const useStyles = makeStyles((theme) => ({}));

const ShippingAddressCard = (props) => {
    const lang = props.lang;
    const theme = useTheme();
    const classes = useStyles();
    // const router = useRouter();
    // const lang = langs[router.locale];

    return (
        <BoxWithTitle title={lang.title}>
            <DataDisplay
                title={lang.addressNameTitle}
                text={props.shippingAddress.addressName}
                style={{ marginBottom: theme.spacing(2) }}
            />
            <DataDisplay
                title={lang.addressDetailsTitle}
                text={props.shippingAddress.addressDetails}
                style={{ marginBottom: theme.spacing(2) }}
            />
            <DataDisplay
                title={lang.preferredScheduleTitle}
                text={props.shippingAddress.preferredSchedule || lang.preferredScheduleTitleEmptyState}
                style={{ marginBottom: theme.spacing(2) }}
            />
            <DataDisplay
                title={lang.shippingCostTitle}
                text={!!props.shippingCost ? [lang.shippingCostLabel, <b>{props.shippingCost} €</b>] : lang.shippingCostLabel}
            />
        </BoxWithTitle>
    );
};

export default ShippingAddressCard;
