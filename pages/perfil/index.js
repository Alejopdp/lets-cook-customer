// Utils & Config
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useTheme } from "@material-ui/core/styles";
import Link from "next/link";
// const langs = require("../../lang").comoFunciona;

// External Components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Internal components
import InnerSectionLayout from "../../components/layout/publicLayout";
import Layout from "../../components/layout/index";
import BoxWithIconAndTextButton from "../../components/molecules/specificBox/boxWithIconAndTextButton";
import BoxWithTextButton from "../../components/molecules/specificBox/boxWithTextButton";
import PlanInfoWithStatus from "../../components/molecules/planInfo/planInfoWithStatus";
import PlanInfo from "../../components/molecules/planInfo/planInfo";
import Network from "../../components/atoms/icons/Network";
import Options from "../../components/atoms/options/Options";
import TextButton from "../../components/atoms/textButton/textButton";
import PlanRecoverModal from "../../components/molecules/planRecoverModal/planRecoverModal";

import mockJson from "../../public/assets/mockJsonRes";

const Perfil = () => {
    const theme = useTheme();
    const router = useRouter();
    const [openPlanRecoverModal, setOpenPlanRecoverModal] = useState(false);
    // const lang = langs[router.locale];

    const endpoint = "http://localhost:3001/api/v1/subscription/by-customer/1";

    const handleClickOpenPlanRecoverModal = async () => {
        setOpenPlanRecoverModal(true);
        /*  const res = fetch(endpoint).then(async (response) => {
            try {
                const data = await response.json();
                console.log("response data?", data);
            } catch (error) {
                console.log("Error happened here!");
                console.error(error);
            }
        });
        console.log(res); */
    };

    const handleClosePlanRecoverModal = () => {
        setOpenPlanRecoverModal(false);
    };

    console.log(mockJson.principalPlanSubscriptions);

    const pendingActions = mockJson.pendingActions.map((el) => {
        let message;
        let btnText;
        let icon;
        switch (el.type) {
            case "choose_recipes":
                message = `Tienes pendiente elegir las recetas del ${el.planName} para la entrega del ${el.shippment}`;
                btnText = "Elegir recetas";
                icon = "test";
                break;
            case "rate_recipes":
                message = "Tienes recetas pendientes de valorar. ¡Tu opinión nos ayuda a mejorar!";
                btnText = "Valorar recetas";
                icon = "rating";
                break;
            case "invite_code":
                message = "Invitá a tus amigos a Let’s Cook con el código de descuento de 5€";
                btnText = el.couponCode;
                icon = "network";
                break;
            default:
                return null;
        }

        return (
            <Grid item sm={4} xs={12}>
                <BoxWithIconAndTextButton icon={icon} btnText={btnText} noColor={el.type === "invite_code"}>
                    <Typography variant="body2" style={{ fontSize: "16px" }}>
                        {message}
                    </Typography>
                </BoxWithIconAndTextButton>
            </Grid>
        );
    });

    const renderPlans = (type) =>
        mockJson[type].map((el) => {
            let statusValue;
            let statusText;
            let btnText;

            switch (el.stateTitle) {
                case "SUBSCRIPTION_ACTIVE":
                    statusValue = "active";
                    statusText = "activo";
                    btnText = "Ver detalle >";
                    break;
                case "SUBSCRIPTION_CANCELLED":
                    statusValue = "cancelled";
                    statusText = "cancelado";
                    btnText = "Volver a pedir >";
                    break;
                case "SUBSCRIPTION_EXPIRED":
                    statusValue = "expired";
                    statusText = "expirado";
                    btnText = "Volver a pedir >";
                    break;
                default:
                    return null;
            }

            return (
                <Grid item sm={4} xs={12}>
                    <BoxWithTextButton
                        status={statusValue}
                        btnText={btnText}
                        handleClick={() => {
                            if (statusValue !== "active") {
                                handleClickOpenPlanRecoverModal();
                            }
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <PlanInfoWithStatus
                                style={{ marginBottom: theme.spacing(1) }}
                                planName={el.planName}
                                planIcon="/assets/plan-test-color.svg"
                                status={{ value: statusValue, text: statusText }}
                            />
                            <Options />
                        </div>
                        <div style={{ marginBottom: "24px", marginTop: "16px" }}>
                            <Typography variant="body2" style={{ fontSize: "16px" }}>
                                {el.planVariantLabel}
                            </Typography>
                        </div>
                        {el.stateTitle === "SUBSCRIPTION_ACTIVE" ? (
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "16px" }}>
                                <Network width={15} heigth={15} />
                                <Typography variant="body2" style={{ fontSize: "14px", marginLeft: "8px" }}>
                                    Próxima entrega: {el.nextShippment}
                                </Typography>
                            </div>
                        ) : null}
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "16px" }}>
                            <Network width={15} heigth={15} />
                            <Typography variant="body2" style={{ fontSize: "14px", marginLeft: "8px" }}>
                                Frecuencia {el.frequency}
                            </Typography>
                        </div>
                    </BoxWithTextButton>
                </Grid>
            );
        });

    const principalPlans = renderPlans("principalPlanSubscriptions");
    const additionalPlans = renderPlans("additionalPlanSubscriptions");

    /* const additionalPlans = mockJson.additionalPlanSubscriptions.map((el) => {
        return (

        )
    })
 */
    /* const descriptionElementRefRecipeModal = useRef(null);

    useEffect(() => {
        if (openPlanRecoverModal) {
            const { current: descriptionElement } = descriptionElementRefRecipeModal;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openPlanRecoverModal]); */

    return (
        <>
            <Layout>
                <InnerSectionLayout containerMaxWidth="lg">
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justify="space-between"
                        spacing={3}
                        style={{ marginBottom: theme.spacing(3), marginTop: theme.spacing(3) }}
                    >
                        <Grid item>
                            <Typography variant="h4" style={{ fontSize: "24px", color: theme.palette.text.black }}>
                                Hola Alejo
                            </Typography>
                        </Grid>
                        <Grid item style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Link href="/historial-pagos">
                                <TextButton style={{ marginRight: "14px" }} noColor icon="time" btnText="Historial de pagos" />
                            </Link>
                            <TextButton noColor icon="settings" btnText="Configuración" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} style={{ marginBottom: theme.spacing(5) }}>
                        {pendingActions}
                    </Grid>
                    <Grid container direction="row" alignItems="center" spacing={3} justify="space-between">
                        <Grid item>
                            <Typography variant="h6" style={{ color: theme.palette.text.secondary }}>
                                Mis planes
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextButton style={{ color: theme.palette.primary.main }} icon="plus-circle-outline" btnText="Nuevo plan" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(5) }}>
                        {principalPlans}
                    </Grid>
                    <Grid container direction="row" alignItems="center" spacing={3} justify="space-between">
                        <Grid item>
                            <Typography variant="h6" style={{ color: theme.palette.text.secondary }}>
                                Mis acompañamientos
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextButton
                                style={{ color: theme.palette.primary.main }}
                                icon="plus-circle-outline"
                                btnText="Nuevo acompañamiento"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} style={{ marginTop: theme.spacing(3), marginBottom: theme.spacing(5) }}>
                        {additionalPlans}
                    </Grid>
                </InnerSectionLayout>
            </Layout>
            <PlanRecoverModal open={openPlanRecoverModal} handleClose={handleClosePlanRecoverModal} />
        </>
    );
};

export default Perfil;
