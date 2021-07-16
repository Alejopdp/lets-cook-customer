import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import StripeForm from "components/molecules/stripeForm/stripeForm";
import { IPaymentMethod } from "@stores";
import { PaymentMethodFormProps } from "./interfaces";

const PaymentMethodForm = (props: PaymentMethodFormProps) => {
    return (
        <FormControl component="fieldset" style={{ width: "100%" }}>
            <RadioGroup aria-label="gender" name="gender1" value={props.selectedOption} onChange={props.setselectedOption}>
                <FormControlLabel value="card" control={<Radio />} label="Mis tarjetas guardadas" />
                {props.selectedOption === "card" ? (
                    <RadioGroup
                        aria-label="paymentMethods"
                        name="savedCards"
                        value={props.selectedSavedCard}
                        onChange={props.setselectedSavedCard}
                        style={{ marginLeft: "2rem" }}
                    >
                        {props.paymentMethods.map((paymentMethod: IPaymentMethod) => (
                            <FormControlLabel value={paymentMethod.id} control={<Radio />} label={paymentMethod.label} />
                        ))}
                    </RadioGroup>
                ) : null}
                <FormControlLabel
                    value="newPaymentMethod"
                    control={<Radio />}
                    label="Ingresar nuevo metodo de pago"
                    // onClick={props.setselectedOption}
                />
                {props.selectedOption === "newPaymentMethod" ? <StripeForm /> : null}
            </RadioGroup>
        </FormControl>
    );
};

PaymentMethodForm.propTypes = {};

export default PaymentMethodForm;
