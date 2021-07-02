// Utils & Config
import React from 'react';
import useStyles from "./styles";

// External components
import { Box, Typography } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import HttpsOutlinedIcon from '@material-ui/icons/HttpsOutlined';

// Internal components
import { FormPaperWithIcons } from '@molecules';
import StripeForm from "../../molecules/stripeForm/stripeForm";
import { RoundedCheckbox, CustomCheckbox, CustomButton } from '@atoms';
import { useRouter } from 'next/router';

export const PaymentForm = (props) => {
    const { box, chckbox } = useStyles();
    const router = useRouter();

    const handleOnChange = () => {
        router.push("/aviso-legal")
    }

    return (
        <FormPaperWithIcons title="Métodos de pago" initialIcon="/icons/checkout/metodos-de-pago.svg">
            <RoundedCheckbox
                name="savedCards"
                label="Mis tarjetas guardadas"
                checked={props.checked}
                onChange={props.onChange}
            />

            {props.savedCards &&
                <Box className={box}>
                    <RoundedCheckbox
                        name="savedCard1"
                        label="Visa terminada en 1234"
                        checked={props.checked}
                        onChange={props.onChange}
                    />

                    <RoundedCheckbox
                        name="savedCard2"
                        label="Master terminada en 1234"
                        checked={props.checked}
                        onChange={props.onChange}
                    />
                </Box>
            }

            <RoundedCheckbox
                name="newPaymentMethod"
                label="Ingresar nuevo método de pago"
                checked={props.checked}
                onChange={props.onChange}
            />
            <StripeForm />
            <CustomCheckbox
                name="acceptTerms"
                label={<p>He leído y acepto las <b>condiciones generales de venta</b></p>}
                className={chckbox}
                checked={props.checked}
                handleChange={props.onChange}
                // rediretTo='/aviso-legal'
            />

            <CustomButton
                text="Realizar pago"
                icon={<HttpsOutlinedIcon />}
                disabled={props.disabled}
                onClick={props.handleSubmitPayment}
            />
        </FormPaperWithIcons>
    )
}

export default PaymentForm;
