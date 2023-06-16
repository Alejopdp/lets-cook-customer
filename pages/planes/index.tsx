// Utils & Config
import React, { memo, useEffect, useState } from "react";
import { getPlans, Plan, Recipe, PlanVariant, getPlanVariant } from "@helpers";
import { BuyFlowInitialStore, IPaymentMethod, Recipes, useAuthStore, useBuyFlow, useUserInfoStore } from "@stores";
import { useRouter } from "next/router";

// External components

// Internal components
import { BuyFlowLayout } from "@layouts";
import LoggedInNavbar from "../../components/layout/default/loggedInNavbarContent";
import { SelectPlanStep, RegisterUserStep, CheckoutStep, RecipeChoiseStep } from "@organisms";
import CrossSellingStep from "components/organisms/buyForm/crossSellingStep";
import { Box, CircularProgress } from "@material-ui/core";
import { useAuth } from "contexts/auth.context";
import { Routes, localeRoutes } from "lang/routes/routes";

export interface PlansErrors {
    plans?: string;
    recipes?: string;
}

export interface PlanUrlParams {
    personQty: string;
    recipeQty: string;
    slug: string;
    id?: any;
    planImageUrl?: string;
    iconLinealWithColorUrl?: string;
}

export interface PlanesPageProps {
    isLogged: boolean;
    plans: Plan[];
    recipes: Recipe[];
    planUrlParams: PlanUrlParams;
    weekLabel: string;
    variant: PlanVariant;
    errors?: PlansErrors;
    displayName?: string;
}

