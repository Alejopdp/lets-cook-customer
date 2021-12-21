import React, { useState, useMemo, useEffect } from "react";
import { useSnackbar } from "notistack";
import {
    addNewPaymentMethod,
    changeDefaultPaymentMethod,
    changePasswordWithoutCode,
    updateBillingData,
    updatePersonalData,
    updateShippingAddress,
} from "../../../helpers/serverRequests/customer";
import { useUserInfoStore } from "../../../stores/auth";
import { LOCAL_STORAGE_KEYS, useLocalStorage } from "../../../hooks";
import { translateShippíngHour } from "../../../helpers/utils/i18n";
// External Components
import Grid from "@material-ui/core/Grid";
import { useTheme, useMediaQuery } from "@material-ui/core";

// Internal Components
import BoxWithTitleAndTextButton from "../../molecules/specificBox/boxWithTitleAndTextButton";
import BoxWithTitle from "../../molecules/specificBox/boxWithTitle";
import DataDisplay from "../../molecules/dataDisplay/dataDisplay";
import DataDisplayEditable from "../../molecules/dataDisplay/dataDisplayEditable";
import EmailModal from "../../molecules/userInfo/emailModal";
import PasswordModal from "../../molecules/userInfo/passwordModal";
import PersonalDataModal from "../../molecules/userInfo/personalDataModal";
import BillingAddressModal from "../../molecules/userInfo/billingAddressModal";
import DeliveryAddressModal from "../../molecules/userInfo/deliveryAddressModal";
import PaymentMethodModal from "../../molecules/userInfo/paymentMethod";
import DataPaperSkeleton from "./dataPaperSkeleton";
import WithSkeleton from "../../molecules/withSkeleton/withSkeleton";

