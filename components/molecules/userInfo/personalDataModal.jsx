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

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "30ch",
            [theme.breakpoints.down("sm")]: {
                width: "36ch",
            },
        },
        marginLeft: "-0.6rem",
    },
    phoneInput: {
        marginTop: ".6rem",
        height: "3.2rem",
    },
}));

const PersonalDataModal = (props) => {
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
            title="Modificar datos personales"
            handleClose={props.handleClose}
            fullScreen
            handlePrimaryButtonClick={handleChangePersonalData}
            primaryButtonText={props.primaryButtonText}
            secondaryButtonText={props.secondaryButtonText}
            handlePrimaryButtonClick={handleSubmit}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <form noValidate autoComplete="off">
                                <TextField
                                    className={classes.root}
                                    id="outlined-basic"
                                    label="Nombre"
                                    variant="outlined"
                                    name="name"
                                    style={{ marginBottom: "-1rem" }}
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <form noValidate autoComplete="off">
                                <TextField
                                    className={classes.root}
                                    id="outlined-basic"
                                    name="lastName"
                                    label="Apellido"
                                    variant="outlined"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <PhoneNumberInput
                                handleChange={handleChange}
                                placeholder="Telefono (1)"
                                value={formData.phone1}
                                name="phone1"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <PhoneNumberInput
                                value={formData.phone2}
                                handleChange={handleChange}
                                placeholder="Telefono (2)"
                                name="phone2"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <DatePicker
                                label="Fecha de Nacimiento"
                                value={formData.birthDateValue}
                                handleChange={handleChange}
                                name="birthDateValue"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <PreferedLanguageInput name="preferedLanguage" value={formData.preferedLanguage} handleChange={handleChangeInput} />
                </Grid>
            </Grid>
        </Modal>
    );
};

export default PersonalDataModal;
