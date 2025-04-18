// Utils & Config
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTheme, Icon, Box } from "@material-ui/core";
import { perfil } from "../../lang/index";
import { swapPlan } from "../../helpers/serverRequests/subscription";
import { skipOrders } from "../../helpers/serverRequests/order";
import { getSubscriptionById } from "../../helpers/serverRequests/userProfile";
import { getDataForSwappingAPlan } from "../../helpers/serverRequests/plans";
import { useAuthStore, useUserInfoStore } from "../../stores/auth";
import { useSnackbar } from "notistack";
import { reorderPlan } from "../../helpers/serverRequests/subscription";
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
import TextButton from "../../components/atoms/textButton/textButton";
import PlanRecoverModal from "../../components/molecules/planRecoverModal/planRecoverModal";
import ProfileTitleWithButton from "../../components/molecules/profileTitleWithButton";
import ChooseRecipesActionBox from "../../components/molecules/pendingActionsComponents/chooseRecipesActionBox";
import RateRecipesActionBox from "../../components/molecules/pendingActionsComponents/rateRecipesActionBox";
import ReferalActionBox from "../../components/molecules/pendingActionsComponents/referalActionBox";
import EmptyState from "../../components/molecules/emptyState/emptyState";
import PlanProfileCard from "../../components/molecules/planProfileCard";
import SwapPlanModal from "../../components/molecules/managePlanModals/swapPlanModal";
import SkipPlanModal from "../../components/molecules/managePlanModals/skipPlanModal";
import { localeRoutes, Routes } from "../../lang/routes/routes";
import PendingActionSkeleton from "components/molecules/pendingActionsComponents/pendingActionSkeleton";
import PlanProfileCardSkeleton from "components/molecules/planProfileCard/planProfileCardSkeleton";
import { locale } from "types/locale";
import Link from "next/link";
import { Restore, Settings, Star, AttachMoney } from "@material-ui/icons";
import { useAuth } from "contexts/auth.context";

