// Utils & Config
import React, { useState } from "react";
import { isPassword, isEmpty } from "../../../helpers/regex/regex";

// External components
import Grid from "@material-ui/core/Grid";
import { useTheme, makeStyles } from "@material-ui/core/styles";

// Internal Components
import Modal from "../../atoms/modal/modal";
import { PasswordInput } from "../../atoms/inputs/inputs";

const PasswordModal = (props) => {
    const lang = props.lang;
    const theme = useTheme();

    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");

    const handleChangeNewPassword = (e) => {
        setNewPassword(e.target.value);
    };

    const handleChangeRepeatNewPassword = (e) => {
        setRepeatNewPassword(e.target.value);
    };

    const handleChangePassword = () => {
        props.handlePrimaryButtonClick(newPassword);
        setNewPassword("");
        setRepeatNewPassword("");
    };

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            title={lang.title}
            handlePrimaryButtonClick={handleChangePassword}
            primaryButtonText={props.primaryButtonText}
            secondaryButtonText={props.secondaryButtonText}
            fullScreen={true}
            disabled={!isPassword(newPassword) || newPassword !== repeatNewPassword || isEmpty(newPassword) || props.isSubmitting}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PasswordInput label={lang.newPassword} name="newPassword" value={newPassword} onChange={handleChangeNewPassword} />
                </Grid>
                <Grid item xs={12}>
                    <PasswordInput
                        label={lang.repeatNewPassword}
                        name="repeatNewPassword"
                        value={repeatNewPassword}
                        onChange={handleChangeRepeatNewPassword}
                        helperText={lang.helperText}
                    />
                </Grid>
            </Grid>
        </Modal>
    );
};

export default PasswordModal;
