// Utils & Config
import React, { useState } from "react";
import { useBuyFlow } from "../../../stores/buyFlow";
import { IPaymentMethod, IUserInfoFields } from "@stores";
import { useTheme } from "@material-ui/core";
import TagManager from "react-gtm-module";

// Internal components
import SignUpForm from "../signUpForm/signUpForm";
import LoginBox from "../loginBox/loginBox";
import RecoverPasswordForm from "../recoverPassword/recoverPasswordForm";
import { subscribeToMailingListGroup, updateSubscriber } from "helpers/serverRequests/mailingList";
import { useRouter } from "next/router";
import { MAILERLITE_MAILING_LIST_GROUP, STRIPE_CARD_PAYMENT_METHOD } from "constants/constants";
import useAnalytics from "hooks/useAnalytics";

enum View {
    SIGN_IN = "SIGN_IN",
    SIGN_UP = "SIGN_UP",
    FORGOT_PASSWORD = "FORGOT_PASSWORD",
}

export const RegisterUserStep = () => {
    const { trackBuyFlowForgotPassword, trackBuyFlowSignUp, trackBuyFlowSignUpForgotPassword, trackBuyflowLogin } = useAnalytics();
    const theme = useTheme();
    const router = useRouter();
    const [actualView, setactualView] = useState<View>(View.SIGN_UP);
    const { setDeliveryInfo, setPaymentMethod, setShowRegister, form } = useBuyFlow(
        ({ setDeliveryInfo, setPaymentMethod, setShowRegister, form }) => ({
            setDeliveryInfo,
            setPaymentMethod,
            setShowRegister,
            form,
        })
    );
    const gotToNextView = useBuyFlow(({ forward }) => forward);

    const handleLogin = (userInfo: IUserInfoFields) => {
        setDeliveryInfo({
            addressName: userInfo.shippingAddress?.addressName || userInfo.shippingAddress?.addressName,
            addressDetails: userInfo.shippingAddress?.addressDetails || userInfo.shippingAddress?.addressDetails,
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
                type: defaultPaymentMethod ? STRIPE_CARD_PAYMENT_METHOD : "",
            });
        }
        subscribeToMailingListGroup(MAILERLITE_MAILING_LIST_GROUP, userInfo.email, {
            planName: form.planName,
            planVariantLabel: form.planDescription,
        });
        setShowRegister(false);
        gotToNextView();
        TagManager.dataLayer({
            dataLayer: {
                event: "login",
                method: "Google/Mail",
                id: userInfo.id,
            },
        });
    };

    const handleSignUp = (userInfo: IUserInfoFields, accpetsMarketing: boolean) => {
        setDeliveryInfo({
            addressName: userInfo.shippingAddress?.addressName || userInfo.shippingAddress?.addressName,
            addressDetails: userInfo.shippingAddress?.addressDetails || userInfo.shippingAddress?.addressDetails,
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
                type: defaultPaymentMethod ? STRIPE_CARD_PAYMENT_METHOD : "",
            });
        }
        subscribeToMailingListGroup(MAILERLITE_MAILING_LIST_GROUP, userInfo.email, {
            planName: form.planName,
            planVariantLabel: form.planDescription,
        }).then((res) =>
            updateSubscriber(userInfo.email, {
                shopify_accepts_marketing: accpetsMarketing ? 1 : 0,
                shopify_id: userInfo.id,
                language: router.locale === "es" ? "esp" : router.locale === "en" ? "ing" : "cat",
                shopify_last_order_name: `${form.planName} / ${form.variant.label}`,
            })
        );

        TagManager.dataLayer({
            dataLayer: {
                event: "login",
                method: "Google/Mail",
                id: userInfo.id,
            },
        });

        setShowRegister(false);
        gotToNextView();
    };

    const goToSignIn = () => {
        trackBuyflowLogin();
        setactualView(View.SIGN_IN);
    };

    const goToForgotPassword = () => {
        trackBuyFlowForgotPassword();
        setactualView(View.FORGOT_PASSWORD);
    };

    const goToSignUpFromLogin = () => {
        trackBuyFlowSignUp();
        setactualView(View.SIGN_UP);
    };

    const goToSignUpFromForgotPassword = () => {
        trackBuyFlowSignUpForgotPassword();
        setactualView(View.SIGN_UP);
    };

    return (
        <div style={{ paddingTop: theme.spacing(8) }}>
            {actualView === View.SIGN_IN ? (
                <LoginBox
                    handleLogin={handleLogin}
                    redirect={false}
                    handleSignUpClick={goToSignUpFromLogin}
                    dontRedirectForgotPassword={true}
                    handleForgotPasswordClick={goToForgotPassword}
                    source="buyflow"
                />
            ) : actualView === View.SIGN_UP ? (
                <SignUpForm handleSignUp={handleSignUp} handleRedirect={goToSignIn} redirect={false} source="buyflow" />
            ) : (
                <RecoverPasswordForm
                    handleRedirect={goToSignUpFromForgotPassword}
                    handlePasswordRecoveredSuccesfully={() => setactualView(View.SIGN_IN)}
                    source="buyflow"
                />
            )}
        </div>
    );
};

export default RegisterUserStep;
