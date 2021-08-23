import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import StripeForm from "components/molecules/stripeForm/stripeForm";
import { IPaymentMethod } from "@stores";
import { PaymentMethodFormProps } from "./interfaces";
import { capitalizeFirstLetter } from "helpers/utils/utils";

const PaymentMethodForm = (props: PaymentMethodFormProps) => {
    return (
        <FormControl component="fieldset" style={{ width: "100%" }}>
            <RadioGroup aria-label="gender" name="gender1" value={props.selectedOption} onChange={props.setselectedOption}>
                {props.paymentMethods.length > 0 && <FormControlLabel value="card" control={<Radio />} label="Mis tarjetas guardadas" />}
                {props.selectedOption === "card" ? (
                    <RadioGroup
                        aria-label="paymentMethods"
                        name="savedCards"
                        value={props.selectedSavedCard}
                        onChange={props.setselectedSavedCard}
                        style={{ marginLeft: "2rem" }}
                    >
                        {props.paymentMethods.map((paymentMethod: IPaymentMethod) => (
                            <FormControlLabel
                                value={paymentMethod.id}
                                control={<Radio />}
                                label={capitalizeFirstLetter(paymentMethod.label) || capitalizeFirstLetter(paymentMethod.card)}
                            />
                        ))}
                    </RadioGroup>
                ) : null}
                {props.paymentMethods.length > 0 && (
                    <FormControlLabel
                        value="newPaymentMethod"
                        control={<Radio />}
                        label="Ingresar nuevo metodo de pago"
                        // onClick={props.setselectedOption}
                    />
                )}{" "}
                {props.selectedOption === "newPaymentMethod" || props.paymentMethods.length === 0 ? <StripeForm /> : null}
            </RadioGroup>
        </FormControl>
    );
};

PaymentMethodForm.propTypes = {};

export default PaymentMethodForm;
