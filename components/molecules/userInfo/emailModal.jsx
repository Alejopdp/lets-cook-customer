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
    const theme = useTheme();
    const lang = props.lang;

    const [newEmail, setNewEmail] = useState('')

    const handleChange = (e) => {
        setNewEmail(e.target.value)
    }

    const handleChangeEmail = () => {
        props.handlePrimaryButtonClick(newEmail);
        setNewEmail('');
    }

    return (
        <Modal
            open={props.open}
            title={lang.title}
            handlePrimaryButtonClick={handleChangeEmail}
            handleClose={props.handleClose}
            primaryButtonText={props.primaryButtonText}
            secondaryButtonText={props.secondaryButtonText}
            fullScreen={true}
            disabled={!isEmail(newEmail)}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" label={lang.newEmail} variant="outlined" value={newEmail} onChange={handleChange} type='email' style={{ width: '100%' }} />
                </Grid>
            </Grid>
        </Modal>
    );
};

export default EmailModal;
