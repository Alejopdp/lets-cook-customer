import React from "react";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import StripeForm from "components/molecules/stripeForm/stripeForm";
import { IPaymentMethod } from "@stores";
import { PaymentMethodFormProps } from "./interfaces";
import { ValuePropositionSection } from "@organisms";

const PaymentMethodForm = (props: PaymentMethodFormProps) => {
    const lang = props.lang;

    return (
        <FormControl component="fieldset" style={{ width: "100%" }}>
            <RadioGroup
                aria-label="paymentForm"
                name="paymentForm"
                value={props.selectedOption}
                onChange={(e) => {
                    if (e.target.value === "card") {
                        props.setselectedOption(e);
                        props.setselectedSavedCard({ target: { value: props.paymentMethods.filter((pm) => pm.id !== "wallet")[0].id } });
                    }
                }}
            >
                {props.paymentMethods.length > 0 && (
                    <FormControlLabel
                        value="card"
                        control={<Radio checked={props.selectedOption === "card"} />}
                        label={lang.savedCardLabel}
                    />
                )}
                {(props.selectedOption === "card" || props.selectedOption === "wallet") && (
                    <RadioGroup
                        aria-label="paymentMethods"
                        name="savedCards"
                        value={"card"}
                        onChange={(e) => {
                            props.setselectedOption({ target: { value: "card" } });
                            props.setselectedSavedCard(e);
                        }}
                        style={{ marginLeft: "2rem" }}
                    >
                        {props.paymentMethods
                            .filter((pm) => pm.id !== "wallet")
                            .map((paymentMethod: IPaymentMethod) => (
                                <FormControlLabel
                                    value={paymentMethod.id}
                                    control={<Radio checked={props.selectedSavedCard === paymentMethod.id} />}
                                    label={paymentMethod.label || paymentMethod.card}
                                    onChange={(e) => {
                                        props.setselectedSavedCard(e);
                                        props.setselectedOption({ target: { value: "card" } });
                                    }}
                                />
                            ))}
                    </RadioGroup>
                )}

                {props.paymentMethods.some((pm) => pm.id === "wallet") && (
                    <FormControlLabel
                        value="wallet"
                        control={
                            <Radio value={"wallet"} checked={props.selectedOption === "wallet" && props.selectedSavedCard === "wallet"} />
                        }
                        label={"Monedero"}
                        onChange={(e) => {
                            props.setselectedSavedCard(e);
                            props.setselectedOption(e);
                        }}
                    />
                )}

                {props.paymentMethods.length > 0 && (
                    <FormControlLabel
                        value="newPaymentMethod"
                        control={<Radio />}
                        label={lang.addNewPaymentMethodLabel}
                        onChange={(e) => {
                            props.setselectedOption(e);
                        }}
                    />
                )}
                {props.selectedOption === "newPaymentMethod" || props.paymentMethods.length === 0 ? <StripeForm /> : null}
            </RadioGroup>
        </FormControl>
    );
};

export default PaymentMethodForm;
