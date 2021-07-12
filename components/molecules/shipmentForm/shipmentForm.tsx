import React, { memo, useState } from 'react';

// External components
import { Box, Typography } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';

// Internal components
import { FormPaperWithIcons } from '@molecules';
import { TextInput, CustomButton } from '@atoms';
import { ShipmentFormProps } from './interfaces';
import { useBuyFlow, DeliveryForm } from '@stores';

export const ShipmentForm = memo((props: ShipmentFormProps) => {

    const {setDeliveryInfo, form} = useBuyFlow(({setDeliveryInfo, form}) => ({setDeliveryInfo, form}))
    const [initialShippmentInfo, setinitialShippmentInfo] = useState<DeliveryForm>({
        addressDetails: form.deliveryForm.addressDetails,
        addressName: form.deliveryForm.addressName,
        firstName: form.deliveryForm.firstName,
        lastName: form.deliveryForm.lastName,
        phone1: form.deliveryForm.phone1,
        restrictions: form.deliveryForm.restrictions
    })


    const handleChange = (event) => {
        setDeliveryInfo({
            ...form.deliveryForm,
            [event.target.name]: event.target.value
        })
    }
    return (
        <FormPaperWithIcons title="Datos de entrega" initialIcon="/icons/checkout/informacion-de-envio.svg" finalIcons>
            <TextInput
                name="addressName"
                label="Dirección de entrega"
                placeholder="Dirección de entrega (calle y número)"
                value={form.deliveryForm.addressName}
                onChange={handleChange}
            />

            <TextInput
                name="addressDetails"
                label="Piso / puerta / aclaraciones"
                value={form.deliveryForm.addressDetails}
                onChange={handleChange}
            />

            <Box display="flex" flexDirection="row">
                <Box width="50%" marginRight="8px">
                    <TextInput
                        name="firstName"
                        label="Nombre"
                        value={form.deliveryForm.firstName}
                        onChange={handleChange}
                    />
                </Box>
                <Box width="50%" marginLeft="8px">
                    <TextInput
                        name="lastName"
                        label="Apellido/s"
                        value={form.deliveryForm.lastName}
                        onChange={handleChange}
                    />
                </Box>
            </Box>

            <TextInput
                name="phone1"
                label="[selectField] Número de teléfono"
                value={form.deliveryForm.phone1}
                onChange={handleChange}
            />

            {props.registeredUser &&
                <Box display="flex" alignItems="center" marginBottom="16px" color="#F89719">
                    <ErrorIcon style={{ marginRight: "8px" }} />

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
                value={form.deliveryForm.restrictions}
                onChange={handleChange}
            />

            <CustomButton
                text="Continuar"
                onClick={props.onClick}
            />

        </FormPaperWithIcons>
    )
});


export default ShipmentForm;