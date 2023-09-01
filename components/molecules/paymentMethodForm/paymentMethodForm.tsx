import React from "react";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import StripeForm from "components/molecules/stripeForm/stripeForm";
import { IPaymentMethod } from "@stores";
import { PaymentMethodFormProps } from "./interfaces";

const PaymentMethodForm = (props: PaymentMethodFormProps) => {
    const lang = props.lang;

    return (
        <FormControl component="fieldset" style={{ width: "100%" }}>
            <RadioGroup aria-label="paymentForm" name="paymentForm" value={props.selectedOption} onChange={props.setselectedOption}>
                {props.paymentMethods.length > 0 && <FormControlLabel value="card" control={<Radio />} label={lang.savedCardLabel} />}
                {props.selectedOption === "card" ? (
                    <RadioGroup
                        aria-label="paymentMethods"
                        name="savedCards"
                        value={props.selectedSavedCard}
                        onChange={props.setselectedSavedCard}
                        style={{ marginLeft: "2rem" }}
                    >
                        {props.paymentMethods
                            .filter((pm) => pm.id !== "wallet")
                            .map((paymentMethod: IPaymentMethod) => (
                                <FormControlLabel
                                    value={paymentMethod.id}
                                    control={<Radio />}
                                    label={paymentMethod.label || paymentMethod.card}
                                />
                            ))}
                    </RadioGroup>
                ) : null}
                {props.paymentMethods.length > 0 && (
                    <FormControlLabel value="newPaymentMethod" control={<Radio />} label={lang.addNewPaymentMethodLabel} />
                )}
                {props.selectedOption === "newPaymentMethod" || props.paymentMethods.length === 0 ? <StripeForm /> : null}
            </RadioGroup>
        </FormControl>
    );
};

export default PaymentMethodForm;
