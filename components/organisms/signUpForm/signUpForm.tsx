// Utils & config
import React, { useState } from "react";
import { useRouter } from "next/router";
const langs = require("../../../lang").signupForm;
import { useUserInfoStore, useAuthStore, IUserInfoFields } from "../../../stores/auth";
import cookies from "js-cookie";

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { Register } from "../../atoms/loginHelpers/loginHelpers";
import MailStep from "./mailStep";
import PasswordStep from "./passwordStep";
import { checkIfEmailExists, signUp } from "../../../helpers/serverRequests/customer";
import { useSnackbar } from "notistack";
import useLocalStorage, { LOCAL_STORAGE_KEYS } from "../../../hooks/useLocalStorage/localStorage";
import TermsAndConditionsModal from "../../molecules/legalModals/termsAndConditionsModal";
import PrivacyPolicyModal from "../../molecules/legalModals/privacyPolicyModal";
import { localeRoutes, Routes } from "lang/routes/routes";
import useAnalytics from "hooks/useAnalytics";

type SignUpFormProps = {
    handleCreateAccount: () => void;
    handleRedirect: () => void;
    handleSignUp: (userInfo: IUserInfoFields, accpetsMarketing?: boolean) => void;
    redirect: boolean;
    source: string;
};

const SignUpForm = (props: SignUpFormProps) => {
    const { trackSignUpEmailInput, trackSignUpPasswordInput, trackAlreadyHaveAccountClick } = useAnalytics();
    const [currentStep, setcurrentStep] = useState(0);
    const setUserInfo = useUserInfoStore((state) => state.setuserInfo);
    const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        authorize: false,
        sendInfo: true,
    });
    const [openTycModal, setOpenTycModal] = React.useState(false);
    const [openPrivacyPolicyModal, setOpenPrivacyPolicyModal] = React.useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const { saveInLocalStorage } = useLocalStorage();

    var currentInputs = <></>;

    const handleSubmit = async (number) => {
        const res = await checkIfEmailExists(formData.email);
        if (!!res && res.status === 200) {
            setEmailAlreadyExists(true);
            return;
        }
        trackSignUpEmailInput(props.source);
        setIsLoading(true);
        if (currentStep + number < 0 || currentStep + number > 1) alert("error");
        setcurrentStep(currentStep + number);
        setIsLoading(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckboxesChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: !formData[e.target.name],
        });
    };

    const handleCreateAccount = async () => {
        trackSignUpPasswordInput(props.source);
        const res = await signUp(formData.email, formData.password, props.source === "buyFlow");

        if (res.status === 200) {
            saveInLocalStorage(LOCAL_STORAGE_KEYS.userInfo, res.data.userInfo);
            setUserInfo(res.data.userInfo);
            saveInLocalStorage(LOCAL_STORAGE_KEYS.token, res.data.token);
            cookies.set(LOCAL_STORAGE_KEYS.token, res.data.token);
            setIsAuthenticated(true);
            props.handleSignUp ? props.handleSignUp(res.data.userInfo, formData.sendInfo) : "";
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const handleRedirect = () => {
        trackAlreadyHaveAccountClick(props.source);
        router.push(localeRoutes[router.locale][Routes["iniciar-sesion"]]);
    };

    const router = useRouter();
    const lang = langs[router.locale];

    // TyC Modal Functions

    const handleOpenTycModal = () => {
        setOpenTycModal(true);
    };

    const handleCloseTycModal = () => {
        setOpenTycModal(false);
    };

    // Privacy Policy Modal Functions

    const handleOpenPrivacyPolicyModal = () => {
        setOpenPrivacyPolicyModal(true);
    };

    const handleClosePrivacyPolicyModal = () => {
        setOpenPrivacyPolicyModal(false);
    };

    switch (true) {
        case currentStep === 0:
            currentInputs = (
                <MailStep
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    email={formData.email}
                    signUpRedirect={props.redirect}
                    handleSignUp={props.handleSignUp}
                    handleOpenTycModal={handleOpenTycModal}
                    handleOpenPrivacyPolicyModal={handleOpenPrivacyPolicyModal}
                    source={props.source}
                    emailAlreadyExists={emailAlreadyExists}
                />
            );
            break;

        case currentStep === 1:
            currentInputs = (
                <PasswordStep
                    password={formData.password}
                    authorize={formData.authorize}
                    sendInfo={formData.sendInfo}
                    handleChange={handleChange}
                    handleCheckboxesChange={handleCheckboxesChange}
                    handleSubmit={props.handleCreateAccount || handleCreateAccount}
                    handleOpenTycModal={handleOpenTycModal}
                    handleOpenPrivacyPolicyModal={handleOpenPrivacyPolicyModal}
                    source={props.source}
                    isLoading={isLoading}
                    handleSignUp={props.handleSignUp}
                />
            );
            break;

        default:
            currentInputs = (
                <MailStep
                    signUpRedirect={props.redirect}
                    handleSignUp={props.handleSignUp}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    email={formData.email}
                    handleOpenTycModal={handleOpenTycModal}
                    handleOpenPrivacyPolicyModal={handleOpenPrivacyPolicyModal}
                    source={props.source}
                    emailAlreadyExists={emailAlreadyExists}
                />
            );
    }

    return (
        <>
            <FormPaper title={lang.title}>
                {currentInputs}
                <Register
                    text={lang.register.text}
                    boldText={lang.register.boldText}
                    handleRedirect={props.handleRedirect || handleRedirect}
                    isSubmitting={false}
                />
            </FormPaper>
            <TermsAndConditionsModal open={openTycModal} handleClose={handleCloseTycModal} />
            <PrivacyPolicyModal open={openPrivacyPolicyModal} handleClose={handleClosePrivacyPolicyModal} />
        </>
    );
};

export default SignUpForm;
