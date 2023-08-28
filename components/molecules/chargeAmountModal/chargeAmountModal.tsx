import React, { useState } from "react";
import { FormControl, TextField, Typography, Box, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import Modal from "../../atoms/modal/modal";
import { IPaymentMethod } from "@stores";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { capitalizeFirstLetter } from "helpers/utils/utils";

type ChargeAmountModal = {
    open: boolean;
    handleClose: () => void;
    title: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    handleSubmit: (amountToCharge: number, paymentMethodId: string) => void;
    paymentMethods: IPaymentMethod[];
    walletPaymentMethodId: string;
    isSubmitting: boolean;
};

const AmountToChargeModal = (props: ChargeAmountModal) => {
    const [amountToCharge, setAmountToCharge] = useState(0);
    const [selectedCard, setSelectedCard] = useState(props.walletPaymentMethodId);

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            title={props.title}
            fullScreen
            handlePrimaryButtonClick={() => props.handleSubmit(amountToCharge, selectedCard)}
            primaryButtonText={props.primaryButtonText}
            secondaryButtonText={props.secondaryButtonText}
            disabled={props.isSubmitting}
        >
            <FormControl component="fieldset" style={{ width: "100%" }}>
                <Box marginBottom={4}>
                    <Typography variant="subtitle2" color="textSecondary" style={{ fontSize: "14px", marginBottom: 16 }}>
                        Importe a Cargar
                    </Typography>
                    <Box width={"50%"}>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            name="amountCharge"
                            label="Importe"
                            type="number"
                            variant="outlined"
                            value={amountToCharge}
                            onChange={(e) => setAmountToCharge(parseFloat(e.target.value))}
                        />
                    </Box>
                </Box>
                <Box>
                    <Typography variant="subtitle2" color="textSecondary" style={{ fontSize: "14px", marginBottom: 8 }}>
                        Mis tarjetas
                    </Typography>
                    <RadioGroup
                        aria-label="gender"
                        name="savedCards"
                        value={selectedCard}
                        onChange={(e) => setSelectedCard(e.target.value)}
                    >
                        {props.paymentMethods
                            .filter((pm) => pm.id !== "wallet")
                            .map((paymentMethod) => (
                                <FormControlLabel
                                    value={paymentMethod.id}
                                    control={<Radio color="primary" />}
                                    label={`${capitalizeFirstLetter(paymentMethod.card)} - ${paymentMethod.expirationDate}`}
                                    checked={paymentMethod.id === selectedCard}
                                />
                            ))}
                    </RadioGroup>
                </Box>
            </FormControl>
            <div style={{ display: "flex", marginTop: "16px", alignItems: "center" }}>
                <ErrorOutlineIcon color="secondary" style={{ marginRight: 8 }} />
                <i style={{ marginLeft: ".2rem", fontStyle: "italic" }}>
                    La tarjeta que selecciones solo se usará para esta carga, no quedará seleccionada para otra operación.
                </i>
            </div>
        </Modal>
    );
};

export default AmountToChargeModal;
