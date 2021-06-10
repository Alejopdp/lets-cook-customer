// Utils & Config
import React from 'react';
import PropTypes from "prop-types";
import ShipmentForm from '../../components/molecules/shipmentForm/shipmentForm';
import PaymentForm from '../../components/molecules/paymentForm/paymentForm';

const Form = () => {
    return (
        <>
            <ShipmentForm registeredUser/>
            <PaymentForm savedCards/>
        </>
    )
}

Form.propTypes = {
};

export default Form;