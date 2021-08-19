// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useBuyFlow } from "../../../stores/buyFlow";
import { IPaymentMethod, IUserInfoFields } from "@stores";
import { useTheme } from "@material-ui/core";
import * as ga from '../../../helpers/ga'

// Internal components
import SignUpForm from "../signUpForm/signUpForm";
import LoginBox from "../loginBox/loginBox";
import RecoverPassword from "../recoverPassword/recoverPassword";
import RecoverPasswordForm from "../recoverPassword/recoverPasswordForm";

enum View {
    SIGN_IN = "SIGN_IN",
    SIGN_UP = "SIGN_UP",
    FORGOT_PASSWORD = "FORGOT_PASSWORD",
}

export const RegisterUserStep = () => {
    const theme = useTheme();
    const [actualView, setactualView] = useState<View>(View.SIGN_UP);
    const { setDeliveryInfo, setPaymentMethod, setShowRegister } = useBuyFlow(({ setDeliveryInfo, setPaymentMethod, setShowRegister }) => ({
        setDeliveryInfo,
        setPaymentMethod,
        setShowRegister,
    }));

    const gotToNextView = useBuyFlow(({ forward }) => forward);

    const handleLogin = (userInfo: IUserInfoFields) => {
        setDeliveryInfo({
            addressName: userInfo.shippingAddress ?.addressName,
            addressDetails: userInfo.shippingAddress ?.addressDetails,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            phone1: userInfo.phone1,
            restrictions: "",
            latitude: userInfo.shippingAddress ?.latitude,
            longitude: userInfo.shippingAddress ?.longitude,
        });

        if (Array.isArray(userInfo.paymentMethods)) {
            const defaultPaymentMethod: IPaymentMethod | undefined = userInfo.paymentMethods.find((method) => method.isDefault);
            setPaymentMethod({
                id: defaultPaymentMethod ?.id || "",
                stripeId: "",
                type: defaultPaymentMethod ? "card" : "",
            });
        }
        setShowRegister(false);
        gotToNextView();
    };

    const handleSignUp = (userInfo: IUserInfoFields) => {
        setDeliveryInfo({
            addressName: userInfo.shippingAddress ?.addressName,
            addressDetails: userInfo.shippingAddress ?.addressDetails,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            phone1: userInfo.phone1,
            restrictions: "",
            latitude: userInfo.shippingAddress ?.latitude,
            longitude: userInfo.shippingAddress ?.longitude,
        });

        if (Array.isArray(userInfo.paymentMethods)) {
            const defaultPaymentMethod: IPaymentMethod | undefined = userInfo.paymentMethods.find((method) => method.isDefault);
            setPaymentMethod({
                id: defaultPaymentMethod ?.id || "",
                stripeId: "",
                type: defaultPaymentMethod ? "card" : "",
            });
        }
        setShowRegister(false);
        gotToNextView();
    };

    const goToSignIn = () => {
        ga.event({
            action: 'clic en ingresa aqui',
            params: {
                event_category: `registrarse - buyflow`,
                event_label: 'ya tienes cuenta',
            }
        })
        setactualView(View.SIGN_IN)
    }

    const goToForgotPassword = () => {
        ga.event({
            action: 'clic en olvide mi contrasena',
            params: {
                event_category: `ingresar - buyflow`,
                event_label: 'olvide mi contrasena',
            }
        })
        setactualView(View.FORGOT_PASSWORD)
    }

    const goToSignUpFromLogin = () => {
        ga.event({
            action: 'clic en registrate aqui',
            params: {
                event_category: `ingresar - buyflow`,
                event_label: 'aun no tienes cuenta',
            }
        })
        setactualView(View.SIGN_UP)
    }

    const goToSignUpFromForgotPassword = () => {
        ga.event({
            action: 'clic en registrate aqui',
            params: {
                event_category: `recupero de contrasena - buyflow`,
                event_label: 'aun no tienes cuenta',
            }
        })
        setactualView(View.SIGN_UP)
    }

    return (
        <div style={{ paddingTop: theme.spacing(6) }}>
            {actualView === View.SIGN_IN ? (
                <LoginBox
                    handleLogin={handleLogin}
                    redirect={false}
                    handleSignUpClick={goToSignUpFromLogin}
                    dontRedirectForgotPassword={true}
                    handleForgotPasswordClick={goToForgotPassword}
                    source='buyflow'
                />
            ) : actualView === View.SIGN_UP ? (
                <SignUpForm handleSignUp={handleSignUp} handleRedirect={goToSignIn} redirect={false} source='buyflow' />
            ) : (
                        <RecoverPasswordForm handleRedirect={goToSignUpFromForgotPassword} handlePasswordRecoveredSuccesfully={() => setactualView(View.SIGN_IN)} source='buyflow' />
                    )}
        </div>
    );
};

export default RegisterUserStep;
