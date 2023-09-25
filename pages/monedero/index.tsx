// Utils & Config
import React, { useState, useEffect } from "react";
import Big from "big.js";
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
    InputAdornment,
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
import { Skeleton } from "@material-ui/lab";
import WalletMovementLog from "components/atoms/walletMovementLog";

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
    const [isLoading, setIsLoading] = useState(true);
    const [hour, setHour] = useState<Date | null>(null);
    const { userInfo, setUserInfo } = useUserInfoStore((state) => ({ userInfo: state.userInfo, setUserInfo: state.setuserInfo }));
    const [isAmountToChargeModalOpen, setIsAmountToChargeModalOpen] = useState(false);
    const [isChargingMoney, setIsChargingMoney] = useState(false);
    const [isWalletEnabled, setIsWalletEnabled] = useState(userInfo.wallet?.isEnabled);
    const [isSubmittingUpdate, setIsSubmittingUpdate] = useState(false);
    const [openPaymentMethod, setOpenPaymentMethod] = useState(false);
    const [isSubmitButtonVisible, setIsSubmitButtonVisible] = useState(false);
    const [amountToCharge, setAmountToCharge] = useState(userInfo.wallet?.amountToCharge);
    const [datesOfCharge, setDatesOfCharge] = useState(userInfo.wallet?.datesOfCharge);
    const router = useRouter();
    const isMdUp = useMediaQuery(useTheme().breakpoints.up("md"));

    useEffect(() => {
        setHour(
            userInfo.wallet?.datesOfCharge[0]
                ? new Date(0, 0, 0, parseInt(userInfo.wallet?.datesOfCharge[0].hour), parseInt(userInfo.wallet?.datesOfCharge[0].minute))
                : null
        );
        setIsWalletEnabled(userInfo.wallet?.isEnabled);
        setIsSubmitButtonVisible(false);
        setAmountToCharge(userInfo.wallet?.amountToCharge);
    }, [router.asPath]);

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

        setDatesOfCharge(userInfo.wallet?.datesOfCharge);
        setIsWalletEnabled(userInfo.wallet?.isEnabled);
        setAmountToCharge(userInfo.wallet?.amountToCharge);
        if (userInfo && userInfo.id) setIsLoading(false);
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
                    balance: Number(new Big(parseFloat(userInfo.wallet.balance ?? "0")).plus(new Big(parseFloat(amountToCharge)))),
                    walletMovementsLogs: res.data.walletMovementsLogs,
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
            isEnabled: isWalletEnabled,
            amountToCharge,
            datesOfCharge: datesOfCharge.map((date) => ({
                ...date,
                hour: new Date(hour).getHours().toString(),
                minute: new Date(hour).getMinutes().toString(),
            })),
        });

        if (res.status === 200) {
            enqueueSnackbar("Monedero actualizado correctamente", { variant: "success" });
            setUserInfo({
                ...userInfo,
                wallet: {
                    ...userInfo.wallet,
                    amountToCharge,
                    isEnabled: isWalletEnabled,
                    datesOfCharge: datesOfCharge.map((date) => ({
                        ...date,
                        hour: new Date(hour).getHours().toString(),
                        minute: new Date(hour).getMinutes().toString(),
                    })),
                    walletMovementsLogs: res.data.walletMovementsLogs,
                },
            });
            setIsSubmitButtonVisible(false);
        } else {
            enqueueSnackbar(res.data.message ?? "Ocurrió un error al actualizar el monedero", { variant: "error" });
        }
        setIsSubmittingUpdate(false);
    }

    var WalletBalanceBox = (
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
                            <Typography display="inline" variant="h2" color="initial" style={{ marginRight: isMdUp ? 0 : 16 }}>
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
    );

    var WalletDataBox = (
        <Box marginBottom={4}>
            <BoxWithTextButton hideButton>
                <Box display={"flex"} flexDirection={"column"}>
                    <Box display="flex" marginBottom={5} alignContent={"center"} alignItems={"center"}>
                        <ToggleButton
                            isChecked={isWalletEnabled}
                            onChange={() => {
                                setIsWalletEnabled(!isWalletEnabled);
                                setIsSubmitButtonVisible(true);
                            }}
                        />
                        <Typography
                            variant={isMdUp ? "h4" : "subtitle1"}
                            color="initial"
                            style={{ cursor: "pointer", userSelect: "none" }}
                            onClick={() => {
                                setIsWalletEnabled(!isWalletEnabled);
                                setIsSubmitButtonVisible(true);
                            }}
                        >
                            Recarga autómatica habilitada
                        </Typography>
                    </Box>
                    <Box marginBottom={4}>
                        <Typography variant="subtitle2" color="textSecondary" style={{ fontSize: "14px", marginBottom: theme.spacing(1) }}>
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
                                value={amountToCharge}
                                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                                error={amountToCharge < 5}
                                helperText={amountToCharge < 5 ? "El importe mínimo es de $5" : ""}
                                FormHelperTextProps={{ style: { fontStyle: "italic", marginLeft: 0 } }}
                                onChange={(e) => {
                                    setAmountToCharge(parseFloat(e.target.value));
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
                                            checked={datesOfCharge.some((date) => date.dayNumber === item.value)}
                                            onChange={() => {
                                                const newDatesOfCharge = [...datesOfCharge];
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
                                                setDatesOfCharge(newDatesOfCharge);
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
                            text={capitalizeFirstLetter(
                                userInfo.paymentMethods.find((pm) => pm.id === userInfo.wallet?.paymentMethodForCharging)?.card ??
                                    "No hay tarjeta seleccionada"
                            )}
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
                            visibility: isSubmitButtonVisible && amountToCharge >= 5 ? "visible" : "hidden",
                        }}
                    >
                        Guardar
                    </Button>
                </Box>
            </BoxWithTextButton>
        </Box>
    );

    var WalletMovementsLog = (
        <BoxWithTextButton hideButton>
            <Box display="flex" marginBottom={5} alignContent={"center"} alignItems={"center"}>
                <Typography variant={isMdUp ? "h4" : "subtitle1"} color="initial">
                    Movimientos de Monedero
                </Typography>
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
                {userInfo.wallet.walletMovementsLogs.map((log, index) => (
                    <Box
                        marginX={-2}
                        paddingX={2}
                        key={index}
                        height={80}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        bgcolor={index % 2 !== 0 ? "#FAFAFA" : "inherit"}
                    >
                        <WalletMovementLog amount={log.amount} createdAt={log.createdAt} title={log.title} />
                    </Box>
                ))}
            </Box>
        </BoxWithTextButton>
    );

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
                        {isLoading ? (
                            <Skeleton animation="wave" width={"100%"}>
                                {WalletBalanceBox}
                            </Skeleton>
                        ) : (
                            WalletBalanceBox
                        )}

                        {isLoading ? (
                            <Skeleton
                                animation="wave"
                                width={"100%"}
                                height={500}
                                style={{ transform: "initial", marginBottom: 24 }}
                            ></Skeleton>
                        ) : (
                            WalletDataBox
                        )}

                        {WalletMovementsLog}

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
                    </Box>
                </InnerSectionLayout>
            </Layout>
        </>
    );
};

export default WalletPage;
