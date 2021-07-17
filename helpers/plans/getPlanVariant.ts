import { Plan, PlanVariant, Recipe } from "helpers/serverRequests";

export interface PlanVarianResult {
    slug: string;
    id?: string;
    variant?: PlanVariant;
    recipes: Recipe[],
    redirect?: {
        destination: string;
        permanent: boolean;
    };
    errors: string[];
}

export function getPlanVariant(params = { slug: undefined, peopleQty: 0, recipeQty: 0 }, plans?: Plan[]): PlanVarianResult {
    let variant: PlanVariant;
    let slug: string = params.slug;
    let id: string;
    let redirect: any;
    let recipes: Recipe[] = [];
    const errors: string[] = [];

    /**
     * Verification of the params for variant selection.
     * */

    const plansBySlug = plans?.find(({ slug: _slug }) => _slug === slug);

    if (plansBySlug) {
        // Find the variant coincident, if the variant in not found so
        // is  selected the first variant into plan.
        variant = plansBySlug.variants?.find(
            ({ numberOfPersons = '', numberOfRecipes = '' }) => numberOfPersons == params.peopleQty && numberOfRecipes == params.recipeQty
        );

        if (!variant) {
            redirect = {
                destination: `/planes/${slug}?personas=${plansBySlug.variants[0]?.numberOfPersons || ''}&recetas=${plansBySlug.variants[0]?.numberOfRecipes || ''}`,
                permanent: true,
            };
            variant = plansBySlug.variants[0];
        }

        id = plansBySlug?.id || '';
        recipes = plansBySlug?.recipes || [];
    }

    if (!plansBySlug) {
        // If slug-plan is not found so is selected the first plan for default.
        id = plans[0]?.id || '';
        slug = plans[0]?.slug || "no-plan";
        variant = plans[0]?.variants[0];
        recipes = plans[0]?.recipes || [];

        redirect = {
            destination: `/planes/${slug}?personas=${variant?.numberOfPersons || 0}&recetas=${variant?.numberOfRecipes || 0}`,
            permanent: true,
        };

        // If hasn't plans
        // TODO: Move to lang messages
        if (slug === "no-plan") {
            errors.push("Currently haven't plans been created.");
        }
    }

    if (!variant) {
        // TODO: Move to lang messages
        errors.push("The current plan hasn't variants.");
    }

    if (!variant?.numberOfPersons || !variant?.numberOfRecipes) {
        // TODO: Move to lang messages
        errors.push(
            "The information for the current variants has #numberPeople# people and #numberRecipes# recipes."
            .replace('#numberPeople#', `${ variant?.numberOfPersons || 0}`)
            .replace('#numberRecipes#', `${ variant?.numberOfRecipes || 0}`)
        );
    }

    if (!recipes.length) {
        // TODO: Move to lang messages
        errors.push("The current plan hasn't recipes for this week.");
    }

    return {
        slug,
        id,
        variant,
        recipes,
        redirect,
        errors,
    };
}
