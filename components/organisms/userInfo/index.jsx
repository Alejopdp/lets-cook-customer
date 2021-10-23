import React, { useState, useMemo, useEffect } from "react";
import { useSnackbar } from "notistack";
import {
    addNewPaymentMethod,
    changeDefaultPaymentMethod,
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

    const handleClickChangePassword = (newPassword) => {
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

            enqueueSnackbar("El método de pago se ha agregado correctamente", { variant: "success" });
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
            enqueueSnackbar("El método de pago se modificado correctamente", { variant: "success" });
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
            enqueueSnackbar("Datos modificados correctamente", { variant: "success" });
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
            enqueueSnackbar("Datos modificados correctamente", { variant: "success" });
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
            enqueueSnackbar("Datos modificados correctamente", { variant: "success" });
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
                                <DataPaperSkeleton boxTitle="Datos Personales" buttonLabel="MODIFICAR DATOS PERSONALES" />
                            ) : (
                                <BoxWithTitleAndTextButton
                                    title="Datos personales"
                                    btnText="MODIFICAR DATOS PERSONALES"
                                    handleClick={() => handleClickOpenPersonalDataModal()}
                                >
                                    <DataDisplay
                                        title="Nombre completo"
                                        text={customerInfo.personalData.fullName}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title="Telefono (1)"
                                        text={customerInfo.personalData.phone1}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title="Telefono (2)"
                                        text={customerInfo.personalData.phone1}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title={"Fecha de Nacimiento"}
                                        text={customerInfo.personalData.birthDateValue}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay title="Idioma de preferencia" text={customerInfo.personalData.preferredLanguage} />
                                </BoxWithTitleAndTextButton>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {props.isLoading ? (
                                <DataPaperSkeleton boxTitle="Direccion de entrega" buttonLabel="MODIFICAR DIRECCION DE ENTREGA" />
                            ) : (
                                <BoxWithTitleAndTextButton
                                    title="Direccion de entrega"
                                    btnText="MODIFICAR DIRECCION DE ENTREGA"
                                    handleClick={() => handleClickOpenDeliveryAddressModal()}
                                >
                                    <DataDisplay
                                        title="Direccion de entrega"
                                        text={customerInfo.shippingAddress.name}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title="Piso / puerta / aclaraciones"
                                        text={customerInfo.shippingAddress.details}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title="Horario de preferencia de entrega"
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
                                <DataPaperSkeleton boxTitle="Datos de facturación" buttonLabel="MODIFICAR DATOS DE FACTURACIÓN" />
                            ) : (
                                <BoxWithTitleAndTextButton
                                    title="Datos de Facturación"
                                    btnText="MODIFICAR DATOS DE FACTURACIÓN"
                                    handleClick={() => handleClickOpenBillingAddressModal()}
                                >
                                    <DataDisplay
                                        title="Direccion de Entrega"
                                        text={customerInfo.billingData.addressName}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title="Piso / Puerta / Aclaraciones"
                                        text={customerInfo.billingData.details}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title="Nombre Completo"
                                        text={customerInfo.billingData.customerName}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title="DNI/NIE/CIF"
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
                                <DataPaperSkeleton boxTitle="Metodo de Pago" buttonLabel="MODIFICAR METODO DE PAGO" />
                            ) : (
                                <BoxWithTitleAndTextButton
                                    title="Metodo de pago"
                                    btnText="MODIFICAR METODO DE PAGO"
                                    handleClick={() => handleClickOpenPaymentMethodModal()}
                                >
                                    <DataDisplay
                                        title="Tarjeta"
                                        text={defaultPaymentMethod.card}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title="Vencimiento"
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
                                    <DataPaperSkeleton boxTitle="Datos de la cuenta" buttonLabel="MODIFICAR DATOS DE CUENTA" />
                                ) : (
                                    <BoxWithTitle title="Datos de la cuenta">
                                        <DataDisplayEditable
                                            title="Correo electrónico"
                                            text={customerInfo.email}
                                            handleClick={() => handleClickOpenEmailModal()}
                                            style={{ marginBottom: theme.spacing(2) }}
                                        />
                                        <DataDisplayEditable
                                            title="Contraseña"
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
                primaryButtonText="MODIFICAR CORREO ELECTRONICO"
                secondaryButtonText="CANCELAR"
                handlePrimaryButtonClick={handleClickChangeEmail}
            />
            <PasswordModal
                open={openPasswordModal}
                handleClose={handleClickClosePasswordModal}
                primaryButtonText="MODIFICAR CONTRASEÑA"
                secondaryButtonText="CANCELAR"
                handlePrimaryButtonClick={handleClickChangePassword}
            />
            {openPersonalDataModal && (
                <PersonalDataModal
                    open={openPersonalDataModal}
                    handleClose={handleClickClosePersonalDataModal}
                    primaryButtonText="MODIFICAR DATOS PERSONALES"
                    secondaryButtonText="CANCELAR"
                    personalData={customerInfo.personalData}
                    handleSubmit={handleUpdatePersonalDataSubmit}
                />
            )}
            {openBillingAddressModal && (
                <BillingAddressModal
                    open={openBillingAddressModal}
                    handleClose={handleClickCloseBillingAddressModal}
                    primaryButtonText="MODIFICAR DIRECCION DE FACTURACIÓN"
                    secondaryButtonText="CANCELAR"
                    billingData={customerInfo.billingData}
                    handleSubmit={handleBillingDataSubmit}
                />
            )}
            {openDeliveryAddressModal && (
                <DeliveryAddressModal
                    open={openDeliveryAddressModal}
                    handleClose={handleClickCloseDeliveryAddressModal}
                    primaryButtonText="MODIFICAR DIRECCION DE ENTREGA"
                    secondaryButtonText="CANCELAR"
                    shippingAddress={customerInfo.shippingAddress}
                    handleSubmit={handleShippingAddressSubmit}
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
                    primaryButtonText="MODIFICAR METODO DE PAGO"
                    secondaryButtonText="CANCELAR"
                    initialData={customerInfo.paymentMethods}
                    customerId={customerInfo.id}
                />
            )}
        </>
    );
};

export default UserInfoDetail;
