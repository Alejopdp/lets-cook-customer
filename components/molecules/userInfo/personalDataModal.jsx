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
    const lang = props.lang;

    const [formData, setformData] = useState({
        name: props.personalData.name,
        lastName: props.personalData.lastName,
        birthDateValue: props.personalData.birthDateValue,
        preferredLanguage: props.personalData.preferredLanguage,
        phone1: props.personalData.phone1,
        phone2: props.personalData.phone2,
    });

    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        props.handleSubmit(formData);
    };

    return (
        <Modal
            open={props.open}
            title={lang.title}
            handleClose={props.handleClose}
            fullScreen
            primaryButtonText={props.primaryButtonText}
            secondaryButtonText={props.secondaryButtonText}
            handlePrimaryButtonClick={handleSubmit}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-basic"
                        label={lang.name}
                        variant="outlined"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-basic"
                        name="lastName"
                        label={lang.lastName}
                        variant="outlined"
                        value={formData.lastName}
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <PhoneNumberInput
                        handleChange={handleChange}
                        placeholder={lang.phone1}
                        label={lang.phone1}
                        value={formData.phone1}
                        name="phone1"
                    />
                </Grid>
                <Grid item xs={12}>
                    <PhoneNumberInput
                        value={formData.phone2}
                        handleChange={handleChange}
                        placeholder={lang.phone2}
                        label={lang.phone2}
                        name="phone2"
                    />
                </Grid>
                <Grid item xs={12}>
                    <DatePicker label={lang.birthDate} value={formData.birthDateValue} handleChange={handleChange} name="birthDateValue" />
                </Grid>
                <Grid item xs={12}>
                    <PreferedLanguageInput name="preferredLanguage" value={formData.preferedLanguage} handleChange={handleChange} />
                </Grid>
            </Grid>
        </Modal>
    );
};

export default PersonalDataModal;
