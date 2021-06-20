// Utils & Config
import React from 'react';
import PropTypes from "prop-types";

// External components
import { Box, Typography } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';

// Internal components
import FormPaperWithIcons from '../formPaperWithIcons/formPaperWithIcons';
import { TextInput } from '../../atoms/inputs/inputs';
import CustomButton from "../../atoms/customButton/customButton";

const ShipmentForm = (props) => {
    return (
        <FormPaperWithIcons title="Datos de entrega" initialIcon="/icons/checkout/informacion-de-envio.svg" finalIcons>
            <TextInput
                name="address"
                label="Dirección de entrega"
                placeholder="Dirección de entrega (calle y número)"
                value={props.address}
                onChange={props.onChange}
            />

            <TextInput
                name="clarifications"
                label="Piso / puerta / aclaraciones"
                value={props.clarifications}
                onChange={props.onChange}
            />

            <Box display="flex" flexDirection="row">
                <Box width="50%" marginRight="8px">
                    <TextInput
                        name="name"
                        label="Nombre"
                        value={props.name}
                        onChange={props.onChange}
                    />
                </Box>
                <Box width="50%" marginLeft="8px">
                    <TextInput
                        name="lastName"
                        label="Apellido/s"
                        value={props.lastName}
                        onChange={props.onChange}
                    />
                </Box>
            </Box>

            <TextInput
                name="phoneNumber"
                label="[selectField] Número de teléfono"
                value={props.phoneNumber}
                onChange={props.onChange}
            />

            {props.registeredUser &&
                <Box display="flex" alignItems="center" marginBottom="16px" color="#F89719">
                    <ErrorIcon style={{marginRight: "8px"}}/>

                    <Typography variant="body1">
                    <b>Luego podrás cambiar los datos de entrega desde tu perfil</b>
                    </Typography>
                </Box>
            }

            <Typography variant="body2" paragraph>
                <b>¿Tienes alguna restricción a la hora de ingerir algún tipo de alimento?</b>
            </Typography>

            <TextInput
                name="restrictions"
                label="Ingrese aquí sus restricciones (solo si aplica)"
                value={props.restrictions}
                onChange={props.onChange}
            />

            <CustomButton
                text="Continuar"
                onClick={props.onClick}
            />

        </FormPaperWithIcons>
    )
}

ShipmentForm.propTypes = {
    address: PropTypes.string.isRequired,
    clarifications: PropTypes.string,
    name: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.number.isRequired,
    registeredUser: PropTypes.bool,
    restrictions: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ShipmentForm;