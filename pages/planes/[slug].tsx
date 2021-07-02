// Utils & Config
import React, { memo } from "react";
import { getPlans, getRecipes, Plan, Recipe, FAQS, getFAQS } from "@helpers";
import { useBuyFlow } from "@stores";

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
    return (
        <BuyFlowLayout>
            {step === 0 && <SelectPlanStep initialPlanSettins={props.planUrlParams} plans={props.plans} faqs={props.faqs} />}
            {step === 1 && <RegisterUserStep />}
            {step === 2 && <CheckoutStep />}
            {step === 3 && <RecipeChoiseStep recipes={props.recipes}  />}
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
