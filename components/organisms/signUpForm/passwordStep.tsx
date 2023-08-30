// Utils & Config
import React from "react";
import { isPassword } from "../../../helpers/regex/regex";
import { useRouter } from "next/router";
import * as langs from "../../../lang";
import cookies from "js-cookie";

// Internal components
import { PasswordInput } from "../../atoms/inputs/inputs";
import SocialNetworksButtons from "../../atoms/socialNetworksButtons/socialNetworksButtons";
import Divider from "../../atoms/divider/divider";
import CustomCheckbox from "../../atoms/customCheckbox/customCheckbox";
import { Grid, useTheme } from "@material-ui/core";
import { RoundedButton } from "@atoms";
import { AcceptLegalTerms } from "../../atoms/loginHelpers/loginHelpers";
import CustomCheckboxWithPopup from "components/atoms/customCheckbox/customCheckboxWithPopup";
import { LOCAL_STORAGE_KEYS, useLocalStorage } from "@hooks";
import { useUserInfoStore } from "@stores";
import { loginWithSocialMedia } from "helpers/serverRequests/customer";
import { useSnackbar } from "notistack";
import { locale } from "types/locale";

type PasswordStepProps = {
    password: string;
    authorize: boolean;
    sendInfo: boolean;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
    handleCheckboxesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleOpenTycModal: () => void;
    handleOpenPrivacyPolicyModal: () => void;
    signUpRedirect?: boolean;
    handleSignUp?: (userInfo) => void;
    isLoading?: boolean;
    source?: string;
};

const PasswordStep = (props: PasswordStepProps) => {
    const router = useRouter();
    const theme = useTheme();
    const lang = langs.passwordStep[router.locale as locale];
    const { saveInLocalStorage } = useLocalStorage();
    const setUserInfo = useUserInfoStore((state) => state.setuserInfo);
    const { enqueueSnackbar } = useSnackbar();

    const handleSocialMediaSubmit = async (token) => {
        const res = await loginWithSocialMedia(token, "", props.source === "buyFlow");
        if (res.status === 200) {
            saveInLocalStorage(LOCAL_STORAGE_KEYS.token, res.data.token);
            saveInLocalStorage(LOCAL_STORAGE_KEYS.userInfo, res.data.userInfo);
            setUserInfo(res.data.userInfo);
            cookies.set(LOCAL_STORAGE_KEYS.token, res.data.token);
            props.signUpRedirect ? router.push("/") : "";
            props.handleSignUp ? props.handleSignUp(res.data.userInfo) : "";
        } else {
            enqueueSnackbar(res && res.data ? res.data.message : lang.snackbars.error.unexpectedError, { variant: "error" });
        }
    };

    return (
        <>
            <SocialNetworksButtons handleSubmit={handleSocialMediaSubmit} />
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
                    helperText={lang.passwordHelperText}
                    hasError={false}
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
                    color={"default"}
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
                    color={"default"}
                    className={""}
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

export default PasswordStep;
