import React, { useState } from "react";

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

const UserInfoDetail = () => {
    const theme = useTheme();
    const [openEmailModal, setEmailModal] = useState(false);
    const [openPasswordModal, setPasswordModal] = useState(false);
    const [openPersonalDataModal, setPersonalDataModal] = useState(false);
    const [openBillingAddressModal, setBillingAddressModal] = useState(false);
    const [openDeliveryAddressModal, setDeliveryAddressModal] = useState(false);
    const [openPaymentMethod, setPaymentMethod] = useState(false);
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
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <BoxWithTitleAndTextButton
                                title="Datos Personales"
                                btnText="MODIFICAR DATOS PERSONALES"
                                handleClick={() => handleClickOpenPersonalDataModal()}
                            >
                                <DataDisplay title="Nombre completo" text="Alejo Scotti" style={{ marginBottom: theme.spacing(2) }} />
                                <DataDisplay title="Telefono (1)" text="3794-749124" style={{ marginBottom: theme.spacing(2) }} />
                                <DataDisplay title="Telefono (2)" text="Sin indicar" style={{ marginBottom: theme.spacing(2) }} />
                                <DataDisplay title="Fecha de Nacimiento" text="Sin indicar" style={{ marginBottom: theme.spacing(2) }} />
                                <DataDisplay title="Idioma de preferencia" text="Ingles" />
                            </BoxWithTitleAndTextButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <BoxWithTitleAndTextButton
                                title="Direccion de Entrega"
                                btnText="MODIFICAR DIRECCION DE ENTREGA"
                                handleClick={() => handleClickOpenDeliveryAddressModal()}
                            >
                                <DataDisplay title="Direccion de Entrega" text="Belgrano" style={{ marginBottom: theme.spacing(2) }} />
                                <DataDisplay title="Piso / Puerta / Aclaraciones" text="1558" style={{ marginBottom: theme.spacing(2) }} />
                                <DataDisplay
                                    title="Horario de preferencia de entrega"
                                    text="Sin indicar"
                                    style={{ marginBottom: "8.3rem" }}
                                />
                            </BoxWithTitleAndTextButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <BoxWithTitleAndTextButton
                                title="Datos de Facturacion"
                                btnText="MODIFICAR DATOS DE FACTURACION"
                                handleClick={() => handleClickOpenBillingAddressModal()}
                            >
                                <DataDisplay title="Direccion de Entrega" text="Belgrano" style={{ marginBottom: theme.spacing(2) }} />
                                <DataDisplay title="Piso / Puerta / Aclaraciones" text="1558" style={{ marginBottom: theme.spacing(2) }} />
                                <DataDisplay title="Nombre Completo" text="Alejo Scotti" style={{ marginBottom: theme.spacing(2) }} />
                                <DataDisplay title="DNI/NIE/CIF" text="39518815" style={{ marginBottom: "4.1rem" }} />
                            </BoxWithTitleAndTextButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <BoxWithTitleAndTextButton
                                title="Metodo de Pago"
                                btnText="MODIFICAR METODO DE PAGO"
                                handleClick={() => handleClickOpenPaymentMethodModal()}
                            >
                                <DataDisplay title="Tarjeta" text="Belgrano" style={{ marginBottom: theme.spacing(2) }} />
                                <DataDisplay title="Vencimiento" text="1558" style={{ marginBottom: theme.spacing(2) }} />
                            </BoxWithTitleAndTextButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid item xs={12}>
                                <BoxWithTitle title="Datos de la Cuenta">
                                    <DataDisplayEditable
                                        title="Correo electrónico"
                                        text="alejo@novolabs.xyz"
                                        handleClick={() => handleClickOpenEmailModal()}
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <DataDisplayEditable
                                        title="Correo electrónico"
                                        text="alejo@novolabs.xyz"
                                        handleClick={() => handleClickOpenPasswordModal()}
                                        style={{ marginBottom: "2.2rem" }}
                                    />
                                </BoxWithTitle>
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
