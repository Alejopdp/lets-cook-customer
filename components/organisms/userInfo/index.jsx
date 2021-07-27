import React, { useState, useMemo, useEffect } from "react";
import { useSnackbar } from "notistack";

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
import { updateBillingData, updatePersonalData, updateShippingAddress } from "../../../helpers/serverRequests/customer";
import { useLang } from "../../../hooks";

const UserInfoDetail = (props) => {
    const theme = useTheme();
    const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
    const [lang] = useLang("userInfoDetail");

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
        alert(`newEmail ${newEmail}`);
        setEmailModal(false);
    };

    // PASSWORD
    const handleClickOpenPasswordModal = () => {
        setPasswordModal(true);
    };

    const handleClickClosePasswordModal = () => {
        setPasswordModal(false);
    };

    const handleClickChangePassword = (newPassword) => {
        alert(`newPassword ${newPassword}`);
        setPasswordModal(false);
    };

    // PERSONAL DATA
    const handleClickOpenPersonalDataModal = () => {
        setPersonalDataModal(true);
    };

    const handleClickClosePersonalDataModal = () => {
        setPersonalDataModal(false);
    };

    const handleClickChangePersonalData = (data) => {
        alert(`newPassword ${JSON.stringify(data)}`);
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
            enqueueSnackbar(lang.successUpdate, { variant: "success" });
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
            handleClickCloseDeliveryAddressModal();
            enqueueSnackbar(lang.successUpdate, { variant: "success" });
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
            enqueueSnackbar(lang.successUpdate, { variant: "success" });
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
                                <DataPaperSkeleton boxTitle={lang.personalData} buttonLabel={lang.buttonUpdate} />
                            ) : (
                                <BoxWithTitleAndTextButton
                                    title={lang.personalData}
                                    btnText={lang.buttonUpdate}
                                    handleClick={() => handleClickOpenPersonalDataModal()}
                                >
                                    <DataDisplay
                                        title={lang.completeName}
                                        text={customerInfo.personalData.fullName}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title={lang.phone + " (1)"}
                                        text={customerInfo.personalData.phone1}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title={lang.phone + " (2)"}
                                        text={customerInfo.personalData.phone1}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title={lang.birthday}
                                        text={customerInfo.personalData.birthDateValue}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay title={lang.preferenceLang} text={customerInfo.personalData.preferredLanguage} />
                                </BoxWithTitleAndTextButton>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {props.isLoading ? (
                                <DataPaperSkeleton boxTitle={lang.deliveryAddress} buttonLabel={lang.buttonAddressEdit} />
                            ) : (
                                <BoxWithTitleAndTextButton
                                    title={lang.deliveryAddress}
                                    btnText={lang.buttonAddressEdit}
                                    handleClick={() => handleClickOpenDeliveryAddressModal()}
                                >
                                    <DataDisplay
                                        title={lang.deliveryAddress}
                                        text={customerInfo.shippingAddress.name}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title={lang.addressTitle}
                                        text={customerInfo.shippingAddress.details}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title={lang.timeForDelivery}
                                        text={customerInfo.shippingAddress.preferredShippingHour}
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
                                <DataPaperSkeleton boxTitle={lang.billingData} buttonLabel={lang.titleBillingSection} />
                            ) : (
                                <BoxWithTitleAndTextButton
                                    title={lang.billingData}
                                    btnText={lang.titleBillingSection}
                                    handleClick={() => handleClickOpenBillingAddressModal()}
                                >
                                    <DataDisplay
                                        title={lang.deliveryAddress}
                                        text={customerInfo.billingData.addressName}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title={lang.addressTitle}
                                        text={customerInfo.billingData.details}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title={lang.completeName}
                                        text={customerInfo.billingData.customerName}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title={lang.dni}
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
                                <DataPaperSkeleton boxTitle={lang.paymentMethod} buttonLabel={lang.buttonEditPaymentMethod} />
                            ) : (
                                <BoxWithTitleAndTextButton
                                    title={lang.paymentMethod}
                                    btnText={lang.buttonEditPaymentMethod}
                                    handleClick={() => handleClickOpenPaymentMethodModal()}
                                >
                                    <DataDisplay
                                        title={lang.card}
                                        text={defaultPaymentMethod.card}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title={lang.expriration}
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
                                    <DataPaperSkeleton boxTitle={lang.accountData} buttonLabel={lang.buttonAccountUpdate} />
                                ) : (
                                    <BoxWithTitle title={lang.accountData}>
                                        <DataDisplayEditable
                                            title={lang.email}
                                            text="alejo@novolabs.xyz"
                                            handleClick={() => handleClickOpenEmailModal()}
                                            style={{ marginBottom: theme.spacing(2) }}
                                        />
                                        <DataDisplayEditable
                                            title={lang.password}
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
                primaryButtonText={lang.editEmail}
                secondaryButtonText={lang.cancel}
                handlePrimaryButtonClick={handleClickChangeEmail}
            />
            <PasswordModal
                open={openPasswordModal}
                handleClose={handleClickClosePasswordModal}
                primaryButtonText={lang.editPassword}
                secondaryButtonText={lang.cancel}
                handlePrimaryButtonClick={handleClickChangePassword}
            />
            {openPersonalDataModal && (
                <PersonalDataModal
                    open={openPersonalDataModal}
                    handleClose={handleClickClosePersonalDataModal}
                    primaryButtonText={lang.buttonUpdate}
                    secondaryButtonText={lang.cancel}
                    personalData={customerInfo.personalData}
                    handleSubmit={handleUpdatePersonalDataSubmit}
                />
            )}
            {openBillingAddressModal && (
                <BillingAddressModal
                    open={openBillingAddressModal}
                    handleClose={handleClickCloseBillingAddressModal}
                    primaryButtonText={editBillingAddress}
                    secondaryButtonText={lang.cancel}
                    billingData={customerInfo.billingData}
                    handleSubmit={handleBillingDataSubmit}
                />
            )}
            {openDeliveryAddressModal && (
                <DeliveryAddressModal
                    open={openDeliveryAddressModal}
                    handleClose={handleClickCloseDeliveryAddressModal}
                    primaryButtonText={lang.buttonAddressEdit}
                    secondaryButtonText={lang.cancel}
                    shippingAddress={customerInfo.shippingAddress}
                    handleSubmit={handleShippingAddressSubmit}
                />
            )}
            <PaymentMethodModal
                open={openPaymentMethod}
                handleClose={handleClickClosePaymentMethodModal}
                // handlePrimaryButtonClick={handleClickChangePaymentMethod}
                primaryButtonText={lang.buttonEditPaymentMethod}
                secondaryButtonText={lang.cancel}
                // initialData={data.paymentMethod}
            />
        </>
    );
};

export default UserInfoDetail;
