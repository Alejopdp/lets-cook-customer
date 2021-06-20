// Utils & Config
import React from 'react';
import useStyles from "./styles";
import PropTypes from "prop-types";

// External components
import { Box, Typography } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import HttpsOutlinedIcon from '@material-ui/icons/HttpsOutlined';

// Internal components
import FormPaperWithIcons from '../formPaperWithIcons/formPaperWithIcons';
import RoundedCheckbox from '../../atoms/roundedCheckbox/roundedCheckbox';
import CustomCheckbox from '../../atoms/customCheckbox/customCheckbox';
import CustomButton from "../../atoms/customButton/customButton";

const PaymentForm = (props) => {
    const { box, chckbox } = useStyles();

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

            <CustomCheckbox
                name="acceptTerms"
                label="He leído y acepto las"
                boldText="condiciones generales de venta"
                redirectTo="/aviso-legal"
                className={chckbox}
                checked={props.checked}
                onChange={props.onChange}
            />

            <CustomButton
                text="Realizar pago"
                icon={<HttpsOutlinedIcon />}
                disabled={props.disabled}
            />
        </FormPaperWithIcons>
    )
}

PaymentForm.propTypes = {
};

export default PaymentForm;