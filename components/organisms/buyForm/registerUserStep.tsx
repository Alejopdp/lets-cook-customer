// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useBuyFlow } from "../../../stores/buyFlow";
import { IPaymentMethod, IUserInfoFields } from "@stores";
import { useTheme } from "@material-ui/core";

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
            addressName: userInfo.shippingAddress?.addressName,
            addressDetails: userInfo.shippingAddress?.addressDetails,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            phone1: userInfo.phone1,
            restrictions: "",
            latitude: userInfo.shippingAddress?.latitude,
            longitude: userInfo.shippingAddress?.longitude,
        });

        if (Array.isArray(userInfo.paymentMethods)) {
            const defaultPaymentMethod: IPaymentMethod | undefined = userInfo.paymentMethods.find((method) => method.isDefault);
            setPaymentMethod({
                id: defaultPaymentMethod?.id || "",
                stripeId: "",
                type: defaultPaymentMethod ? "card" : "",
            });
        }
        setShowRegister(false);
        gotToNextView();
    };

    const handleSignUp = (userInfo: IUserInfoFields) => {
        setDeliveryInfo({
            addressName: userInfo.shippingAddress?.addressName,
            addressDetails: userInfo.shippingAddress?.addressDetails,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            phone1: userInfo.phone1,
            restrictions: "",
            latitude: userInfo.shippingAddress?.latitude,
            longitude: userInfo.shippingAddress?.longitude,
        });

        if (Array.isArray(userInfo.paymentMethods)) {
            const defaultPaymentMethod: IPaymentMethod | undefined = userInfo.paymentMethods.find((method) => method.isDefault);
            setPaymentMethod({
                id: defaultPaymentMethod?.id || "",
                stripeId: "",
                type: defaultPaymentMethod ? "card" : "",
            });
        }
        setShowRegister(false);
        gotToNextView();
    };

    return (
        <div style={{ paddingTop: theme.spacing(6) }}>
            {actualView === View.SIGN_IN ? (
                <LoginBox
                    handleLogin={handleLogin}
                    redirect={false}
                    handleSignUpClick={() => setactualView(View.SIGN_UP)}
                    dontRedirectForgotPassword={true}
                    handleForgotPasswordClick={() => setactualView(View.FORGOT_PASSWORD)}
                />
            ) : actualView === View.SIGN_UP ? (
                <SignUpForm handleSignUp={handleSignUp} handleRedirect={() => setactualView(View.SIGN_IN)} redirect={false} />
            ) : (
                <RecoverPasswordForm handlePasswordRecoveredSuccesfully={() => setactualView(View.SIGN_IN)} />
            )}
        </div>
    );
};

export default RegisterUserStep;
