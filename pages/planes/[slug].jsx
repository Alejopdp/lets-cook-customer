import { useEffect } from "react";
import { useRouter } from "next/router";
import BuyFlowLayout from "../../components/layout/buyFlow";
import { SelectPlanStep, RegisterUserStep, CheckoutStep, RecipeChoiseStep } from "../../components/organisms/buyForm";
import { useBuyFlow } from "../../stores/buyflow";

export const PlanesPage = ({ isLogged, plans, faqs, ...props }) => {
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
            {buyFlow.step === 3 && <RecipeChoiseStep />}
        </BuyFlowLayout>
    );
};

export async function getServerSideProps({ locale, query, previewData, params, ...context }) {
    return {
        props: {
            isLogged: true,
            plans,
            faqs
        },
    };
}

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