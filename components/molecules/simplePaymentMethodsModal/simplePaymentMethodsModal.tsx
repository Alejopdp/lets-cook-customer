import React, { useState, useEffect } from "react";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { Radio, RadioGroup, FormControlLabel, FormControl, Typography } from "@material-ui/core";
import Modal from "../../atoms/modal/modal";
import { capitalizeFirstLetter } from "helpers/utils/utils";

type SimplePaymentMethodModalProps = {
    open: boolean;
    handleClose: () => void;
    handleSelectPaymentMethod: (paymentMethodId: string) => void;
    initialData: any[];
    primaryButtonText: string;
    secondaryButtonText: string;
    customerId: string;
    title: string;
    selectedWalletPaymentMethodId: string;
};

const SimplePaymentMethodModal = (props: SimplePaymentMethodModalProps) => {
    const [selectedCard, setSelectedCard] = useState(props.selectedWalletPaymentMethodId);

    const handleSubmit = async () => {
        props.handleSelectPaymentMethod(selectedCard);
    };

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            title={props.title}
            fullScreen
            handlePrimaryButtonClick={handleSubmit}
            primaryButtonText={props.primaryButtonText}
            secondaryButtonText={props.secondaryButtonText}
        >
            <FormControl component="fieldset" style={{ width: "100%" }}>
                <Typography variant="subtitle2" color="initial">
                    Mis tarjetas
                </Typography>
                <RadioGroup aria-label="gender" name="savedCards" value={selectedCard} onChange={(e) => setSelectedCard(e.target.value)}>
                    {props.initialData
                        .filter((pm) => pm.id !== "wallet")
                        .map((paymentMethod) => (
                            <FormControlLabel
                                value={paymentMethod.id}
                                control={<Radio color="primary" />}
                                label={`${paymentMethod.card ? capitalizeFirstLetter(paymentMethod.card) : paymentMethod.card} - ${
                                    paymentMethod.expirationDate
                                }`}
                                checked={paymentMethod.id === selectedCard}
                            />
                        ))}
                </RadioGroup>
            </FormControl>

            <div style={{ display: "flex", marginTop: "16px", alignItems: "center" }}>
                <ErrorOutlineIcon color="secondary" style={{ marginRight: 8 }} />
                <i style={{ marginLeft: ".2rem", fontStyle: "italic" }}>
                    Si quieres agregar un nuevo método de pago deberás hacerlo desde tu configuración
                </i>
            </div>
        </Modal>
    );
};

export default SimplePaymentMethodModal;
