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

const PaymentMethodCard = props => {
    const theme = useTheme();
    const classes = useStyles();
    // const router = useRouter();
    // const lang = langs[router.locale];

    return (
        <BoxWithTitle title='Método de pago'>
            <DataDisplay title='Tarjeta' text={props.paymentMethod.cardLabel} style={{ marginBottom: theme.spacing(2) }} />
            <DataDisplay title='Vencimiento' text={props.paymentMethod.expirationDateLabel} />
        </BoxWithTitle>
    );
};

export default PaymentMethodCard;
