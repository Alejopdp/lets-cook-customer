// Utils & Config
import React, { memo, useState } from "react";
import { getPlans, getRecipes, Plan, Recipe, FAQS, getFAQS } from "@helpers";
import { useBuyFlow } from "@stores";
import { useStripe, useElements, CardNumberElement } from "@stripe/react-stripe-js";
import {createSubscription} from "../../helpers/serverRequests/subscription"
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
};

export interface PlanesPageProps {
    isLogged: boolean;
    plans: Plan[];
    recipes: Recipe[];
    faqs: FAQS[];
    planUrlParams: PlanUrlParams;
    errors?: PlansErrors;
}

const PlanesPage = (props: PlanesPageProps) => {
    const step = useBuyFlow(({ step }) => step);
    const stripe = useStripe();
    const elements = useElements();
    const [isLoadingPayment, setisLoadingPayment] = useState(false)
    const {enqueueSnackbar} = useSnackbar()

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
                customerId: "f031ca8c-647e-4d0b-8afc-28e982068fd5", // Get customer id from zustand
                planId: "a01f9820-adfa-41ee-823c-858c16c64a6b",
                planVariantId: "ba3c8fbe-c7c3-491d-9819-a8625f645356",
                planFrequency: "Semanal",
                restrictionComment: "No puedo comer alimentos con lactosa", // Add restriction comment
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
    return (
        <BuyFlowLayout>
            {step === 0 && <SelectPlanStep initialPlanSettins={props.planUrlParams} plans={props.plans} faqs={props.faqs} />}
            {step === 1 && <RegisterUserStep />}
            {step === 2 && <CheckoutStep handleSubmitPayment={handleSubmitPayment}/>}
            {step === 3 && <RecipeChoiseStep recipes={props.recipes} />}
        </BuyFlowLayout>
    );
};

export async function getServerSideProps({ locale, query, params }) {

    let redirect = undefined;
    let slug = query.slug || '';
    const personQty = query.personas || '2';
    const recipeQty = query.recetas || '3';

    const [_plans, _recipes, _faqs] = await Promise.all([
        getPlans(locale),
        getRecipes(locale),
        getFAQS(locale)
    ])

    const errors = [
        _plans.error,
        _recipes.error,
        _faqs.error
    ].filter(e => !!e)

    const isSlugvalid = _plans.data?.some(({ slug: _slug }) => _slug === slug);

    if (!isSlugvalid && Array.isArray(_plans.data)) {
        slug = _plans.data[0]?.slug; // TODO: What happen when is undefined??
        redirect = {
            destination: `/planes/${slug}?personas=${personQty}&recetas=${recipeQty}`,
            permanent: true,
        }
    } else {
         // TODO: What happen with slug when no have plans??
    }

    const planUrlParams: PlanUrlParams = {
        personQty,
        recipeQty,
        slug
    }

    return {
        props: {
            isLogged: true,
            plans: _plans.data || [],
            recipes: _recipes.data || [],
            faqs: _faqs.data || [],
            planUrlParams,
            errors
        },
        redirect
    };
}

export default memo(PlanesPage);