const UserInfoDetail = (props) => {
    const lang = props.lang;
    const theme = useTheme();
    const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
    const { setuserInfo, userInfo } = useUserInfoStore(({ setuserInfo, userInfo }) => ({ setuserInfo, userInfo }));
    const { saveInLocalStorage } = useLocalStorage();
    const { enqueueSnackbar } = useSnackbar();
    const [customerInfo, setcustomerInfo] = useState({
        id: "",
        email: "",
        personalData: {},
        shippingAddress: {},
        billingData: {},
        paymentMethods: [],
    });
    const [openEmailModal, setEmailModal] = useState(false);
    const [isChangePasswordSubmitting, setIsChangePasswordSubmitting] = useState(false);
    const [openPasswordModal, setPasswordModal] = useState(false);
    const [openPersonalDataModal, setPersonalDataModal] = useState(false);
    const [openBillingAddressModal, setBillingAddressModal] = useState(false);
    const [openDeliveryAddressModal, setDeliveryAddressModal] = useState(false);
    const [openPaymentMethod, setPaymentMethod] = useState(false);

    useEffect(() => {
        setcustomerInfo({
            id: props.customer.id || "",
            email: props.customer.email || "",
            personalData: props.customer.personalData || {},
            shippingAddress: props.customer.shippingAddress || {},
            billingData: props.customer.billingData || {},
            paymentMethods: props.customer.paymentMethods || [],
        });
    }, [props.customer]);

    const defaultPaymentMethod = useMemo(() => {
        return customerInfo.paymentMethods.find((method) => method.isDefault) || {};
    }, [customerInfo.paymentMethods]);

    //EMAIL
    const handleClickOpenEmailModal = () => {
        setEmailModal(true);
    };

    const handleCloseEmailModal = () => {
        setEmailModal(false);
    };

    const handleClickChangeEmail = (newEmail) => {
        setEmailModal(false);
    };

    // PASSWORD
    const handleClickOpenPasswordModal = () => {
        setPasswordModal(true);
    };

    const handleClickClosePasswordModal = () => {
        setPasswordModal(false);
    };

    const handleClickChangePassword = async (newPassword) => {
        setIsChangePasswordSubmitting(true);
        const res = await changePasswordWithoutCode(props.customer.email, newPassword);

        if (!!res && res.status === 200) {
            enqueueSnackbar("Contraseña cambiada con exito", { variant: "success" });
            setPasswordModal(false);
        } else {
            enqueueSnackbar(res && res.data ? res.data.message : "Ocurrió un error inesperado, intenta nuevamente", { variant: "error" });
        }
        setIsChangePasswordSubmitting(false);
    };

    // PERSONAL DATA
    const handleClickOpenPersonalDataModal = () => {
        setPersonalDataModal(true);
    };

    const handleClickClosePersonalDataModal = () => {
        setPersonalDataModal(false);
    };

    const handleClickChangePersonalData = (data) => {
        setPersonalDataModal(false);
    };

    // BILLING ADDRESS
    const handleClickOpenBillingAddressModal = () => {
        setBillingAddressModal(true);
    };

    const handleClickCloseBillingAddressModal = () => {
        setBillingAddressModal(false);
    };

    // DELIVERY ADDRESS
    const handleClickOpenDeliveryAddressModal = () => {
        setDeliveryAddressModal(true);
    };

    const handleClickCloseDeliveryAddressModal = () => {
        setDeliveryAddressModal(false);
    };

    // PAYMENT METHOD
    const handleClickOpenPaymentMethodModal = () => {
        setPaymentMethod(true);
    };

    const handleClickClosePaymentMethodModal = () => {
        setPaymentMethod(false);
    };

    const handleAddPaymentMethod = async (stripePaymentMethodId) => {
        const res = await addNewPaymentMethod(customerInfo.id, stripePaymentMethodId);

        if (res && res.status === 200) {
            const newPaymentMethods = [
                ...customerInfo.paymentMethods.map((paymentMethod) => ({
                    ...paymentMethod,
                    isDefault: false,
                })),
                res.data,
            ];
            const newUserInfo = { ...userInfo, paymentMethods: newPaymentMethods };
            setuserInfo(newUserInfo);
            saveInLocalStorage(LOCAL_STORAGE_KEYS.userInfo, newUserInfo);
            setcustomerInfo({ ...customerInfo, paymentMethods: newPaymentMethods });

            enqueueSnackbar(lang.addPaymentMethod.success, { variant: "success" });
            handleClickClosePaymentMethodModal();
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const handleUpdateDefaultPaymentMethod = async (paymentMethodId) => {
        const res = await changeDefaultPaymentMethod(paymentMethodId, customerInfo.id);

        if (res && res.status === 200) {
            const newPaymentMethods = customerInfo.paymentMethods.map((paymentMethod) => ({
                ...paymentMethod,
                isDefault: paymentMethod.id === paymentMethodId ? true : false,
            }));
            const newUserInfo = { ...userInfo, paymentMethods: newPaymentMethods };
            setuserInfo(newUserInfo);
            saveInLocalStorage(LOCAL_STORAGE_KEYS.userInfo, newUserInfo);
            setcustomerInfo({ ...customerInfo, paymentMethods: newPaymentMethods });
            handleClickClosePaymentMethodModal();
            enqueueSnackbar(lang.updateDefaultPaymentMethod.success, { variant: "success" });
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const handleUpdatePersonalDataSubmit = async (newData) => {
        const res = await updatePersonalData(customerInfo.id, newData);

        if (res.status === 200) {
            setcustomerInfo({
                ...customerInfo,
                personalData: {
                    ...newData,
                    fullName: !!!newData.name && !!!newData.lastName ? "" : `${newData.name || ""} ${newData.lastName || ""}`,
                },
            });
            handleClickClosePersonalDataModal();
            enqueueSnackbar(lang.updatePersonalDataSubmit.success, { variant: "success" });
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const handleShippingAddressSubmit = async (newData) => {
        const res = await updateShippingAddress(customerInfo.id, newData);

        if (res.status === 200) {
            setcustomerInfo({
                ...customerInfo,
                shippingAddress: {
                    ...newData,
                },
            });
            const newUserInfo = {
                ...userInfo,
                shippingAddress: {
                    addressDetails: newData.details,
                    latitude: newData.latitude,
                    longitude: newData.longitude,
                    addressName: newData.name,
                    preferredShippingHour: newData.preferredShippingHour,
                },
            };
            setuserInfo(newUserInfo);
            saveInLocalStorage(LOCAL_STORAGE_KEYS.userInfo, newUserInfo);
            handleClickCloseDeliveryAddressModal();
            enqueueSnackbar(lang.shippingAddressSubmit.success, { variant: "success" });
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const handleBillingDataSubmit = async (newData) => {
        const res = await updateBillingData(customerInfo.id, newData);

        if (res.status === 200) {
            setcustomerInfo({
                ...customerInfo,
                billingData: {
                    ...newData,
                },
            });
            handleClickCloseBillingAddressModal();
            enqueueSnackbar(lang.billingDataSubmit.success, { variant: "success" });
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {props.isLoading ? (
                                <DataPaperSkeleton boxTitle={lang.personalData.title} buttonLabel={lang.personalData.updateBtnLabel} />
                            ) : (
                                <BoxWithTitleAndTextButton
                                    title={lang.personalData.title}
                                    btnText={lang.personalData.updateBtnLabel}
                                    handleClick={() => handleClickOpenPersonalDataModal()}
                                >
                                    <DataDisplay
                                        title={lang.personalData.fullName}
                                        text={customerInfo.personalData.fullName}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title={lang.personalData.phone1}
                                        text={customerInfo.personalData.phone1}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title={lang.personalData.phone2}
                                        text={customerInfo.personalData.phone2}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title={lang.personalData.birthDateValue}
                                        text={customerInfo.personalData.birthDateValue}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title={lang.personalData.preferredLanguage}
                                        text={customerInfo.personalData.preferredLanguage}
                                    />
                                </BoxWithTitleAndTextButton>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {props.isLoading ? (
                                <DataPaperSkeleton
                                    boxTitle={lang.shippingAddress.title}
                                    buttonLabel={lang.shippingAddress.updateBtnLabel}
                                />
                            ) : (
                                <BoxWithTitleAndTextButton
                                    title={lang.shippingAddress.title}
                                    btnText={lang.shippingAddress.updateBtnLabel}
                                    handleClick={() => handleClickOpenDeliveryAddressModal()}
                                >
                                    <DataDisplay
                                        title={lang.shippingAddress.name}
                                        text={customerInfo.shippingAddress.name}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title={lang.shippingAddress.details}
                                        text={customerInfo.shippingAddress.details}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title={lang.shippingAddress.preferredShippingHour}
                                        text={
                                            !!customerInfo.shippingAddress.preferredShippingHour
                                                ? translateShippíngHour(customerInfo.shippingAddress.preferredShippingHour)
                                                : ""
                                        }
                                        style={{ marginBottom: "8.3rem" }}
                                    />
                                </BoxWithTitleAndTextButton>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {props.isLoading ? (
                                <DataPaperSkeleton boxTitle={lang.billingData.title} buttonLabel={lang.billingData.updateBtnLabel} />
                            ) : (
                                <BoxWithTitleAndTextButton
                                    title={lang.billingData.title}
                                    btnText={lang.billingData.updateBtnLabel}
                                    handleClick={() => handleClickOpenBillingAddressModal()}
                                >
                                    <DataDisplay
                                        title={lang.billingData.addressName}
                                        text={customerInfo.billingData.addressName}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title={lang.billingData.details}
                                        text={customerInfo.billingData.details}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title={lang.billingData.customerName}
                                        text={customerInfo.billingData.customerName}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title={lang.billingData.identification}
                                        text={customerInfo.billingData.identification}
                                        style={{ marginBottom: "4.1rem" }}
                                    />
                                </BoxWithTitleAndTextButton>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {props.isLoading ? (
                                <DataPaperSkeleton boxTitle={lang.paymentMethod.title} buttonLabel={lang.paymentMethod.updateBtnLabel} />
                            ) : (
                                <BoxWithTitleAndTextButton
                                    title={lang.paymentMethod.title}
                                    btnText={lang.paymentMethod.updateBtnLabel}
                                    handleClick={() => handleClickOpenPaymentMethodModal()}
                                >
                                    <DataDisplay
                                        title={lang.paymentMethod.card}
                                        text={defaultPaymentMethod.card}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title={lang.paymentMethod.expirationDate}
                                        text={defaultPaymentMethod.expirationDate}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                </BoxWithTitleAndTextButton>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid item xs={12}>
                                {props.isLoading ? (
                                    <DataPaperSkeleton boxTitle={lang.customerInfo.title} buttonLabel={lang.customerInfo.updateBtnLabel} />
                                ) : (
                                    <BoxWithTitle title={lang.customerInfo.title}>
                                        <DataDisplayEditable
                                            title={lang.customerInfo.email}
                                            text={customerInfo.email}
                                            handleClick={() => handleClickOpenEmailModal()}
                                            style={{ marginBottom: theme.spacing(2) }}
                                        />
                                        <DataDisplayEditable
                                            title={lang.customerInfo.password}
                                            text="********"
                                            handleClick={() => handleClickOpenPasswordModal()}
                                            style={{ marginBottom: "2.2rem" }}
                                        />
                                    </BoxWithTitle>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <EmailModal
                open={openEmailModal}
                handleClose={handleCloseEmailModal}
                primaryButtonText={lang.emailModal.primaryButtonText}
                secondaryButtonText={lang.emailModal.secondaryButtonText}
                handlePrimaryButtonClick={handleClickChangeEmail}
                lang={lang.emailModal}
            />
            <PasswordModal
                open={openPasswordModal}
                handleClose={handleClickClosePasswordModal}
                primaryButtonText={lang.passwordModal.primaryButtonText}
                secondaryButtonText={lang.passwordModal.secondaryButtonText}
                handlePrimaryButtonClick={handleClickChangePassword}
                lang={lang.passwordModal}
                isSubmitting={isChangePasswordSubmitting}
            />
            {openPersonalDataModal && (
                <PersonalDataModal
                    open={openPersonalDataModal}
                    handleClose={handleClickClosePersonalDataModal}
                    primaryButtonText={lang.personalDataModal.primaryButtonText}
                    secondaryButtonText={lang.personalDataModal.secondaryButtonText}
                    personalData={customerInfo.personalData}
                    handleSubmit={handleUpdatePersonalDataSubmit}
                    lang={lang.personalDataModal}
                />
            )}
            {openBillingAddressModal && (
                <BillingAddressModal
                    open={openBillingAddressModal}
                    handleClose={handleClickCloseBillingAddressModal}
                    primaryButtonText={lang.billingAddressModal.primaryButtonText}
                    secondaryButtonText={lang.billingAddressModal.secondaryButtonText}
                    billingData={customerInfo.billingData}
                    handleSubmit={handleBillingDataSubmit}
                    lang={lang.billingAddressModal}
                />
            )}
            {openDeliveryAddressModal && (
                <DeliveryAddressModal
                    open={openDeliveryAddressModal}
                    handleClose={handleClickCloseDeliveryAddressModal}
                    primaryButtonText={lang.deliveryAddressModal.primaryButtonText}
                    secondaryButtonText={lang.deliveryAddressModal.secondaryButtonText}
                    shippingAddress={customerInfo.shippingAddress}
                    handleSubmit={handleShippingAddressSubmit}
                    lang={lang.deliveryAddressModal}
                />
            )}
            {openPaymentMethod && (
                <PaymentMethodModal
                    open={openPaymentMethod}
                    handleClose={handleClickClosePaymentMethodModal}
                    handleOpen={handleClickOpenPaymentMethodModal}
                    // handlePrimaryButtonClick={handleClickChangePaymentMethod}
                    handleAddPaymentMethod={handleAddPaymentMethod}
                    handleUpdateDefaultPaymentMethod={handleUpdateDefaultPaymentMethod}
                    primaryButtonText={lang.paymentMethodModal.primaryButtonText}
                    secondaryButtonText={lang.paymentMethodModal.secondaryButtonText}
                    initialData={customerInfo.paymentMethods}
                    customerId={customerInfo.id}
                    lang={lang.paymentMethodModal}
                />
            )}
        </>
    );
};

export default UserInfoDetail;
