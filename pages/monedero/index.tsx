// Utils & Config
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
    useTheme,
    Typography,
    Box,
    Button,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Grid,
    useMediaQuery,
} from "@material-ui/core";
import { useUserInfoStore } from "../../stores/auth";

// Internal components
import { Layout } from "../../components/layout/index";
import BoxWithTextButton from "components/molecules/specificBox/boxWithTextButton";
import ToggleButton from "components/atoms/toggleButton";
import DataDisplay from "components/molecules/dataDisplay/dataDisplay";
import InnerSectionLayout from "components/layout/innerSectionLayout";
import TextButton from "components/atoms/textButton/textButton";
import WrappedTimePicker from "components/atoms/timePicker";
import { chargeMoneyToWallet, updateWallet } from "helpers/serverRequests/customer";
import { useSnackbar } from "notistack";
import { capitalizeFirstLetter } from "helpers/utils/utils";
import BackButtonTitle from "components/atoms/backButtonTitle/backButtonTitle";
import { Routes, localeRoutes } from "lang/routes/routes";
import AmountToChargeModal from "components/molecules/chargeAmountModal/chargeAmountModal";
import SimplePaymentMethodModal from "components/molecules/simplePaymentMethodsModal/simplePaymentMethodsModal";

const dayItems = [
    { label: "Lunes", value: 1, checked: false, name: "Lunes" },
    { label: "Martes", value: 2, checked: false, name: "Martes" },
    { label: "Miércoles", value: 3, checked: false, name: "Miércoles" },
    { label: "Jueves", value: 4, checked: false, name: "Jueves" },
    { label: "Viernes", value: 5, checked: false, name: "Viernes" },
    { label: "Sábado", value: 6, checked: false, name: "Sábado" },
    { label: "Domingo", value: 0, checked: false, name: "Domingo" },
];

