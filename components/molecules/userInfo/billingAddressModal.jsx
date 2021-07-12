import React, { useState, useEffect } from "react";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

// Internal Components
import Modal from "../../atoms/modal/modal";



const BillingAddressModal = (props) => {

    const [formData, setFormData] = useState({
        addressName: '',
        addressDescription: '',
        name: '',
        document: '',
    })

    useEffect(() => {
        setFormData({
            addressName: props.initialData.addressName,
            addressDescription: props.initialData.addressDescription,
            name: props.initialData.name,
            document: props.initialData.document
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

    const handleChangeBillingAddress = () => {
        props.handlePrimaryButtonClick(formData);
    }

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            title='Modificar direccion de facturacion'
            fullScreen
            handlePrimaryButtonClick={handleChangeBillingAddress}
            primaryButtonText={props.primaryButtonText}
            secondaryButtonText={props.secondaryButtonText}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" label="Direccion de Entrega" name='addressName' value={formData.addressName} onChange={handleChangeInput} variant="outlined" style={{ width: "100%" }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" label="Piso / Puerta / Aclaraciones" name='addressDescription' value={formData.addressDescription} onChange={handleChangeInput} variant="outlined" style={{ width: "100%" }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" label="Nombre Completo" name='name' value={formData.name} onChange={handleChangeInput} variant="outlined" style={{ width: "100%" }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" label="DNI/NIE/CIF" name='document' value={formData.document} onChange={handleChangeInput} variant="outlined" style={{ width: "100%" }} />
                </Grid>
            </Grid>
        </Modal>
    );
};

export default BillingAddressModal;
