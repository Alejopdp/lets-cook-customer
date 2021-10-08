import { getLang } from "@hooks";
import { Plan, Recipe } from "helpers/serverRequests";
import { PlanVariant } from "types/planVariant";

export interface PlanVarianResult {
    slug: string;
    id?: string;
    variant?: PlanVariant;
    recipes: Recipe[];
    redirect?: {
        destination: string;
        permanent: boolean;
    };
    errors: string[];
    planImageUrl?: string;
    iconLinealWithColorUrl?: string;
}

export function getPlanVariant(params = { slug: undefined, peopleQty: 0, recipeQty: 0 }, plans?: Plan[], locale = "es"): PlanVarianResult {
    let variant: PlanVariant;
    let slug: string = params.slug;
    let id: string;
    let redirect: any;
    let planImageUrl: string = "";
    let iconLinealWithColorUrl: string = "";

    let recipes: Recipe[] = [];
    const errors: string[] = [];
    const [lang] = getLang("getPlansVarians", locale);

    /**
     * Verification of the params for variant selection.
     * */

    const slugPlan = plans?.find(({ slug: _slug }) => _slug === slug);

    if (!!slugPlan && !!params.peopleQty && !!params.recipeQty) {
        // Find the variant coincident, if the variant in not found so
        // is  selected the first variant into plan.
        variant = slugPlan.variants?.find(
            ({ numberOfPersons = "", numberOfRecipes = "" }) => numberOfPersons == params.peopleQty && numberOfRecipes == params.recipeQty
        );

        if (!variant) {
            variant = slugPlan.variants.find((v) => v.isDefault);
            redirect = {
                destination: `/planes/${slug}?personas=${variant?.numberOfPersons || slugPlan.variants[0]?.numberOfPersons || ""}&recetas=${
                    variant?.numberOfRecipes || slugPlan.variants[0]?.numberOfRecipes || ""
                }`,
                permanent: true,
            };
            variant = slugPlan.variants[0];
        }

        id = slugPlan?.id || "";
        recipes = slugPlan?.recipes || [];
        planImageUrl = slugPlan?.imageUrl || "";
        iconLinealWithColorUrl = slugPlan?.iconWithColor || "";
    }

    if (!slugPlan) {
        // If slug-plan is not found so is selected the first plan for default.
        id = plans[0]?.id || "";
        slug = plans[0]?.slug || "no-plan";
        variant = plans[0]?.variants.find((variant) => variant.isDefault) || plans[0]?.variants[0];
        recipes = plans[0]?.recipes || [];
        planImageUrl = plans[0]?.imageUrl || "";
        iconLinealWithColorUrl = plans[0]?.iconWithColor || "";

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

        variant = slugPlan.variants.find((variant) => variant.isDefault) || slugPlan.variants[0];

        redirect = {
            destination: `/planes/${slug}?personas=${variant?.numberOfPersons || 0}&recetas=${variant?.numberOfRecipes || 0}`,
            permanent: true,
        };

        if (!variant) errors.push("The current plan hasn't variants.");
    }

    if (!!!variant?.numberOfPersons || !!!variant?.numberOfRecipes) {
        console.log("No hay persons o recetas");
        // TODO: Move to lang messages
        errors.push(
            "The information for the current variants has #numberPeople# people and #numberRecipes# recipes."
                .replace("#numberPeople#", `${variant?.numberOfPersons || 0}`)
                .replace("#numberRecipes#", `${variant?.numberOfRecipes || 0}`)
        );
    }

    if (!recipes.length) {
        // TODO: Move to lang messages
        errors.push(lang.error);
    }

    return {
        slug,
        id,
        variant,
        recipes,
        redirect,
        errors,
        planImageUrl,
        iconLinealWithColorUrl,
    };
}

export function getPlanVariantWithAttributes(
    selectedAttributes: { [key: string]: string },
    planVariants: PlanVariant[]
): PlanVariant | undefined {
    const variant: PlanVariant | undefined = planVariants?.find(
        ({ numberOfPersons = "", numberOfRecipes = "", attributes = [] }) =>
            (!!!numberOfPersons || numberOfPersons === selectedAttributes["Personas"]) &&
            (!!!numberOfRecipes || numberOfRecipes === selectedAttributes["Recetas"]) &&
            attributes.every(
                (attr: [string, string]) => attr[0] === "Personas" || attr[0] === "Recetas" || selectedAttributes[attr[0]] === attr[1]
            )
    );

    return variant;
}
