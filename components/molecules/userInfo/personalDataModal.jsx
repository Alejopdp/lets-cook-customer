import React, { useState, useEffect } from "react";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

// Internal Components
import Modal from "../../atoms/modal/modal";
import PhoneNumberInput from "../../atoms/phoneNumberInput/phoneNumberInput";
import PreferedLanguageInput from "../../atoms/preferedLanguageInput/preferedLanguageInput";
import DatePicker from "../../atoms/datePickerInput/datePickerInput";



const PersonalDataModal = (props) => {

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phone1: '',
        phone2: '',
        birthdayDate: '',
        preferedLanguage: ''
    })

    useEffect(() => {
        setFormData({
            name: props.initialData.clientName,
            surname: props.initialData.clientSurname,
            phone1: props.initialData.phone1,
            phone2: props.initialData.phone2,
            birthdayDate: props.initialData.birthdayDate,
            preferedLanguage: props.initialData.preferedLanguage.value
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

    const handleChangePhone1 = (newValue) => {
        setFormData({
            ...formData,
            phone1: newValue
        })
    }

    const handleChangePhone2 = (newValue) => {
        setFormData({
            ...formData,
            phone2: newValue
        })
    }

    const handleChangePersonalData = () => {
        props.handlePrimaryButtonClick(formData);
    }

    return (
        <Modal
            open={props.open}
            title='Modificar datos personales'
            handleClose={props.handleClose}
            fullScreen
            handlePrimaryButtonClick={handleChangePersonalData}
            primaryButtonText={props.primaryButtonText}
            secondaryButtonText={props.secondaryButtonText}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField id="outlined-basic" label="Nombre" variant="outlined" name='name' value={formData.name} onChange={handleChangeInput} style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="outlined-basic" label="Apellido" variant="outlined" name='surname' value={formData.surname} onChange={handleChangeInput} style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <PhoneNumberInput placeholder="Telefono (1)" name='phone1' value={formData.phone1} handleChange={handleChangePhone1} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <PhoneNumberInput placeholder="Telefono (2)" name='phone2' value={formData.phone2} handleChange={handleChangePhone2} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField id="date" label="Fecha de Nacimiento" name='birthdayDate' value={formData.birthdayDate} onChange={handleChangeInput} type="date" style={{ width: '100%' }} InputLabelProps={{ shrink: true }} variant="outlined" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <PreferedLanguageInput name='preferedLanguage' value={formData.preferedLanguage} handleChange={handleChangeInput} />
                </Grid>
            </Grid>
        </Modal>
    );
};

export default PersonalDataModal;
