import React, { useState } from "react";
import { FormControl, TextField, Typography, Box, RadioGroup, FormControlLabel, Radio, InputAdornment } from "@material-ui/core";
import Modal from "../../atoms/modal/modal";
import { IPaymentMethod } from "@stores";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { capitalizeFirstLetter } from "helpers/utils/utils";
import { monedero } from "../../../lang/index";
import { useRouter } from "next/router";
import { locale } from "types/locale";

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
    const router = useRouter();
    const lang = monedero[router.locale as locale];
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
            disabled={props.isSubmitting || amountToCharge < 5 || !!!amountToCharge}
        >
            <FormControl component="fieldset" style={{ width: "100%" }}>
                <Box marginBottom={4}>
                    <Typography variant="subtitle2" color="textSecondary" style={{ fontSize: "14px", marginBottom: 16 }}>
                        {lang.chargeWalletModal.amountInputLabel}
                    </Typography>
                    <Box width={"50%"}>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            name="amountCharge"
                            label={lang.chargeWalletModal.amountTochargeInputPlaceholder}
                            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                            type="number"
                            error={!!amountToCharge && amountToCharge < 5}
                            helperText={!!amountToCharge && amountToCharge < 5 ? lang.minimumAmountToCharge : ""}
                            FormHelperTextProps={{ style: { fontStyle: "italic", marginLeft: 0 } }}
                            variant="outlined"
                            value={amountToCharge}
                            onChange={(e) => setAmountToCharge(parseFloat(e.target.value))}
                        />
                    </Box>
                </Box>
                <Box>
                    <Typography variant="subtitle2" color="textSecondary" style={{ fontSize: "14px", marginBottom: 8 }}>
                        {lang.chargeWalletModal.myCards}
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
                                    label={`${paymentMethod.card ? capitalizeFirstLetter(paymentMethod.card) : paymentMethod.card} - ${
                                        paymentMethod.expirationDate
                                    }`}
                                    checked={paymentMethod.id === selectedCard}
                                />
                            ))}
                    </RadioGroup>
                </Box>
            </FormControl>
            <div style={{ display: "flex", marginTop: "16px", alignItems: "center" }}>
                <ErrorOutlineIcon color="secondary" style={{ marginRight: 8 }} />
                <i style={{ marginLeft: ".2rem", fontStyle: "italic" }}>{lang.chargeWalletModal.myCardsWarning}</i>
            </div>
        </Modal>
    );
};

export default AmountToChargeModal;
