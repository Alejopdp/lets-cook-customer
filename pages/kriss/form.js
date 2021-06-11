// Utils & Config
import React from 'react';
import PropTypes from "prop-types";
import ShipmentForm from '../../components/molecules/shipmentForm/shipmentForm';
import PaymentForm from '../../components/molecules/paymentForm/paymentForm';
import IconsWithText from '../../components/molecules/iconsWithText/iconsWithText';

const Form = () => {
    return (
        <>
            <ShipmentForm registeredUser/>
            <PaymentForm savedCards/>
            <IconsWithText />
        </>
    )
}

Form.propTypes = {
};

export default Form;