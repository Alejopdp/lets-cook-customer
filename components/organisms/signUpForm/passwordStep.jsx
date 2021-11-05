// Utils & Config
import React, {useState} from "react";
import PropTypes from "prop-types";
import { isPassword } from "../../../helpers/regex/regex";
import { useRouter } from "next/router";
const langs = require("../../../lang").passwordStep;
import cookies from "js-cookie";

// Internal components
import { PasswordInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import SocialNetworksButtons from "../../atoms/socialNetworksButtons/socialNetworksButtons";
import Divider from "../../atoms/divider/divider";
import CustomCheckbox from "../../atoms/customCheckbox/customCheckbox";
import { Grid, useTheme } from "@material-ui/core";
import { RoundedButton } from "@atoms";
import { AcceptLegalTerms } from "../../atoms/loginHelpers/loginHelpers";
import CustomCheckboxWithPopup from "components/atoms/customCheckbox/customCheckboxWithPopup";
import { useLocalStorage } from "@hooks";
import { useAuthStore, useUserInfoStore } from "@stores";
import { loginWithSocialMedia } from "helpers/serverRequests/customer";
import { useSnackbar } from "notistack";

const PasswordStep = (props) => {
    const router = useRouter();
    const theme = useTheme();
    const lang = langs[router.locale];
    const [serverError, setserverError] = useState("");
    const { saveInLocalStorage } = useLocalStorage();
    const setUserInfo = useUserInfoStore((state) => state.setuserInfo);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
    const { enqueueSnackbar } = useSnackbar();

    const handleSocialMediaSubmit = async (token) => {
        const res = await loginWithSocialMedia(token);
        if (res.status === 200) {
            saveInLocalStorage("token", res.data.token);
            saveInLocalStorage("userInfo", res.data.userInfo);
            setUserInfo(res.data.userInfo);
            cookies.set("token", res.data.token);
            props.signUpRedirect ? router.push("/") : "";
            props.handleSignUp ? props.handleSignUp(res.data.userInfo) : "";
        } else {
            setserverError(res.data.message);
            // alert("Error al querer ingresar");
            enqueueSnackbar(res && res.data ? res.data.message : "Ocurrió un error inesperado", { variant: "error" });
        }
    };

    return (
        <>
            <SocialNetworksButtons handleSubmit={props.handleSocialMediaSubmit} />
            <AcceptLegalTerms
                handleOpenTycModal={props.handleOpenTycModal}
                handleOpenPrivacyPolicyModal={props.handleOpenPrivacyPolicyModal}
            />
            <Divider />
            <Grid item xs={12}>
                <PasswordInput
                    label={lang.passwordInput}
                    name="password"
                    value={props.password}
                    onChange={props.handleChange}
                    labelWidth={200}
                    helperText="La contraseña debe tener al menos 8 caracteres, 1 minúscula, 1 mayúscula y 1 número"
                />
            </Grid>
            <Grid item xs={12}>
                <CustomCheckboxWithPopup
                    name="authorize"
                    checked={props.authorize}
                    onChange={props.handleCheckboxesChange}
                    label={lang.authorizeCheckbox.label}
                    boldText={lang.authorizeCheckbox.boldText}
                    handleOpenModal={props.handleOpenPrivacyPolicyModal}
                />
            </Grid>
            <Grid item xs={12}>
                <CustomCheckbox
                    name="sendInfo"
                    checked={props.sendInfo}
                    onChange={props.handleCheckboxesChange}
                    label={lang.infoCheckbox.label}
                    boldText={lang.infoCheckbox.boldText}
                    redirectTo={lang.infoCheckbox.redirectTo}
                />
            </Grid>
            <Grid item xs={12} style={{ marginTop: theme.spacing(2) }}>
                <RoundedButton
                    disabled={!props.authorize || !isPassword(props.password)}
                    isLoading={props.isLoading}
                    label={lang.buttonText}
                    onClick={props.handleSubmit}
                    style={{ width: "100%" }}
                />
            </Grid>
        </>
    );
};

PasswordStep.propTypes = {
    password: PropTypes.string.isRequired,
    authorize: PropTypes.bool.isRequired,
    sendInfo: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleCheckboxesChange: PropTypes.func.isRequired,
};

export default PasswordStep;
