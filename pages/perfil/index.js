// Utils & Config
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useTheme } from "@material-ui/core";

import Link from "next/link";
// const langs = require("../../lang").comoFunciona;
import { getProfileInfo } from "../../helpers/serverRequests/userProfile";

// External Components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Internal components
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import { Layout } from "../../components/layout/index";
import BoxWithIconAndTextButton from "../../components/molecules/specificBox/boxWithIconAndTextButton";
import TextButton from "../../components/atoms/textButton/textButton";
import PlanRecoverModal from "../../components/molecules/planRecoverModal/planRecoverModal";
import PlanProfileCard from "./planProfileCard";
import ProfileTitleWithButton from "./profileTitleWithButton";
import ChooseRecipesActionBox from "./pendingActionsComponents/chooseRecipesActionBox";
import RateRecipesActionBox from "./pendingActionsComponents/rateRecipesActionBox";
import ReferalActionBox from "./pendingActionsComponents/referalActionBox";
import EmptyState from "../../components/molecules/emptyState/emptyState";

export async function getServerSideProps(context) {
    const customerWithPlans = "f031ca8c-647e-4d0b-8afc-28e982068fd5";
    const customerWithoutPlans = "";
    const customerId = customerWithPlans;

    const locale = context.locale;
    const res = await getProfileInfo(customerId, locale);

    return {
        props: {
            data: res.data || null,
            error: res.status !== 200 ? "ERROR" : "",
        },
    };
}

