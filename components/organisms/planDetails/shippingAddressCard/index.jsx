// Utils & Config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import { useRouter } from "next/router";
// const langs = require("../../lang").comoFunciona;

// External Components

// Internal components
import BoxWithTitle from "../../../molecules/specificBox/boxWithTitle";
import DataDisplay from "../../../molecules/dataDisplay/dataDisplay";
import { useLang } from "@hooks";

const useStyles = makeStyles((theme) => ({}));

const ShippingAddressCard = (props) => {
    const theme = useTheme();
    const classes = useStyles();
    const [lang] = useLang('shippingAddressCard');

    return (
        <BoxWithTitle title={lang.deliveryAddress}>
            <DataDisplay title={lang.address} text={props.shippingAddress.addressName} style={{ marginBottom: theme.spacing(2) }} />
            <DataDisplay
                title={lang.titleDescription}
                text={props.shippingAddress.addressDetails}
                style={{ marginBottom: theme.spacing(2) }}
            />
            <DataDisplay title={lang.timeOfPreference} text={props.shippingAddress.preferredSchedule} />
        </BoxWithTitle>
    );
};

export default ShippingAddressCard;
