// Utils & Config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import { useRouter } from "next/router";
// const langs = require("../../lang").comoFunciona;

// External Components

// Internal components
import BoxWithTitle from "../../../molecules/specificBox/boxWithTitle";
import DataDisplay from "../../../molecules/dataDisplay/dataDisplay";

const useStyles = makeStyles((theme) => ({

}));

const ShippingAddressCard = props => {
    const theme = useTheme();
    const classes = useStyles();
    // const router = useRouter();
    // const lang = langs[router.locale];

    return (
        <BoxWithTitle title='Dirección de entrega'>
            <DataDisplay title='Dirección' text={props.shippingAddress.address} style={{ marginBottom: theme.spacing(2) }} />
            <DataDisplay title='Piso / Puerta / Aclaraciones' text={props.shippingAddress.floor} style={{ marginBottom: theme.spacing(2) }} />
            <DataDisplay title='Horario de preferencia' text={props.shippingAddress.preferredSchedule} />
        </BoxWithTitle>
    );
};

export default ShippingAddressCard;
