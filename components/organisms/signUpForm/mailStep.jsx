// Utils & config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { isEmail } from "../../../helpers/regex/regex";
import { useRouter } from "next/router";
const langs = require("../../../lang").mailStep;
import useLocalStorage from "../../../hooks/useLocalStorage/localStorage";
import cookies from "js-cookie";
import { useTheme } from "@material-ui/core";

// External components
import CustomButton from "../../atoms/customButton/customButton";
import SocialNetworksButtons from "../../atoms/socialNetworksButtons/socialNetworksButtons";
import { AcceptLegalTerms } from "../../atoms/loginHelpers/loginHelpers";
import Divider from "../../atoms/divider/divider";
import { loginWithSocialMedia } from "../../../helpers/serverRequests/customer";
import { useAuthStore, useUserInfoStore } from "../../../stores/auth";
import { RoundedButton, TextInput } from "@atoms";
import { Grid } from "@material-ui/core";


const MailStep = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];
    const [serverError, setserverError] = useState("");
    const { saveInLocalStorage } = useLocalStorage();
    const setUserInfo = useUserInfoStore((state) => state.setuserInfo);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
    const theme = useTheme();

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
            alert("Error al querer ingresar");
        }
    };

    return (
        <>
            <SocialNetworksButtons handleSubmit={handleSocialMediaSubmit} source={props.source} />
            <AcceptLegalTerms handleOpenTycModal={props.handleOpenTycModal} handleOpenPrivacyPolicyModal={props.handleOpenPrivacyPolicyModal} />
            <Divider />
            <Grid item xs={12}>
                <TextInput
                    label={lang.emailInput}
                    name="email"
                    value={props.email}
                    onChange={props.handleChange}
                />
            </Grid>
            <Grid item xs={12}>
                <RoundedButton disabled={!isEmail(props.email)} label={lang.buttonText} onClick={() => props.handleSubmit(1)} style={{ width: '100%' }} />
            </Grid>
        </>
    );
};

MailStep.propTypes = {
    email: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    signUpRedirect: PropTypes.bool,
    handleSignUp: PropTypes.func,
};

export default MailStep;
