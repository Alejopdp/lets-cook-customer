// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useBuyFlow } from "../../../stores/buyFlow";
import { IPaymentMethod, IUserInfoFields } from "@stores";

// Internal components
import SignUpForm from "../signUpForm/signUpForm";
import LoginBox from "../loginBox/loginBox";

export const RegisterUserStep = () => {
    const [haveAccount, setHaveAccount] = useState(false);
    const { setDeliveryInfo, setPaymentMethod } = useBuyFlow(({ setDeliveryInfo, setPaymentMethod }) => ({
        setDeliveryInfo,
        setPaymentMethod,
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
        gotToNextView();
    };

    const handleRedirect = () => {
        setHaveAccount(!haveAccount);
    };

    return (
        <>
            {haveAccount ? (
                <LoginBox handleLogin={handleLogin} redirect={false} handleRedirect={handleRedirect} />
            ) : (
                <SignUpForm handleSignUp={handleSignUp} handleRedirect={handleRedirect} redirect={false} />
            )}
        </>
    );
};

export default RegisterUserStep;
