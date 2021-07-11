// Utils & Config
import React, { useState } from "react";
import { isPassword, isEmpty } from "../../../helpers/regex/regex";

// External components
import Grid from "@material-ui/core/Grid";
import { useTheme, makeStyles } from '@material-ui/core/styles'

// Internal Components
import Modal from "../../atoms/modal/modal";
import { PasswordInput } from "../../atoms/inputs/inputs";


const PasswordModal = (props) => {
    const theme = useTheme();

    const [newPassword, setNewPassword] = useState('')
    const [repeatNewPassword, setRepeatNewPassword] = useState('')

    const handleChangeNewPassword = (e) => {
        setNewPassword(e.target.value)
    }

    const handleChangeRepeatNewPassword = (e) => {
        setRepeatNewPassword(e.target.value)
    }

    const handleChangePassword = () => {
        props.handlePrimaryButtonClick(newPassword);
        setNewPassword('');
        setRepeatNewPassword('');
    }

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            title='Modificar correo electronico'
            handlePrimaryButtonClick={handleChangePassword}
            primaryButtonText={props.primaryButtonText}
            secondaryButtonText={props.secondaryButtonText}
            fullScreen={true}
            disabled={((!isPassword(newPassword)) || (newPassword !== repeatNewPassword) || (isEmpty(newPassword)))}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PasswordInput
                        label='Nueva contraseña'
                        name="newPassword"
                        value={newPassword}
                        onChange={handleChangeNewPassword}
                    />
                </Grid>
                <Grid item xs={12}>
                    <PasswordInput
                        label='Repita su nueva contraseña'
                        name="repeatNewPassword"
                        value={repeatNewPassword}
                        onChange={handleChangeRepeatNewPassword}
                        helperText='La contraseña debe tener al menos 8 caracteres, 1 mayúscula y 1 número'
                    />
                </Grid>
            </Grid>
        </Modal>
    );
};

export default PasswordModal;
