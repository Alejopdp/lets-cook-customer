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
    const theme = useTheme();
    const classes = useStyles();
    // const router = useRouter();
    // const lang = langs[router.locale];

    return (
        <BoxWithTitle title="Dirección de entrega">
            <DataDisplay title="Dirección" text={props.shippingAddress.addressName} style={{ marginBottom: theme.spacing(2) }} />
            <DataDisplay
                title="Piso / Puerta / Aclaraciones"
                text={props.shippingAddress.addressDetails}
                style={{ marginBottom: theme.spacing(2) }}
            />
            <DataDisplay
                title="Horario de preferencia"
                text={props.shippingAddress.preferredSchedule}
                style={{ marginBottom: theme.spacing(2) }}
            />
            <DataDisplay
                title="Costo de envío"
                text={
                    !!props.shippingCost
                        ? [`Tu próximo pedido tiene un costo de envío de `, <b>{props.shippingCost} €</b>]
                        : "Tu próximo pedido no tiene costo de envío"
                }
            />
        </BoxWithTitle>
    );
};

export default ShippingAddressCard;
