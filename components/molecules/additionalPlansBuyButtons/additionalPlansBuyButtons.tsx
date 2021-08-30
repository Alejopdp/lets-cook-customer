import React from "react";
import PropTypes from "prop-types";
import { Box, Button, useTheme } from "@material-ui/core";
import { RoundedButton } from "@atoms";
import { useRouter } from "next/router";


type AdditionalPlansBuyButtonsProps = {
    totalValue: number;
    handleSubmitPayment: () => void;
    handleSecondaryButtonClick?: () => void;
    secondaryButtonLabel?: string;
    isLoadingPayment: boolean;
};

const AdditionalPlansBuyButtons = (props: AdditionalPlansBuyButtonsProps) => {
    const theme = useTheme();
    const router = useRouter();

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            {props.totalValue > 0 && (
                <RoundedButton
                    label={`PAGAR ADICIONALES (${props.totalValue} €)`}
                    onClick={props.handleSubmitPayment}
                    disabled={props.isLoadingPayment}
                    isLoading={props.isLoadingPayment}
                    style={{ marginBottom: theme.spacing(2) }}
                />
            )}
            {props.secondaryButtonLabel && (
                <Button variant="text" onClick={props.handleSecondaryButtonClick}>
                    {props.secondaryButtonLabel}
                </Button>
            )}
        </Box>
    );
};

AdditionalPlansBuyButtons.propTypes = {};

export default AdditionalPlansBuyButtons;
