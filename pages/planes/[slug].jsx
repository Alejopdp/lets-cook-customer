import { useEffect } from "react";
import { useRouter } from "next/router";
import BuyFlowLayout from "../../components/layout/buyFlow";
import { SelectPlanStep, RegisterUserStep, CheckoutStep, RecipeChoiseStep } from "../../components/organisms/buyForm";
import { useBuyFlow } from "../../stores/buyflow";
export const PlanesPage = ({ isLogged, ...props }) => {
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
    }, []);

    return (
        <BuyFlowLayout>
            {buyFlow.step === 0 && <SelectPlanStep />}
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
        },
    };
}

export default PlanesPage;
