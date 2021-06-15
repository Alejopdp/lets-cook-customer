// Utils & Config
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getRecipes } from "../../helpers/serverRequests/recipe";
import { useBuyFlow } from "../../stores/buyflow";

// Internal components
import BuyFlowLayout from "../../components/layout/buyFlow";
import { SelectPlanStep, RegisterUserStep, CheckoutStep, RecipeChoiseStep } from "../../components/organisms/buyForm";

export const PlanesPage = ({ isLogged, plans, faqs, recipes, ...props }) => {
    const router = useRouter();
    const buyFlow = useBuyFlow(({ step, showRegister, setRegisterState, forward, form, setBuyFlowData }) => ({
        step,
        showRegister,
        setRegisterState,
        forward,
        form,
        setBuyFlowData,
    }));

    useEffect(() => {
        const { personas: personQty = 1, recetas: recipeQty = 1, slug } = router.query;
        console.log("***-> Properties", personQty, recipeQty, slug);
        console.log('***-> Plans', plans)
    }, []);

    return (
        <BuyFlowLayout>
            {buyFlow.step === 0 && <SelectPlanStep plans={plans} faqs={faqs} />}
            {buyFlow.step === 1 && <RegisterUserStep />}
            {buyFlow.step === 2 && <CheckoutStep />}
            {buyFlow.step === 3 && <RecipeChoiseStep recipes={recipes} />}
        </BuyFlowLayout>
    );
};

export async function getServerSideProps({ locale, query, previewData, params, ...context }) {
    // En la page /recetas, esta llamada se hace con getStaticProps,
    // Como no se puede poner ambas funciones en un mismo archivo, la metí acá
    // Anda igual, pero no sé si será lo ideal
    const res = await getRecipes(locale);

    return {
        props: {
            recipes: res.status === 200 ? res.data : [],
            isLogged: true,
            plans,
            faqs
        },
    };
}

// export async function getStaticProps(context) {
//     const res = await getRecipes(context.locale);

//     return {
//         props: {
//             recipes: res.status === 200 ? res.data : [],
//         },
//     };
// }

export default PlanesPage;

const faqs = [
    {
        question: "Ipsum lorem dolor sit amet sadipscing elitr?",
        answer: "Ipsum lorem dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",

    },
    {
        question: "Ipsum lorem dolor sit amet sadipscing elitr?",
        answer: "Ipsum lorem dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",

    },
    {
        question: "Ipsum lorem dolor sit amet sadipscing elitr?",
        answer: "Ipsum lorem dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",

    },
    {
        question: "Ipsum lorem dolor sit amet sadipscing elitr?",
        answer: "Ipsum lorem dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",

    },
    {
        question: "Ipsum lorem dolor sit amet sadipscing elitr?",
        answer: "Ipsum lorem dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",

    },
]

const plans = [
    {
        name: "Plan Familiar",
        description: "Plan Familiar lorem ipsum dolor sit amet",
        icon: "/icons/plans/plan-familiar.svg",
        checkedIcon: "/icons/plans/plan-familiar-color.svg",
        slug: "plan-familiar",
    },
    {
        name: "Plan Gourmet",
        description: "Plan Gourmet lorem ipsum dolor sit amet",
        icon: "/icons/plans/plan-gourmet.svg",
        checkedIcon: "/icons/plans/plan-gourmet-color.svg",
        slug: "plan-gourmet",
    },
    {
        name: "Plan Ahorro",
        description: "Plan Ahorro lorem ipsum dolor sit amet",
        icon: "/icons/plans/plan-ahorro.svg",
        checkedIcon: "/icons/plans/plan-ahorro-color.svg",
        slug: "plan-ahorro",
    },
    {
        name: "Plan Vegetariano",
        description: "Plan Vegetariano lorem ipsum dolor sit amet",
        icon: "/icons/plans/plan-vegetariano.svg",
        checkedIcon: "/icons/plans/plan-vegetariano-color.svg",
        slug: "plan-vegetariano",
    },
    {
        name: "Plan Vegano",
        description: "Plan Vegano lorem ipsum dolor sit amet",
        icon: "/icons/plans/plan-vegano.svg",
        checkedIcon: "/icons/plans/plan-vegano-color.svg",
        slug: "plan-vegano",
    },
    {
        name: "Plan X",
        description: "Plan X lorem ipsum dolor sit amet",
        icon: "/icons/plans/plan-familiar.svg",
        checkedIcon: "/icons/plans/plan-familiar-color.svg",
        slug: "plan-x",
    },
]