const PlanesPage = memo((props: PlanesPageProps) => {
    const router = useRouter();
    const {step, moveNSteps,selectPlanRecipes,setPlanCode, setPlanVariant} = useBuyFlow(({ step, moveNSteps,selectPlanRecipes,setPlanCode, setPlanVariant   }) => {return {step, moveNSteps,selectPlanRecipes,setPlanCode, setPlanVariant}});
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const {isCheckingRedirect, handleLoginRedirect, setIsCheckingRedirect} = useAuth()
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const { setDeliveryInfo, setPaymentMethod, setShowRegister, setWeekLabel, setCoupon, resetBuyFlowState } = useBuyFlow(
        ({ setDeliveryInfo, setPaymentMethod, setShowRegister, setWeekLabel, setCoupon, resetBuyFlowState }) => ({
            setDeliveryInfo,
            setPaymentMethod,
            setShowRegister,
            setWeekLabel,
            setCoupon,
            resetBuyFlowState,
        })
    );
    const [isInitializing, setisInitializing] = useState(true);
    const [data, setData] = useState({
        isLogged: true,
        plans: [],
        aditionalsPlans: [],
        weekLabel: "",
        variant: {},
        recipes: [],
        planUrlParams: {},
        errors: [],
        redirect: {},
    });

    const getPlanData = (): { peopleLabels: string; planName: string; planDescription: string; canChooseRecipes: boolean; planRecipes: Recipes[] } => {
        const planSelect = data.plans.find((plan) => plan.slug === data.planUrlParams.slug);

        const peopleLabels = planSelect.variants?.reduce((_planSize, _variant) => {
            const valueIsIncluded = (_planSize[_variant.numberOfPersons] || []).includes(_variant.numberOfRecipes);

            if (valueIsIncluded || !_variant?.numberOfPersons) {
                return _planSize;
            }

            _planSize[_variant.numberOfPersons] = [...(_planSize[_variant.numberOfPersons] || []), _variant.numberOfRecipes];
            return _planSize;
        }, {});

        return {
            peopleLabels,
            planName: planSelect.name,
            planDescription: planSelect.description,
            canChooseRecipes: planSelect.abilityToChooseRecipes,
            planRecipes: planSelect.recipes,
        };
    };

    const initializePlanWithParams = () => {
        const { peopleLabels, planName, planDescription, canChooseRecipes, planRecipes } = getPlanData();
        selectPlanRecipes(planRecipes);
        setPlanCode(
            data.planUrlParams.id,
            data.planUrlParams.planSlug,
            planName,
            planDescription,
            canChooseRecipes,
            data.planUrlParams.planImageUrl,
            data.planUrlParams.iconLinealWithColorUrl
        );
        setPlanVariant(data.variant);
    }

    useEffect(() => {
        const initialize = async () => {
            const [_plans] = await Promise.all([getPlans(router.locale)]);
            const mainPlans: Plan[] = [];
            const aditionalsPlans: Plan[] = [];

            const errors = [_plans.error].filter((e) => !!e);

            _plans.data?.plans.forEach((plan) => {
                if (plan.type === "Main" || plan.type === "Principal") {
                    mainPlans.push(plan);
                } else {
                    aditionalsPlans.push(plan);
                }
            });
            const searchParams = new URL(window.location.href).searchParams
            const slug = searchParams.get('planSlug') || mainPlans.find((plan) => plan.isDefaultAtCheckout)?.slug || "";
            const planVariantData = getPlanVariant(
                { slug, recipeQty: searchParams.get("recetas") || 0, peopleQty: searchParams.get("personas") || 0 },
                mainPlans
            );
            
            if (!window.location.href.includes("planSlug") && planVariantData.redirect && !!planVariantData.redirect.destination) {
                const searchParams = new URLSearchParams(planVariantData.redirect.destination)
                const query = Object.fromEntries(searchParams.entries());
                router.replace({pathname: localeRoutes[router.locale][Routes.planes], query});
            }

            setWeekLabel(_plans.data.weekLabel);
            const planUrlParams: PlanUrlParams = {
                personQty: `${planVariantData.variant?.numberOfPersons || 0}`,
                recipeQty: `${planVariantData.variant?.numberOfRecipes || 0}`,
                slug: planVariantData.slug,
                id: planVariantData.id,
                planImageUrl: planVariantData.planImageUrl,
                iconLinealWithColorUrl: planVariantData.iconLinealWithColorUrl,
            };
            setData({
                aditionalsPlans,
                errors: [...errors, planVariantData.errors],
                isLogged: true,
                planUrlParams,
                plans: mainPlans,
                recipes: planVariantData.recipes,
                redirect: planVariantData.redirect,
                variant: planVariantData.variant,
                weekLabel: _plans.data.weekLabel,
            });
            setisInitializing(false);
        };

        if (Array.isArray(userInfo.paymentMethods)) {
            const defaultPaymentMethod: IPaymentMethod | undefined = userInfo.paymentMethods.find((method) => method.isDefault);
            setPaymentMethod({
                id: defaultPaymentMethod?.id || "",
                stripeId: "",
                type: defaultPaymentMethod ? "card" : "newPaymentMethod",
            });
        }

        initialize();
        return () => {
            resetBuyFlowState();
            setCoupon({ ...BuyFlowInitialStore.form.coupon });
        };
    }, []);

    useEffect(() => {
        console.log("SAFARI - Is authenticated?: ", isAuthenticated)
        console.log("SAFARI - data plans: ", data.plans)
        if (!isAuthenticated && data.plans.length > 0) {
            handleLoginRedirect(window.location.href, () => {
                initializePlanWithParams()
                moveNSteps(2)
            })
        }

        if (isAuthenticated) setIsCheckingRedirect(false)

    }, [data.plans])

    useEffect(() => {
        setDeliveryInfo({
            addressDetails: userInfo.shippingAddress?.addressDetails || userInfo.shippingAddress?.addressDetails,
            addressName: userInfo.shippingAddress?.addressName || userInfo.shippingAddress?.addressName,
            phone1: userInfo.phone1,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            restrictions: "",
            latitude: userInfo.shippingAddress?.latitude,
            longitude: userInfo.shippingAddress?.longitude,
        });
    }, [
        setDeliveryInfo,
        userInfo.firstName,
        userInfo.lastName,
        userInfo.phone1,
        userInfo.shippingAddress?.addressDetails,
        userInfo.shippingAddress?.addressName,
        userInfo.shippingAddress?.latitude,
        userInfo.shippingAddress?.longitude,
    ]);

    useEffect(() => {
        if (isAuthenticated) {
            setShowRegister(false);
        }
    }, [isAuthenticated]);

    const steps = [
        <SelectPlanStep initialPlanSettings={data.planUrlParams} plans={data.plans} variant={data.variant} recipes={data.recipes} />,
        <RegisterUserStep />,
        <CheckoutStep />,
        <RecipeChoiseStep recipes={data.recipes} />,
        <CrossSellingStep />,
    ];

    return step === steps.length - 1 ? (
        <Box paddingY={4}>
            <LoggedInNavbar toggleOpeningDrawer={() => ""} />
            <CrossSellingStep />
        </Box>
    ) : (
        <BuyFlowLayout isInitializing={isInitializing}>{isCheckingRedirect ? <Box position={"fixed"} top={"50%"} left={"50%"}><CircularProgress /></Box> : steps[step]}</BuyFlowLayout>
    );
});

export default PlanesPage;
