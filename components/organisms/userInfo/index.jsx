import React, { useState, useMemo } from "react";

// External Components
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";

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
import { updatePersonalData } from "../../../helpers/serverRequests/customer";

const UserInfoDetail = (props) => {
    const theme = useTheme();
    const [customerInfo, setcustomerInfo] = useState({
        id: props.customer.id || "",
        email: props.customer.email || "",
        personalData: props.customer.personalData || {},
        shippingAddress: props.customer.shippingAddress || {},
        billingData: props.customer.billingData || {},
        paymentMethods: props.customer.paymentMethods || [],
    });
    const [openEmailModal, setEmailModal] = useState(false);
    const [openPasswordModal, setPasswordModal] = useState(false);
    const [openPersonalDataModal, setPersonalDataModal] = useState(false);
    const [openBillingAddressModal, setBillingAddressModal] = useState(false);
    const [openDeliveryAddressModal, setDeliveryAddressModal] = useState(false);
    const [openPaymentMethod, setPaymentMethod] = useState(false);

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

    // PASSWORD
    const handleClickOpenPasswordModal = () => {
        setPasswordModal(true);
    };

    const handleClickClosePasswordModal = () => {
        setPasswordModal(false);
    };

    // PERSONAL DATA
    const handleClickOpenPersonalDataModal = () => {
        setPersonalDataModal(true);
    };

    const handleClickClosePersonalDataModal = () => {
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
                personalData: newData
            })

        } else {
            alert("Error")
        }
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {props.isLoading ? (
                                <DataPaperSkeleton />
                            ) : (
                                <BoxWithTitleAndTextButton
                                    title="Datos Personales"
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
                                        text={customerInfo.personalData.birthDate}
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
                                <DataPaperSkeleton />
                            ) : (
                                <BoxWithTitleAndTextButton
                                    title="Direccion de Entrega"
                                    btnText="MODIFICAR DIRECCION DE ENTREGA"
                                    handleClick={() => handleClickOpenDeliveryAddressModal()}
                                >
                                    <DataDisplay
                                        title="Direccion de Entrega"
                                        text={customerInfo.shippingAddress.name}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title="Piso / Puerta / Aclaraciones"
                                        text={customerInfo.shippingAddress.details}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title="Horario de preferencia de entrega"
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
                                <DataPaperSkeleton />
                            ) : (
                                <BoxWithTitleAndTextButton
                                    title="Datos de Facturacion"
                                    btnText="MODIFICAR DATOS DE FACTURACION"
                                    handleClick={() => handleClickOpenBillingAddressModal()}
                                >
                                    <DataDisplay
                                        title="Direccion de Entrega"
                                        text={customerInfo.billingData.address}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title="Piso / Puerta / Aclaraciones"
                                        text={customerInfo.billingData.addressDetails}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title="Nombre Completo"
                                        text={customerInfo.billingData.fullName}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplay
                                        title="DNI/NIE/CIF"
                                        text={customerInfo.billingData.documentNumber}
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
                                <DataPaperSkeleton />
                            ) : (
                                <BoxWithTitleAndTextButton
                                    title="Metodo de Pago"
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
                                    <DataPaperSkeleton />
                                ) : (
                                    <BoxWithTitle title="Datos de la Cuenta">
                                        <DataDisplayEditable
                                            title="Correo electrónico"
                                            text="alejo@novolabs.xyz"
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
            />
            <PasswordModal
                open={openPasswordModal}
                handleClose={handleClickClosePasswordModal}
                primaryButtonText="MODIFICAR CONTRASEÑA"
                secondaryButtonText="CANCELAR"
            />
            <PersonalDataModal
                open={openPersonalDataModal}
                handleClose={handleClickClosePersonalDataModal}
                primaryButtonText="MODIFICAR DATOS PERSONALES"
                secondaryButtonText="CANCELAR"
                personalData={customerInfo.personalData}
                handleSubmit={handleUpdatePersonalDataSubmit}
            />
            <BillingAddressModal
                open={openBillingAddressModal}
                handleClose={handleClickCloseBillingAddressModal}
                primaryButtonText="MODIFICAR DIRECCION DE FACTURACION"
                secondaryButtonText="CANCELAR"
            />
            <DeliveryAddressModal
                open={openDeliveryAddressModal}
                handleClose={handleClickCloseDeliveryAddressModal}
                primaryButtonText="MODIFICAR DIRECCION DE ENTREGA"
                secondaryButtonText="CANCELAR"
            />
            <PaymentMethodModal
                open={openPaymentMethod}
                handleClose={handleClickClosePaymentMethodModal}
                primaryButtonText="MODIFICAR METODO DE PAGO"
                secondaryButtonText="CANCELAR"
            />
            {/* <RecipeModal
                open={openRecipeModal}
                handleClose={handleCloseRecipeModal}
                descriptionElementRef={descriptionElementRefRecipeModal}
                data={recipeSelectedIndex.period === 'actualWeek' ? data.recipesActualWeek[recipeSelectedIndex.index] : data.recipesNextWeek[recipeSelectedIndex.index]}
            />
            <ChangePlanModal
                open={openChangePlanModal}
                handleClose={handleCloseChangePlanModal}
                handlePrimaryButtonClick={handlePrimaryButtonClickChangePlanModal}
                data={changePlanData}
            /> */}
        </>
    );
};

export default UserInfoDetail;
