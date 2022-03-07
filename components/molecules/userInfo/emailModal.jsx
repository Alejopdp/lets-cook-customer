// Utils & Config
import React, { useState } from "react";
import { isEmail } from "../../../helpers/regex/regex";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useTheme, makeStyles } from '@material-ui/core/styles'
import TextField from "@material-ui/core/TextField";

// Internal Components
import Modal from "../../atoms/modal/modal";


const EmailModal = (props) => {
    const lang = props.lang;
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    const [newEmail, setNewEmail] = useState('')

    const handleChange = (e) => {
        setNewEmail(e.target.value)
    }

    const handleChangeEmail = async () => {
        const succeded= await props.handlePrimaryButtonClick(newEmail);

        if(succeded) {
            setShowSuccessMessage(true)
        }

    }

    const handleSuccedButton = () => {
        setNewEmail("")
        setShowSuccessMessage(false)
        props.handleClose()
    }

    return (
        <Modal
            open={props.open}
            title={lang.title}
            handlePrimaryButtonClick={showSuccessMessage ? handleSuccedButton : handleChangeEmail}
            handleClose={props.handleClose}
            primaryButtonText={showSuccessMessage ? lang.successPrimaryButtonText : props.primaryButtonText}
            secondaryButtonText={props.secondaryButtonText}
            fullScreen={true}
            disabled={!isEmail(newEmail) || props.isSubmitting}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {!showSuccessMessage ? <TextField id="outlined-basic" label={lang.newEmail} variant="outlined" value={newEmail} onChange={handleChange} type='email' style={{ width: '100%' }}/> : <Typography>{lang.successMessage(newEmail)}</Typography>}
                </Grid>
            </Grid>
        </Modal>
    );
};

export default EmailModal;