const Perfil = ({ data, error }) => {
    const theme = useTheme();
    const router = useRouter();
    const [openPlanRecoverModal, setOpenPlanRecoverModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    // const lang = langs[router.locale];

    const endpoint = "http://localhost:3001/api/v1/subscription/by-customer/1";

    const handleClickOpenPlanRecoverModal = async (id, type) => {
        const plan = data[type].find((el) => el.id === id);
        setSelectedPlan(plan);
        setOpenPlanRecoverModal(true);
    };

    const handleClosePlanRecoverModal = () => {
        setOpenPlanRecoverModal(false);
        setSelectedPlan(null);
    };

    const handleClickRedirectToPlanDetail = (subscriptionId) => {
        router.push({ pathname: `/detalle-del-plan/${subscriptionId}` });
    };

    /* const descriptionElementRefRecipeModal = useRef(null);

    useEffect(() => {
        if (openPlanRecoverModal) {
            const { current: descriptionElement } = descriptionElementRefRecipeModal;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openPlanRecoverModal]); */

    const getPendingActionComponent = (data) => {
        switch (data.type) {
            case "choose_recipes":
                return <ChooseRecipesActionBox data={data} />;
            case "rate_recipes":
                return <RateRecipesActionBox />;
            case "invite_code":
                return <ReferalActionBox data={data} />;
            default:
                return <p>unknown action</p>;
        }
    };

    let carouselWidth;

    if (process.browser) {
        carouselWidth = window.innerWidth;
    }

    const responsive = {
        superLargeDesktop: {
            breakpoint: {
                max: 3000,
                min: 1280
            },
            items: 5,
            partialVisibilityGutter: 40
        },
        desktop: {
            breakpoint: {
                max: 1280,
                min: 960
            },
            items: 3,
            partialVisibilityGutter: 40
        },
        tablet: {
            breakpoint: {
                max: 960,
                min: 600
            },
            items: 2,
            partialVisibilityGutter: 30
        },
        mobile: {
            breakpoint: {
                max: 600,
                min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
        },
    };


    return (
        <>
            <Layout disableCallToActionSection>
                <InnerSectionLayout containerMaxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={4}>
                            {/* Greeting & Pending Actions Mobile */}
                            <Hidden mdUp>
                                <Grid
                                    container
                                    direction="row"
                                    alignItems="center"
                                    justify="space-between"
                                    style={{ marginBottom: theme.spacing(5) }}
                                >
                                    <Grid item xs={9}>
                                        {/* <Grid item> */}
                                        <Typography variant="h4" style={{ fontSize: "24px", color: theme.palette.text.black }}>
                                            Hola Alejo
                                            </Typography>
                                        {/* </Grid> */}
                                    </Grid>
                                    <Grid item xs={3} style={{ textAlign: 'right' }}>
                                        {/* <Grid item style={{ marginRight: theme.spacing(2) }}> */}
                                        <Link href="/historial-pagos">
                                            <TextButton
                                                style={{ marginRight: theme.spacing(2)}}
                                                noColor
                                                icon="time"
                                                btnText="Historial de pagos"
                                            />
                                        </Link>
                                        {/* </Grid> */}
                                        {/* <Grid item> */}
                                        <Link href="/configuracion">
                                            <TextButton noColor icon="settings" btnText="Configuración" />
                                        </Link>
                                        {/* </Grid> */}
                                    </Grid>
                                </Grid>
                                <Carousel
                                    additionalTransfrom={0}
                                    arrows={false}
                                    autoPlaySpeed={3000}
                                    centerMode={false}
                                    className=""
                                    containerClass="container"
                                    dotListClass=""
                                    draggable
                                    focusOnSelect={false}
                                    // infinite
                                    itemClass=""
                                    keyBoardControl
                                    responsive={responsive}
                                    minimumTouchDrag={80}
                                    partialVisible
                                    renderButtonGroupOutside={false}
                                    renderDotsOutside={false}
                                    showDots={false}
                                    sliderClass=""
                                    slidesToSlide={1}
                                    swipeable
                                >
                                    {data.pendingActions.map((action, index) => (
                                        <div key={index} style={{ marginRight: theme.spacing(2) }}>
                                            {getPendingActionComponent(action)}
                                        </div>
                                    ))}
                                </Carousel>
                            </Hidden>
                            {/* Greeting & Pending Actions Desktop */}
                            <Hidden smDown>
                                <Grid
                                    container
                                    direction="column"
                                    alignItems="left"
                                    spacing={2}
                                >
                                    <Grid item xs={12} style={{ marginBottom: theme.spacing(3) }}>
                                        <Typography variant="h4" style={{ fontSize: "24px", color: theme.palette.text.black }}>
                                            Hola Alejo
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} style={{ marginBottom: theme.spacing(1) }}>
                                        <Link href="/historial-pagos">
                                            <TextButton style={{ marginRight: "14px" }} noColor icon="time" btnText="Historial de pagos" />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12} style={{ marginBottom: theme.spacing(5) }}>
                                        <Link href="/configuracion">
                                            <TextButton noColor icon="settings" btnText="Configuración" />
                                        </Link>
                                    </Grid>
                                    {data.pendingActions.map((action, index) => (
                                        <Grid key={index} item xs={12}>
                                            {getPendingActionComponent(action)}
                                        </Grid>
                                    ))}
                                </Grid>
                            </Hidden>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Grid
                                container
                                justify="space-between"
                                direction="row"
                                alignItems="center"
                                spacing={2}
                                style={{ marginBottom: theme.spacing(3) }}
                            >
                                <ProfileTitleWithButton title="Mis planes" btnText="Nuevo plan" />
                            </Grid>
                            <Grid container spacing={2} style={{ marginBottom: theme.spacing(5) }}>
                                {data.principalPlanSubscriptions.length > 0 ? (
                                    <>
                                        {data.principalPlanSubscriptions.map((plan, index) => {
                                            return (
                                                <Grid key={index} item sm={6} xs={12}>
                                                    <PlanProfileCard
                                                        plan={plan}
                                                        handleClickOpenPlanRecoverModal={() =>
                                                            handleClickOpenPlanRecoverModal(plan.id, "principalPlanSubscriptions")
                                                        }
                                                        handleClickRedirectToPlanDetail={handleClickRedirectToPlanDetail}
                                                    />
                                                </Grid>
                                            );
                                        })}
                                    </>
                                ) : (
                                        <EmptyState
                                            image="/emptyStatePlans.png"
                                            title="Aún no tienes planes"
                                            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                                        />
                                    )}
                            </Grid>
                            {data.principalPlanSubscriptions.length > 0 && (
                                <>
                                    <Grid
                                        container
                                        justify="space-between"
                                        direction="row"
                                        alignItems="center"
                                        spacing={2}
                                        style={{ marginBottom: theme.spacing(3) }}
                                    >
                                        <ProfileTitleWithButton title="Mis acompañamientos" btnText="Nuevo acompañamiento" />
                                    </Grid>
                                    <Grid container spacing={2} style={{ marginBottom: theme.spacing(5) }}>
                                        {data.additionalPlanSubscriptions.length > 0 ? (
                                            <>
                                                {data.additionalPlanSubscriptions.map((plan, index) => (
                                                    <Grid key={index} item sm={6} xs={12}>
                                                        <PlanProfileCard
                                                            plan={plan}
                                                            handleClickOpenPlanRecoverModal={() =>
                                                                handleClickOpenPlanRecoverModal(plan.id, "additionalPlanSubscriptions")
                                                            }
                                                            handleClickRedirectToPlanDetail={handleClickRedirectToPlanDetail}
                                                        />
                                                    </Grid>
                                                ))}
                                            </>
                                        ) : (
                                                <EmptyState
                                                    image="/emptyStatePlans.png"
                                                    title="Aún no tienes acompañamientos"
                                                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                                                />
                                            )}
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </InnerSectionLayout>
            </Layout>
            <PlanRecoverModal data={selectedPlan} open={openPlanRecoverModal} handleClose={handleClosePlanRecoverModal} />
        </>
    );
};

export default Perfil;