const WalletPage = (props) => {
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const [hour, setHour] = useState<Date | null>(null);
    const { userInfo, setUserInfo } = useUserInfoStore((state) => ({ userInfo: state.userInfo, setUserInfo: state.setuserInfo }));
    const [isAmountToChargeModalOpen, setIsAmountToChargeModalOpen] = useState(false);
    const [isChargingMoney, setIsChargingMoney] = useState(false);
    const [isSubmittingUpdate, setIsSubmittingUpdate] = useState(false);
    const [openPaymentMethod, setOpenPaymentMethod] = useState(false);
    const [isSubmitButtonVisible, setIsSubmitButtonVisible] = useState(false);
    const router = useRouter();
    const isMdUp = useMediaQuery(useTheme().breakpoints.up("md"));

    useEffect(() => {
        if (userInfo && hour === null) {
            setHour(
                userInfo.wallet?.datesOfCharge[0]
                    ? new Date(
                          0,
                          0,
                          0,
                          parseInt(userInfo.wallet?.datesOfCharge[0].hour),
                          parseInt(userInfo.wallet?.datesOfCharge[0].minute)
                      )
                    : null
            );
        }
    }, [userInfo]);

    async function handleSelectPaymentMethod(paymentMethodId: string) {
        setUserInfo({ ...userInfo, wallet: { ...userInfo.wallet, paymentMethodForCharging: paymentMethodId } });
        setIsSubmitButtonVisible(true);

        setOpenPaymentMethod(false);
    }

    async function handleChargeMoney(amountToCharge: number, paymentMethodId?: string) {
        setIsChargingMoney(true);
        const res = await chargeMoneyToWallet(userInfo.id, amountToCharge, paymentMethodId);

        if (res.status === 200) {
            setUserInfo({
                ...userInfo,
                wallet: {
                    ...userInfo.wallet,
                    //@ts-ignore
                    balance: parseFloat(userInfo.wallet.balance ?? "0") + parseFloat(amountToCharge),
                },
            });
            enqueueSnackbar("Saldo cargado correctamente", { variant: "success" });
            setIsAmountToChargeModalOpen(false);
        } else {
            enqueueSnackbar(res.data.message ?? "Ocurrió un error al cargar el dinero", { variant: "error" });
        }
        setIsChargingMoney(false);
    }

    async function submitUpdateWallet() {
        setIsSubmittingUpdate(true);

        const res = await updateWallet(userInfo.id, {
            ...userInfo.wallet,
            datesOfCharge: userInfo.wallet?.datesOfCharge.map((date) => ({
                ...date,
                hour: new Date(hour).getHours().toString(),
                minute: new Date(hour).getMinutes().toString(),
            })),
        });

        if (res.status === 200) {
            enqueueSnackbar("Monedero actualizado correctamente", { variant: "success" });
            setIsSubmitButtonVisible(false);
        } else {
            enqueueSnackbar(res.data.message ?? "Ocurrió un error al actualizar el monedero", { variant: "error" });
        }
        setIsSubmittingUpdate(false);
    }

    return (
        <>
            <Layout disableCallToActionSection>
                <InnerSectionLayout containerMaxWidth="lg">
                    <BackButtonTitle url={localeRoutes[router.locale][Routes.perfil]} title={"Monedero"} />
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"center"}
                        alignContent={"center"}
                        width={"90%"}
                        margin={"auto"}
                    >
                        <Box marginBottom={4}>
                            <BoxWithTextButton hideButton>
                                <Grid container>
                                    <Grid item xs={12} md={6} diplay={"flex"}>
                                        <Box
                                            display={"flex"}
                                            flexDirection={isMdUp ? "column" : "row"}
                                            marginX={isMdUp ? "unset" : "auto"}
                                            width={"fit-content"}
                                            marginBottom={isMdUp ? 0 : 2}
                                            alignItems={"center"}
                                        >
                                            <Typography
                                                display="inline"
                                                variant="h2"
                                                color="initial"
                                                style={{ marginRight: isMdUp ? 0 : 16 }}
                                            >
                                                €{userInfo.wallet?.balance ?? 0}
                                            </Typography>
                                            <Typography display="inline" variant="subtitle1" color="initial">
                                                Saldo actual
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6} style={{ display: "flex" }}>
                                        <Button
                                            onClick={() => setIsAmountToChargeModalOpen(true)}
                                            variant="contained"
                                            color="primary"
                                            style={{
                                                borderRadius: 60,
                                                paddingRight: 32,
                                                paddingLeft: 32,
                                                margin: isMdUp ? "0 0 0 auto" : "0 auto",
                                            }}
                                        >
                                            Cargar saldo
                                        </Button>
                                    </Grid>
                                </Grid>
                            </BoxWithTextButton>
                        </Box>

                        <BoxWithTextButton hideButton>
                            <Box display={"flex"} flexDirection={"column"}>
                                <Box display="flex" marginBottom={5} alignContent={"center"} alignItems={"center"}>
                                    <ToggleButton
                                        isChecked={userInfo.wallet?.isEnabled}
                                        onChange={() => {
                                            setUserInfo({
                                                ...userInfo,
                                                wallet: { ...userInfo.wallet, isEnabled: !userInfo.wallet.isEnabled },
                                            });
                                            setIsSubmitButtonVisible(true);
                                        }}
                                    />
                                    <Typography
                                        variant={isMdUp ? "h4" : "subtitle1"}
                                        color="initial"
                                        style={{ cursor: "pointer", userSelect: "none" }}
                                        onClick={() => {
                                            setUserInfo({
                                                ...userInfo,
                                                wallet: { ...userInfo.wallet, isEnabled: !userInfo.wallet.isEnabled },
                                            });

                                            setIsSubmitButtonVisible(true);
                                        }}
                                    >
                                        Recarga autómatica habilitada
                                    </Typography>
                                </Box>
                                <Box marginBottom={4}>
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                        style={{ fontSize: "14px", marginBottom: theme.spacing(1) }}
                                    >
                                        Importe a Cargar
                                    </Typography>
                                    <Box width={isMdUp ? "50%" : "100%"}>
                                        <TextField
                                            fullWidth
                                            id="outlined-basic"
                                            name="amountCharge"
                                            label="Importe"
                                            type="number"
                                            variant="outlined"
                                            value={userInfo.wallet.amountToCharge}
                                            onChange={(e) => {
                                                setUserInfo({
                                                    ...userInfo,
                                                    wallet: { ...userInfo.wallet, amountToCharge: parseInt(e.target.value) },
                                                });
                                                setIsSubmitButtonVisible(true);
                                            }}
                                        />
                                    </Box>
                                </Box>
                                <Box marginBottom={4}>
                                    <Typography variant="subtitle2" color="textSecondary" style={{ fontSize: "14px" }}>
                                        Días y horario de carga
                                    </Typography>
                                    <FormGroup style={{ display: "flex", flexDirection: "row", marginBottom: 16 }}>
                                        {dayItems.map((item) => (
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        color="primary"
                                                        checked={userInfo.wallet?.datesOfCharge.some(
                                                            (date) => date.dayNumber === item.value
                                                        )}
                                                        onChange={() => {
                                                            const newDatesOfCharge = [...userInfo.wallet?.datesOfCharge];
                                                            if (newDatesOfCharge.some((date) => date.dayNumber === item.value)) {
                                                                newDatesOfCharge.splice(
                                                                    newDatesOfCharge.findIndex((date) => date.dayNumber === item.value),
                                                                    1
                                                                );
                                                            } else {
                                                                newDatesOfCharge.push({
                                                                    dayNumber: item.value,
                                                                    hour: "",
                                                                    minute: "",
                                                                });
                                                            }
                                                            setUserInfo({
                                                                ...userInfo,
                                                                wallet: { ...userInfo.wallet, datesOfCharge: newDatesOfCharge },
                                                            });
                                                            setIsSubmitButtonVisible(true);
                                                        }}
                                                    />
                                                }
                                                label={item.label}
                                            />
                                        ))}
                                    </FormGroup>
                                    <Box width={isMdUp ? "50%" : "100%"}>
                                        <WrappedTimePicker
                                            value={hour}
                                            onChange={(date) => {
                                                setHour(date);
                                                setIsSubmitButtonVisible(true);
                                            }}
                                            label="Horario de carga"
                                        />
                                    </Box>
                                </Box>
                                <Box marginBottom={4}>
                                    <DataDisplay
                                        title={"Tarjeta"}
                                        text={
                                            capitalizeFirstLetter(
                                                userInfo.paymentMethods.find((pm) => pm.id === userInfo.wallet?.paymentMethodForCharging)
                                                    ?.card ?? ""
                                            ) ?? "No hay tarjeta seleccionada"
                                        }
                                        style={{ marginBottom: theme.spacing(2) }}
                                    />
                                    <TextButton
                                        btnText={"Modificar tarjeta"}
                                        style={{ marginTop: theme.spacing(2), fontWeight: "600" }}
                                        handleClick={() => setOpenPaymentMethod(true)}
                                    />
                                </Box>
                                <Button
                                    onClick={submitUpdateWallet}
                                    disabled={isSubmittingUpdate}
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        borderRadius: 60,
                                        paddingRight: 32,
                                        paddingLeft: 32,
                                        margin: isMdUp ? "0 0 0 auto" : "auto",
                                        visibility: isSubmitButtonVisible ? "visible" : "hidden",
                                    }}
                                >
                                    Guardar
                                </Button>
                            </Box>
                        </BoxWithTextButton>

                        {isAmountToChargeModalOpen && (
                            <AmountToChargeModal
                                open={isAmountToChargeModalOpen}
                                handleClose={() => setIsAmountToChargeModalOpen(false)}
                                handleSubmit={handleChargeMoney}
                                primaryButtonText={"Guardar"}
                                secondaryButtonText={"Cancelar"}
                                title="Cargar saldo"
                                paymentMethods={userInfo.paymentMethods}
                                walletPaymentMethodId={userInfo.wallet?.paymentMethodForCharging}
                                isSubmitting={isChargingMoney}
                            />
                        )}

                        {openPaymentMethod && (
                            <SimplePaymentMethodModal
                                open={openPaymentMethod}
                                handleClose={() => setOpenPaymentMethod(false)}
                                selectedWalletPaymentMethodId={userInfo.wallet?.paymentMethodForCharging}
                                handleSelectPaymentMethod={handleSelectPaymentMethod}
                                primaryButtonText={"Guardar"}
                                secondaryButtonText={"Cancelar"}
                                initialData={userInfo.paymentMethods}
                                customerId={userInfo.id}
                                title="Seleccionar método de cobro"
                            />
                        )}
                        {/* 
                    <Image unoptimized src={props.image || "/wallet-empty-state.svg"} alt="búsqueda vacía" width={150} height={150} />
                    <Typography variant="h6" align="center" color="textPrimary" style={{ marginTop: theme.spacing(3) }}>
                        Monedero
                    </Typography>
                    <Typography variant="body2" align="center" color="textSecondary" style={{ marginTop: theme.spacing(1) }}>
                        Proximamente
                    </Typography> */}
                    </Box>
                </InnerSectionLayout>
            </Layout>
        </>
    );
};

export default WalletPage;
