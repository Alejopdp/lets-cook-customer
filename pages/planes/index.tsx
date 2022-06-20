// Utils & Config
import React, { memo, useEffect, useMemo, useState } from "react";
import { getPlans, Plan, Recipe, PlanVariant, getPlanVariant } from "@helpers";
import { BuyFlowInitialStore, IPaymentMethod, useAuthStore, useBuyFlow, useUserInfoStore } from "@stores";
import { useRouter } from "next/router";

// External components

// Internal components
import { BuyFlowLayout, Layout } from "@layouts";
import LoggedInNavbar from "../../components/layout/default/loggedInNavbarContent";
import { SelectPlanStep, RegisterUserStep, CheckoutStep, RecipeChoiseStep } from "@organisms";
import CrossSellingStep from "components/organisms/buyForm/crossSellingStep";
import { Box } from "@material-ui/core";
import { localeRoutes, Routes } from "lang/routes/routes";

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
    const step = useBuyFlow(({ step }) => step);
    const userInfo = useUserInfoStore((state) => state.userInfo);
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

    useEffect(() => {
        const initialize = async () => {
            const [_plans] = await Promise.all([getPlans(router.locale)]);
            const mainPlans: Plan[] = [];
            const aditionalsPlans: Plan[] = [];

            const errors = [_plans.error].filter((e) => !!e);

            if (errors.length) {
                console.warn("***-> Errors: ", errors);
            }

            _plans.data?.plans.forEach((plan, index) => {
                if (plan.type === "Main" || plan.type === "Principal") {
                    mainPlans.push(plan);
                } else {
                    aditionalsPlans.push(plan);
                }
            });
            const _slug = router.query.planSlug || mainPlans.find((plan) => plan.isDefaultAtCheckout)?.slug || "";

            const planVariantData = getPlanVariant(
                { slug: _slug, recipeQty: router.query.recetas || 0, peopleQty: router.query.personas || 0 },
                mainPlans
            );

            if (planVariantData.redirect && !!planVariantData.redirect.destination)
                router.replace(`${localeRoutes[router.locale][Routes["planes"]]}/${planVariantData.redirect.destination}`);

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

    // const steps = useMemo(
    //     () => [
    //         <SelectPlanStep
    //             initialPlanSettings={props.planUrlParams}
    //             plans={props.plans}
    //             variant={props.variant}
    //             recipes={props.recipes}
    //         />,
    //         <RegisterUserStep />,
    //         <CheckoutStep />,
    //         <RecipeChoiseStep recipes={props.recipes} />,
    //         <CrossSellingStep />,
    //     ],
    //     []
    // );

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
        <BuyFlowLayout isInitializing={isInitializing}>{steps[step]}</BuyFlowLayout>
    );
});

export default PlanesPage;
