import React, { useState, useEffect } from "react";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

// Internal Components
import Modal from "../../atoms/modal/modal";
import PreferredDeliveryTimeInput from "../../atoms/preferredDeliveryTimeInput/preferredDeliveryTimeInput";


const DeliveryAddressModal = (props) => {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        addressName: '',
        addressDescription: '',
        preferredTimeToDelivery: ''
    })

    useEffect(() => {
        setFormData({
            addressName: props.initialData.addressName,
            addressDescription: props.initialData.addressDescription,
            preferredTimeToDelivery: props.initialData.preferredTimeToDelivery.value
        })
    }, [props.open]);


    const handleChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleChangeDeliveryAddress = () => {
        props.handlePrimaryButtonClick(formData);
    }

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            title='Modificar direccion de entrega'
            fullScreen
            handlePrimaryButtonClick={handleChangeDeliveryAddress}
            primaryButtonText={props.primaryButtonText}
            secondaryButtonText={props.secondaryButtonText}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" label="Direccion de Entrega" name='addressName' value={formData.addressName} onChange={handleChangeInput} variant="outlined" style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" label="Piso / Puerta / Aclaraciones" name='addressDescription' value={formData.addressDescription} onChange={handleChangeInput} variant="outlined" style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12}>
                    <PreferredDeliveryTimeInput name='preferredTimeToDelivery' value={formData.preferredTimeToDelivery} handleChange={handleChangeInput} />
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                    <ErrorOutlineIcon style={{ color: "red", marginRight: theme.spacing(1) }} />
                    <i style={{ fontStyle: "italic" }}>La direccion de entrega se modificara en todos los planes activos</i>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default DeliveryAddressModal;
