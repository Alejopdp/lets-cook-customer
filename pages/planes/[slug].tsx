// Utils & Config
import React, { memo, useEffect, useState } from "react";
import { getPlans, Plan, Recipe, FAQS, getFAQS, PlanVariant, getPlanVariant } from "@helpers";
import { IPaymentMethod, useAuthStore, useBuyFlow, useUserInfoStore } from "@stores";

// Internal components
import { BuyFlowLayout } from "@layouts";
import { SelectPlanStep, RegisterUserStep, CheckoutStep, RecipeChoiseStep } from "@organisms";

export interface PlansErrors {
    plans?: string;
    recipes?: string;
    faqs?: string;
}

export interface PlanUrlParams {
    personQty: string;
    recipeQty: string;
    slug: string;
    id?: any;
}

export interface PlanesPageProps {
    isLogged: boolean;
    plans: Plan[];
    recipes: Recipe[];
    faqs: FAQS[];
    planUrlParams: PlanUrlParams;
    variant: PlanVariant;
    errors?: PlansErrors;
    displayName?: string;
}

const PlanesPage = memo((props: PlanesPageProps) => {
    const step = useBuyFlow(({ step }) => step);
    const userInfo = useUserInfoStore((state) => state.userInfo);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const { setDeliveryInfo, setPaymentMethod, setRegisterState } = useBuyFlow(
        ({ setDeliveryInfo, setPaymentMethod, setRegisterState }) => ({
            setDeliveryInfo,
            setPaymentMethod,
            setRegisterState,
        })
    );

    useEffect(() => {
        setDeliveryInfo({
            addressDetails: userInfo.shippingAddress?.addressDetails,
            addressName: userInfo.shippingAddress?.addressName,
            phone1: userInfo.phone1,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            restrictions: "",
            latitude: userInfo.shippingAddress?.latitude,
            longitude: userInfo.shippingAddress?.longitude,
        });

        if (Array.isArray(userInfo.paymentMethods)) {
            const defaultPaymentMethod: IPaymentMethod | undefined = userInfo.paymentMethods.find((method) => method.isDefault);
            setPaymentMethod({
                id: defaultPaymentMethod?.id || "",
                stripeId: "",
                type: defaultPaymentMethod ? "card" : "",
            });
        }

        if (isAuthenticated) {
            setRegisterState(false);
        }
    }, []);

    const steps = [
        <SelectPlanStep
            initialPlanSettings={props.planUrlParams}
            plans={props.plans}
            variant={props.variant}
            faqs={props.faqs}
            recipes={props.recipes}
        />,
        <RegisterUserStep />,
        <CheckoutStep />,
        <RecipeChoiseStep recipes={props.recipes} />,
    ];

    return <BuyFlowLayout>{steps[step]}</BuyFlowLayout>;
});

export async function getServerSideProps({ locale, query }) {
    const _slug = query.slug || "";
    const mainPlans: Plan[] = [];
    const aditionalsPlans: Plan[] = [];

    const [_plans, _faqs] = await Promise.all([getPlans(locale), getFAQS(locale)]);

    const errors = [_plans.error, _faqs.error].filter((e) => !!e);

    if (errors.length) {
        console.warn("***-> Errors: ", errors);
    }

    _plans.data?.forEach((plan, index) => {
        if (plan.type === "Main" || plan.type === "Principal") {
            mainPlans.push(plan);
        } else {
            aditionalsPlans.push(plan);
        }
    });

    const {
        id,
        slug,
        variant,
        redirect,
        errors: _errors,
        recipes,
    } = getPlanVariant({ slug: _slug, recipeQty: query.recetas, peopleQty: query.personas }, mainPlans);

    const planUrlParams: PlanUrlParams = {
        personQty: `${variant?.numberOfPersons || 0}`,
        recipeQty: `${variant?.numberOfRecipes || 0}`,
        slug,
        id,
    };

    return {
        props: {
            isLogged: true,
            faqs: _faqs.data || [],
            plans: mainPlans,
            aditionalsPlans,
            variant,
            recipes,
            planUrlParams,
            errors: [...errors, ..._errors],
        },
        redirect,
    };
}

export default PlanesPage;