const Perfil = (props) => {
    const theme = useTheme();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isReorderingPlan, setIsReorderingPlan] = useState(false);
    const lang = perfil[router.locale as locale];
    const { enqueueSnackbar } = useSnackbar();
    const [openPlanRecoverModal, setOpenPlanRecoverModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [data, setdata] = useState({
        principalPlanSubscriptions: [],
        additionalPlanSubscriptions: [],
        pendingActions: [],
    });
    const [openChangePlanModal, setOpenChangePlanModal] = useState(false);
    const [openSkipPlanModal, setOpenSkipPlanModal] = useState(false);
    const [subscription, setSubscription] = useState();
    const [swapPlanData, setSwapPlanData] = useState();
    const [subscriptionIdSelected, setSubscriptionIdSelected] = useState();
    const [reloadCounter, setreloadCounter] = useState(0);
    const [isSkippingOrders, setIsSkippingOrders] = useState(false);
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const { isVerifyingAuth } = useAuth();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    useEffect(() => {
        console.log({ isVerifyingAuth, isAuthenticated });
        if (!isVerifyingAuth && !isAuthenticated) router.push(localeRoutes[router.locale][Routes.planes]);
    }, [isVerifyingAuth, isAuthenticated]);

    useEffect(() => {
        const getProfile = async () => {
            const res = await getProfileInfo(userInfo.id, router.locale);

            if (res.status === 200) {
                setdata(res.data);
            } else {
                enqueueSnackbar(res.data.message, { variant: "error" });
            }

            setIsLoading(false);
        };

        if (!!userInfo.id) getProfile();
    }, [userInfo, router.locale, reloadCounter]);

    const handleSetSubscriptionId = async (subscriptionId) => {
        const locale = router.locale;
        setSubscriptionIdSelected(subscriptionId);
        const res = await getSubscriptionById(subscriptionId, locale);
        const swapPlanDataRes = await getDataForSwappingAPlan(subscriptionId, locale);
        if (res.status === 200) {
            setSubscription(res.data);
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
        if (swapPlanDataRes.status === 200) {
            setSwapPlanData(swapPlanDataRes.data);
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    // FUNCTIONS MANAGE PLAN

    // Change Plan Modal Functions

    const handleClickOpenChangePlanModal = () => {
        setOpenChangePlanModal(true);
    };

    const handleCloseChangePlanModal = () => {
        setOpenChangePlanModal(false);
    };

    const handlePrimaryButtonClickChangePlanModal = async (newPlan) => {
        const res = await swapPlan(subscriptionIdSelected, newPlan.planId, newPlan.planVariantId);

        if (res.status === 200) {
            enqueueSnackbar(lang.snackbars.success.swapedPlan, { variant: "success" });
            setOpenChangePlanModal(false);
            setreloadCounter(reloadCounter + 1);
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    // Skip Plan Modal Functions

    const handleClickOpenSkipPlanModal = () => {
        setOpenSkipPlanModal(true);
    };

    const handleCloseSkipPlanModal = () => {
        setOpenSkipPlanModal(false);
    };

    const handlePrimaryButtonClickSkipPlanModal = async (orders) => {
        setIsSkippingOrders(true);
        const res = await skipOrders(orders);

        if (res.status === 200) {
            enqueueSnackbar(lang.snackbars.success.skippedWeeks, { variant: "success" });
        } else {
            enqueueSnackbar(lang.snackbars.error.skippedWeeks, { variant: "error" });
        }
        setOpenSkipPlanModal(false);
        setIsSkippingOrders(false);
    };

    // END FUNCTIONS MANAGE PLAN

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
        router.push(`${localeRoutes[router.locale][Routes["detalle-del-plan"]]}/${subscriptionId}`);
    };

    const getPendingActionComponent = (data) => {
        switch (data.type) {
            case "choose_recipes":
                return <ChooseRecipesActionBox data={data} lang={lang.chooseRecipesActionBox} />;
            case "rate_recipes":
                return <RateRecipesActionBox lang={lang.rateRecipesActionBox} />;
            case "invite_code":
                return <ReferalActionBox data={data} lang={lang.referalActionBox} />;
            default:
                return <p>unknown action</p>;
        }
    };

    const handleRecoverPlanSubmit = async () => {
        setIsReorderingPlan(true);
        const res = await reorderPlan(selectedPlan.id);

        if (res.status === 200) {
            enqueueSnackbar(lang.snackbars.success.reorderedPlan, { variant: "success" });
            router.push(`${localeRoutes[router.locale][Routes["detalle-del-plan"]]}/${res.data.subscriptionId}`);
        } else {
            enqueueSnackbar(res && res.data && res.data.message ? res.data.message : lang.snackbars.error.unexpected, { variant: "error" });
        }

        setIsReorderingPlan(false);
        handleClosePlanRecoverModal();
    };

    const responsive = {
        superLargeDesktop: {
            breakpoint: {
                max: 3000,
                min: 1280,
            },
            items: 5,
            partialVisibilityGutter: 40,
        },
        desktop: {
            breakpoint: {
                max: 1280,
                min: 960,
            },
            items: 3,
            partialVisibilityGutter: 40,
        },
        tablet: {
            breakpoint: {
                max: 960,
                min: 600,
            },
            items: 2,
            partialVisibilityGutter: 30,
        },
        mobile: {
            breakpoint: {
                max: 600,
                min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
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
                                    <Box
                                        display="flex"
                                        justifyContent={"space-between"}
                                        alignContent={"center"}
                                        flexWrap={"wrap"}
                                        width="100%"
                                    >
                                        <Typography variant="h4" style={{ fontSize: "24px", color: theme.palette.text.black }}>
                                            {lang.greeting} {userInfo.firstName || ""}
                                        </Typography>
                                        <Box>
                                            <TextButton
                                                style={{ marginRight: theme.spacing(2) }}
                                                noColor
                                                icon="time"
                                                btnText={lang.paymentHistoryBtnText}
                                                handleClick={() => router.push(localeRoutes[router.locale][Routes["historial-pagos"]])}
                                            />
                                            <TextButton
                                                style={{ marginRight: theme.spacing(2) }}
                                                icon="settings"
                                                btnText={lang.settingsBtnText}
                                                handleClick={() => router.push(localeRoutes[router.locale][Routes.configuracion])}
                                            />
                                            <TextButton
                                                style={{
                                                    marginRight: !userInfo.wallet ? "initial" : theme.spacing(2),
                                                }}
                                                icon="star"
                                                btnText={lang.rateRecipesBtnText}
                                                handleClick={() =>
                                                    router.push(`${localeRoutes[router.locale][Routes["valorar-recetas"]]}/${userInfo.id}`)
                                                }
                                            />
                                            {userInfo.wallet && (
                                                <TextButton
                                                    style={{
                                                        visibility: isLoading ? "hidden" : "visible",
                                                    }}
                                                    icon="wallet"
                                                    btnText={lang.rateRecipesBtnText}
                                                    handleClick={() =>
                                                        router.push(`${localeRoutes[router.locale][Routes["monedero"]]}/${userInfo.id}`)
                                                    }
                                                />
                                            )}
                                        </Box>
                                    </Box>
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
                                    {isLoading
                                        ? [0, 1, 2].map((item, index) => <PendingActionSkeleton key={index} height={180} />)
                                        : data.pendingActions.map((action, index) => (
                                              <div key={index} style={{ marginRight: theme.spacing(2) }}>
                                                  {getPendingActionComponent(action)}
                                              </div>
                                          ))}
                                </Carousel>
                            </Hidden>
                            {/* Greeting & Pending Actions Desktop */}
                            <Hidden smDown>
                                <Grid container direction="column" alignItems="flex-start" spacing={2}>
                                    <Grid item xs={12} style={{ marginBottom: theme.spacing(3) }}>
                                        <Typography variant="h4" style={{ fontSize: "24px", color: theme.palette.text.black }}>
                                            {lang.greeting} {userInfo.firstName || ""}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Link href={localeRoutes[router.locale][Routes["historial-pagos"]]}>
                                            <a
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    visibility: isLoading ? "hidden" : "visible",
                                                }}
                                            >
                                                <Icon style={{ marginRight: 8 }} onClick={props.handleClick}>
                                                    <Restore />
                                                </Icon>
                                                <Typography variant="button">{lang.paymentHistoryBtnText}</Typography>
                                            </a>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Link href={localeRoutes[router.locale][Routes["configuracion"]]}>
                                            <a
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    visibility: isLoading ? "hidden" : "visible",
                                                }}
                                            >
                                                <Icon style={{ marginRight: 8 }} onClick={props.handleClick}>
                                                    <Settings />
                                                </Icon>
                                                <Typography display="inline" variant="button">
                                                    {lang.settingsBtnText}
                                                </Typography>
                                            </a>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12} style={{ marginBottom: userInfo.wallet ? "initial" : theme.spacing(4) }}>
                                        <Link href={`${localeRoutes[router.locale][Routes["valorar-recetas"]]}/${userInfo.id}`}>
                                            <a
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    visibility: isLoading ? "hidden" : "visible",
                                                }}
                                            >
                                                <Icon style={{ marginRight: 8 }} onClick={props.handleClick}>
                                                    <Star />
                                                </Icon>
                                                <Typography display="inline" variant="button">
                                                    {lang.rateRecipesBtnText}
                                                </Typography>
                                            </a>
                                        </Link>
                                    </Grid>

                                    {userInfo.wallet && (
                                        <Grid item xs={12} style={{ marginBottom: theme.spacing(4) }}>
                                            <Link href={`${localeRoutes[router.locale][Routes["monedero"]]}?customer=${userInfo.id}`}>
                                                <a
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        visibility: isLoading ? "hidden" : "visible",
                                                    }}
                                                >
                                                    <Icon style={{ marginRight: 8 }} onClick={props.handleClick}>
                                                        <AttachMoney />
                                                    </Icon>
                                                    <Typography display="inline" variant="button">
                                                        {lang.walletText}
                                                    </Typography>
                                                </a>
                                            </Link>
                                        </Grid>
                                    )}

                                    {isLoading ? (
                                        <>
                                            <PendingActionSkeleton height={280} />
                                            <PendingActionSkeleton height={280} />
                                            <PendingActionSkeleton height={280} />
                                        </>
                                    ) : (
                                        data.pendingActions.map((action, index) => (
                                            <Grid key={index} item xs={12}>
                                                {getPendingActionComponent(action)}
                                            </Grid>
                                        ))
                                    )}
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
                                <ProfileTitleWithButton
                                    title={lang.myPlansTitle}
                                    btnText={lang.newPlanBtnText}
                                    handleClick={() => router.push(localeRoutes[router.locale][Routes.planes])}
                                />
                            </Grid>
                            <Grid container spacing={2} style={{ marginBottom: theme.spacing(5) }}>
                                {isLoading ? (
                                    <>
                                        <Grid item sm={6} xs={12}>
                                            <PlanProfileCardSkeleton />
                                        </Grid>{" "}
                                        <Grid item sm={6} xs={12}>
                                            <PlanProfileCardSkeleton />
                                        </Grid>
                                    </>
                                ) : data.principalPlanSubscriptions.length > 0 ? (
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
                                                        lang={lang.planProfileCard}
                                                        handleSetSubscriptionId={handleSetSubscriptionId}
                                                        handleClickOpenSkipPlanModal={handleClickOpenSkipPlanModal}
                                                        handleClickOpenChangePlanModal={handleClickOpenChangePlanModal}
                                                    />
                                                </Grid>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <EmptyState
                                        image="/LogoLetsCookR.png"
                                        width={141.4}
                                        height={27.6}
                                        title={lang.plansEmptyStateTitle}
                                        text={
                                            !!props.friendCode
                                                ? `${lang.plansEmptyStateSubtitleFirstPart} ${lang.withCodeEmptyState} ${props.friendCode} ${lang.plansEmptyStateSubtitleSecondPart}`
                                                : `${lang.plansEmptyStateSubtitleFirstPart}`
                                        }
                                    />
                                )}
                            </Grid>
                            {isLoading ? (
                                <>
                                    <Grid
                                        container
                                        justify="space-between"
                                        direction="row"
                                        alignItems="center"
                                        spacing={2}
                                        style={{ marginBottom: theme.spacing(3) }}
                                    >
                                        <ProfileTitleWithButton
                                            title={lang.myAdditionalsTitle}
                                            btnText={lang.additionalsBtnText}
                                            handleClick={() => router.push(localeRoutes[router.locale][Routes.adicionales])}
                                        />
                                    </Grid>

                                    <Grid container spacing={2} style={{ marginBottom: theme.spacing(5) }}>
                                        <Grid item sm={6} xs={12}>
                                            <PlanProfileCardSkeleton />
                                        </Grid>{" "}
                                        <Grid item sm={6} xs={12}>
                                            <PlanProfileCardSkeleton />
                                        </Grid>
                                    </Grid>
                                </>
                            ) : (
                                data.principalPlanSubscriptions.length > 0 && (
                                    <>
                                        <Grid
                                            container
                                            justify="space-between"
                                            direction="row"
                                            alignItems="center"
                                            spacing={2}
                                            style={{ marginBottom: theme.spacing(3) }}
                                        >
                                            <ProfileTitleWithButton
                                                title={lang.myAdditionalsTitle}
                                                btnText={lang.additionalsBtnText}
                                                handleClick={() => router.push(localeRoutes[router.locale][Routes.adicionales])}
                                            />
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
                                                                lang={lang.planProfileCard}
                                                                handleSetSubscriptionId={handleSetSubscriptionId}
                                                                handleClickOpenSkipPlanModal={handleClickOpenSkipPlanModal}
                                                                handleClickOpenChangePlanModal={handleClickOpenChangePlanModal}
                                                            />
                                                        </Grid>
                                                    ))}
                                                </>
                                            ) : (
                                                <EmptyState
                                                    image="/LogoLetsCookR.png"
                                                    width={141.4}
                                                    height={27.6}
                                                    title={lang.additionalsEmptyStateTitle}
                                                    text={lang.additionalsEmptyStateSubtitle}
                                                />
                                            )}
                                        </Grid>
                                    </>
                                )
                            )}
                        </Grid>
                    </Grid>
                </InnerSectionLayout>
            </Layout>
            <PlanRecoverModal
                data={selectedPlan}
                open={openPlanRecoverModal}
                handleClose={handleClosePlanRecoverModal}
                handleSubmit={handleRecoverPlanSubmit}
                lang={lang.planRecoverModal}
                isSubmitting={isReorderingPlan}
            />

            {/* MODALS MANAGE PLAN */}
            {swapPlanData && (
                <SwapPlanModal
                    open={openChangePlanModal}
                    handleClose={handleCloseChangePlanModal}
                    handlePrimaryButtonClick={handlePrimaryButtonClickChangePlanModal}
                    data={swapPlanData}
                    lang={lang.swapPlanModal}
                />
            )}
            {subscription && (
                <SkipPlanModal
                    open={openSkipPlanModal}
                    handleClose={handleCloseSkipPlanModal}
                    handlePrimaryButtonClick={handlePrimaryButtonClickSkipPlanModal}
                    data={subscription.nextTwelveOrders}
                    lang={lang.skipPlanModal}
                    isSubmitting={isSkippingOrders}
                />
            )}
        </>
    );
};

export default Perfil;
