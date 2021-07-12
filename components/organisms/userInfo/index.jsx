import React, { useState } from "react";

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

const UserInfoDetail = () => {
    const theme = useTheme();
    const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

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

    const handleClickChangeEmail = newEmail => {
        alert(`newEmail ${newEmail}`)
        setEmailModal(false);
    }


    // PASSWORD
    const handleClickOpenPasswordModal = () => {
        setPasswordModal(true);
    };

    const handleClickClosePasswordModal = () => {
        setPasswordModal(false);
    };

    const handleClickChangePassword = newPassword => {
        alert(`newPassword ${newPassword}`)
        setPasswordModal(false);
    }


    // PERSONAL DATA
    const handleClickOpenPersonalDataModal = () => {
        setPersonalDataModal(true);
    };

    const handleClickClosePersonalDataModal = () => {
        setPersonalDataModal(false);
    };

    const handleClickChangePersonalData = data => {
        alert(`newPassword ${JSON.stringify(data)}`)
        setPersonalDataModal(false);
    }


    // BILLING ADDRESS
    const handleClickOpenBillingAddressModal = () => {
        setBillingAddressModal(true);
    };

    const handleClickCloseBillingAddressModal = () => {
        setBillingAddressModal(false);
    };

    const handleClickChangeBillingAddress = data => {
        alert(`billingAddress ${JSON.stringify(data)}`)
        setBillingAddressModal(false);
    }


    // DELIVERY ADDRESS
    const handleClickOpenDeliveryAddressModal = () => {
        setDeliveryAddressModal(true);
    };

    const handleClickCloseDeliveryAddressModal = () => {
        setDeliveryAddressModal(false);
    };

    const handleClickChangeDeliveryAddress = data => {
        alert(`deliveryAddress ${JSON.stringify(data)}`)
        setDeliveryAddressModal(false);
    }


    // PAYMENT METHOD
    const handleClickOpenPaymentMethodModal = () => {
        setPaymentMethod(true);
    };

    const handleClickClosePaymentMethodModal = () => {
        setPaymentMethod(false);
    };

    const handleClickChangePaymentMethod = data => {
        alert(`paymentMethod ${JSON.stringify(data)}`)
        setPaymentMethod(false);
    }


    const data = {
        personalData: {
            clientName: 'Alejo',
            clientSurname: 'Scotti',
            phone1: '34686281368',
            phone2: '34686281368',
            birtdayDate: '10/10/1995',
            preferedLanguage: { value: 'ES', label: 'Español' }
        },
        accountInformation: {
            email: 'alejo@novolabsx.xyz',
            password: '●●●●●●●●'
        },
        deliveryAddress: {
            addressName: 'Avenida Fausto Elio 42, 46011, Valencia',
            addressDescription: 'Piso 2 Depto 3',
            preferredTimeToDelivery: { value: '10to12', label: 'De 10 a 12 hs.' }
        },
        billingAddress: {
            addressName: 'Avenida Fausto Elio 42, 46011, Valencia',
            addressDescription: 'Piso 2 Depto 3',
            name: 'Alejo Scotti',
            document: '78123312V',
        },
        paymentMethod: {
            cards: [
                { id: '1', name: 'Visa terminada en 1234', expirationDate: '03/25', default: false },
                { id: '2', name: 'Mastercard terminada en 4567', expirationDate: '03/25', default: true },
                { id: '3', name: 'Visa terminada en 9786', expirationDate: '03/25', default: false },
            ]
        }
    }
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <BoxWithTitleAndTextButton title="Datos personales" btnText="MODIFICAR DATOS PERSONALES" handleClick={() => handleClickOpenPersonalDataModal()} >
                        <DataDisplay title="Nombre completo" text={`${data.personalData.clientName} ${data.personalData.clientSurname}`} style={{ marginBottom: theme.spacing(2) }} />
                        <DataDisplay title="Telefono (1)" text={data.personalData.phone1} style={{ marginBottom: theme.spacing(2) }} />
                        <DataDisplay title="Telefono (2)" text={data.personalData.phone2} style={{ marginBottom: theme.spacing(2) }} />
                        <DataDisplay title="Fecha de Nacimiento" text={data.personalData.birtdayDate} style={{ marginBottom: theme.spacing(2) }} />
                        <DataDisplay title="Idioma de preferencia" text={data.personalData.preferedLanguage.label} />
                    </BoxWithTitleAndTextButton>
                </Grid>
                <Grid item xs={12} md={4}>
                    <BoxWithTitleAndTextButton title="Direccion de entrega" btnText="MODIFICAR DIRECCION DE ENTREGA" handleClick={() => handleClickOpenDeliveryAddressModal()} >
                        <DataDisplay title="Direccion de Entrega" text={data.deliveryAddress.addressName} style={{ marginBottom: theme.spacing(2) }} />
                        <DataDisplay title="Piso / Puerta / Aclaraciones" text={data.deliveryAddress.addressDescription} style={{ marginBottom: theme.spacing(2) }} />
                        <DataDisplay title="Horario de preferencia de entrega" text={data.deliveryAddress.preferredTimeToDelivery.label} style={{ marginBottom: !isSmDown ? "8.3rem" : "0px" }} />
                    </BoxWithTitleAndTextButton>
                </Grid>
                <Grid item xs={12} md={4}>
                    <BoxWithTitleAndTextButton title="Datos de facturacion" btnText="MODIFICAR DATOS DE FACTURACION" handleClick={() => handleClickOpenBillingAddressModal()} >
                        <DataDisplay title="Direccion de Facturación" text={data.billingAddress.addressName} style={{ marginBottom: theme.spacing(2) }} />
                        <DataDisplay title="Piso / Puerta / Aclaraciones" text={data.billingAddress.addressDescription} style={{ marginBottom: theme.spacing(2) }} />
                        <DataDisplay title="Nombre Completo" text={data.billingAddress.name} style={{ marginBottom: theme.spacing(2) }} />
                        <DataDisplay title="DNI/NIE/CIF" text={data.billingAddress.document} style={{ marginBottom: !isSmDown ? "4.1rem" : "0px" }} />
                    </BoxWithTitleAndTextButton>
                </Grid>
                <Grid item xs={12} md={4}>
                    <BoxWithTitleAndTextButton title="Metodo de pago" btnText="MODIFICAR METODO DE PAGO" handleClick={() => handleClickOpenPaymentMethodModal()} >
                        <DataDisplay title="Tarjeta" text={data.paymentMethod.cards.filter(card => card.default === true)[0].name} style={{ marginBottom: theme.spacing(2) }} />
                        <DataDisplay title="Vencimiento" text={data.paymentMethod.cards.filter(card => card.default === true)[0].expirationDate} style={{ marginBottom: theme.spacing(2) }} />
                    </BoxWithTitleAndTextButton>
                </Grid>
                <Grid item xs={12} md={4}>
                    <BoxWithTitle title="Datos de la cuenta">
                        <DataDisplayEditable title="Correo electrónico" text={data.accountInformation.email} handleClick={() => handleClickOpenEmailModal()} style={{ marginBottom: theme.spacing(2) }} />
                        <DataDisplayEditable title="Contraseña" text={data.accountInformation.password} handleClick={() => handleClickOpenPasswordModal()} style={{ marginBottom: !isSmDown ? "2.2rem" : "0px" }} />
                    </BoxWithTitle>
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
            <PersonalDataModal
                open={openPersonalDataModal}
                handleClose={handleClickClosePersonalDataModal}
                primaryButtonText="MODIFICAR DATOS PERSONALES"
                secondaryButtonText="CANCELAR"
                handlePrimaryButtonClick={handleClickChangePersonalData}
                initialData={data.personalData}
            />
            <BillingAddressModal
                open={openBillingAddressModal}
                handleClose={handleClickCloseBillingAddressModal}
                handlePrimaryButtonClick={handleClickChangeBillingAddress}
                primaryButtonText="MODIFICAR DIRECCION DE FACTURACION"
                secondaryButtonText="CANCELAR"
                initialData={data.billingAddress}
            />
            <DeliveryAddressModal
                open={openDeliveryAddressModal}
                handleClose={handleClickCloseDeliveryAddressModal}
                handlePrimaryButtonClick={handleClickChangeDeliveryAddress}
                primaryButtonText="MODIFICAR DIRECCION DE ENTREGA"
                secondaryButtonText="CANCELAR"
                initialData={data.deliveryAddress}
            />
            <PaymentMethodModal
                open={openPaymentMethod}
                handleClose={handleClickClosePaymentMethodModal}
                handlePrimaryButtonClick={handleClickChangePaymentMethod}
                primaryButtonText="MODIFICAR METODO DE PAGO"
                secondaryButtonText="CANCELAR"
                initialData={data.paymentMethod}
            />
        </>
    );
};

export default UserInfoDetail;
