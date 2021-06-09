// Utils & Config
import React from 'react';
import PropTypes from "prop-types";

// Internal components
import { TextInput } from '../../atoms/inputs/inputs';
import FormPaperWithIcons from '../formPaperWithIcons/formPaperWithIcons';

const ShipmentForm = (props) => {
    return (
        <FormPaperWithIcons title="Datos de entrega" initialIcon="/icons/informacion-de-envio.svg" finalIcons>
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
        </FormPaperWithIcons>
    )
}

ShipmentForm.propTypes = {
};

export default ShipmentForm;