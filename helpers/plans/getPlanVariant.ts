import { Plan, PlanVariant } from "helpers/serverRequests";

export interface PlanVarianResult {
    slug: string;
    id?: string;
    variant?: PlanVariant;
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
    const errors: string[] = [];

    /**
     * Verification of the params for variant selection.
     * */

    const plansBySlug = plans?.find(({ slug: _slug }) => _slug === slug);

    if (plansBySlug) {
        // Find the variant coincident, if the variant in not found so
        // is  selected the first variant into plan.
        variant =
            plansBySlug.variants?.find(
                ({ numberOfPersons, numberOfRecipes }) => numberOfPersons == params.peopleQty && numberOfRecipes == params.recipeQty
            );
        
        if(!variant){
            redirect = {
                destination: `/planes/${slug}?personas=${plansBySlug.variants[0]?.numberOfPersons}&recetas=${plansBySlug.variants[0]?.numberOfRecipes}`,
                permanent: true,
            };
        } 
        id = plansBySlug?.id || '';
    } else {
        // If slug-plan is not found so is selected the first plan for default.
        slug = plans[0]?.slug || "no-plan";
        id = plans[0]?.id || '';
        variant = plans[0]?.variants[0];

        redirect = {
            destination: `/planes/${slug}?personas=${variant?.numberOfPersons || 0}&recetas=${variant?.numberOfRecipes || 0}`,
            permanent: true,
        };

        // If hasn't plans
        // TODO: Move to lang messages
        if (slug === "no-plan") {
            errors.push("Currently no plans have been created.");
        }
    }

    if (!variant) {
        // TODO: Move to lang messages
        errors.push("The current plan hasn't variants.");
    }
    if(!variant?.numberOfPersons || !variant?.numberOfRecipes) {
        // TODO: Move to lang messages
        errors.push("The current variants isn't main plan.");
    }
    return {
        slug,
        id,
        variant,
        redirect,
        errors,
    };
}
