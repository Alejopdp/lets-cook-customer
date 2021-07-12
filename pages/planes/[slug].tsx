// Utils & Config
import React, { memo, useEffect, useState } from "react";
import { getPlans, getRecipes, Plan, Recipe, FAQS, getFAQS, PlanVariant, getPlanVariant, getDemoPlans } from "@helpers";
import { useBuyFlow, useUserInfoStore } from "@stores";
import { useStripe, useElements, CardNumberElement } from "@stripe/react-stripe-js";
import { createSubscription } from "../../helpers/serverRequests/subscription"
import { useSnackbar } from "notistack";

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
};

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
    const stripe = useStripe();
    const elements = useElements();
    const [isLoadingPayment, setisLoadingPayment] = useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const userInfo = useUserInfoStore(state => state.userInfo)
    const buyForm = useBuyFlow(({form}) => form )
    const {setDeliveryInfo, setPaymentMetods} = useBuyFlow(({setDeliveryInfo, setPaymentMetods}) => ({setDeliveryInfo, setPaymentMetods}))

    useEffect(() => {
        setDeliveryInfo({
            addressDetails: userInfo.shippingAddress?.addressDetails,
            addressName: userInfo.shippingAddress?.addressName,
            phone1: userInfo.phone1,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            restrictions: "",
        })

        setPaymentMetods(userInfo.paymentMethods)
    }, [])
    
    const handleStripePaymentMethod = async () => {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement),
        });

        return { error, paymentMethod };
    };

    const handleSubmitPayment = async () => {
        setisLoadingPayment(true);
        // TO DO: Send if it is a new payment method
        const paymentMethodRes = await handleStripePaymentMethod();

        if (!paymentMethodRes.error) {
            const data = {
                customerId: userInfo.id || "f031ca8c-647e-4d0b-8afc-28e982068fd5", // Get customer id from zustand
                planId: "a01f9820-adfa-41ee-823c-858c16c64a6b",
                planVariantId: "ba3c8fbe-c7c3-491d-9819-a8625f645356",
                planFrequency: "Semanal",
                restrictionComment: buyForm.deliveryForm.restrictions || "No puedo comer alimentos con lactosa", // Add restriction comment
                couponId: "",
                stripePaymentMethodId: paymentMethodRes.paymentMethod.id, // Add if it is a new payment method
                paymentMethod: "", // Add if customer uses an already saved payment method
            };

            const res = await createSubscription(data);

            if (res.status === 200) {
                if (res.data.payment_status === "requires_action") {
                    await stripe.confirmCardPayment(res.data.client_secret, {
                        payment_method: paymentMethodRes.paymentMethod.id,
                    });
                }
                enqueueSnackbar("Suscripción creada con éxito", { variant: "success" });

            } else {
                enqueueSnackbar(res.data.message, { variant: "error" });
            }
        } else {
            enqueueSnackbar(paymentMethodRes.error.message, { variant: "error" });
        }
        setisLoadingPayment(false);
    };

    const steps = [
        <SelectPlanStep
            initialPlanSettings={props.planUrlParams}
            plans={props.plans}
            variant={props.variant}
            faqs={props.faqs}
            recipes={props.recipes}
        />,
        <RegisterUserStep />,
        <CheckoutStep
            handleSubmitPayment={handleSubmitPayment}
        />,
        <RecipeChoiseStep recipes={props.recipes} />
    ];

    return (
        <BuyFlowLayout>
            {steps[step]}
        </BuyFlowLayout>
    );
});

export async function getServerSideProps({ locale, query }) {

    const _slug = query.slug || '';
    const mainPlans: Plan[] = [];
    const aditionalsPlans: Plan[] = [];

    const [_plans, _faqs] = await Promise.all([
        getPlans(locale),
        getFAQS(locale)
    ]);

    const errors = [
        _plans.error,
        _faqs.error
    ].filter(e => !!e);

    if (errors.length) {
        console.warn('***-> Errors: ', errors);
    }

    _plans.data?.forEach((plan, index) => {
        if (plan.type === 'Main' || plan.type === 'Principal') {
            mainPlans.push(plan);
        } else {
            aditionalsPlans.push(plan)
        }
    });

    const { id, slug, variant, redirect, errors: _errors, recipes } = getPlanVariant({ slug: _slug, recipeQty: query.recetas, peopleQty: query.personas }, mainPlans);

    const planUrlParams: PlanUrlParams = {
        personQty: `${variant?.numberOfPersons || 0}`,
        recipeQty: `${variant?.numberOfRecipes || 0}`,
        slug,
        id
    }

    return {
        props: {
            isLogged: true,
            faqs: _faqs.data || [],
            plans: mainPlans,
            aditionalsPlans,
            variant,
            recipes,
            planUrlParams,
            errors: [...errors, ..._errors]
        },
        redirect
    };
}

export default PlanesPage;
