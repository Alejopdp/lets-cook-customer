// Utils & Config
import React from "react";
import { useTheme } from "@material-ui/core/styles";

// External Components

// Internal components
import BoxWithTitle from "../../../molecules/specificBox/boxWithTitle";
import DataDisplay from "../../../molecules/dataDisplay/dataDisplay";

const PaymentMethodCard = (props) => {
    const lang = props.lang;
    const theme = useTheme();

    return (
        <BoxWithTitle title={lang.title}>
            <DataDisplay
                title={lang.cardLabelTitle}
                text={props.paymentMethod.cardLabel.charAt(0).toUpperCase() + props.paymentMethod.cardLabel.slice(1)}
                style={{ marginBottom: theme.spacing(2) }}
            />
            <DataDisplay title={lang.expirationDateLabelTitle} text={props.paymentMethod.expirationDateLabel} />
        </BoxWithTitle>
    );
};

export default PaymentMethodCard;
