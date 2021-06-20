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
        console.log("***-> Plans", plans);
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
    // const res = await getRecipes(locale);
    // console.log("Recipes: ", res);

    return {
        props: {
            isLogged: true,
            recipes: _recipes, //res.status === 200 ? res.data : [],
            plans: _plans,
            faqs: _faqs,
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

const _faqs = [
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
];

const _plans = [
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
];

const _recipes = Array(3)
    .fill({
        id: "3003d63c-68ee-4be4-82f6-20a5241afd6f",
        imageUrl: "https://cdn.shopify.com/s/files/1/0196/4330/1988/products/perfil1_26_1024x1024@2x.jpg",
        imageTags: ["Mas vendida"],
        name: "Arepas ",
        shortDescription:
            "Lorem ipsum dolor sit amet, conetur meand las ipscing elitr, sed diam nonumy eir tempor invidunt uorem ipsum dolor sit amet aswim",
        cookDuration: "50 min",
        difficultyLevel: "Alta",
        variantOptions: ["Opción sin gluten", "Opción sin lactosa"],
        longDescription:
            "Lorem ipsum dolor sit amet, conetur meand ipscing elitr, sed diam nonumy eir tempor invidunt uLorem ipsum dolor sit amet ipsum dolor sit amet, conetur meand ipscing elitr, sed diam nonumy eir tempor invidunt uLorem ipsum dolor sit amet aswim",
        recipeVariants: [
            { name: 'Opción principal', ingredients: ["Pan", "Tomate", "Lechuga", "Queso", "Carne"] },
            { name: 'Opción sin glúten', ingredients: ["Tomate", "Lechuga",] },
            { name: 'Opción sin lactosa', ingredients: ["Pan", "Lechuga", "Carne"] }
        ],
        recipeVariants: [
            ["Opción principal", "Opción sin glúten", "Opción sin lactosa"],
            ["Pan, Tomate, Lechuga, Queso, Carne", "Tomate, Lechuga", "Pan, Lechuga, Carne"],
        ],
        tools: "Bol, Tenedor, Cuchillo",
        nutritionalInformation: [
            { key: "Valor energético", value: "114,8 kcal" },
            { key: "Grasas", value: "2,2 g" },
            { key: "- de las cuales saturadas", value: "1,1 g" },
            { key: "Hidratos de carbono", value: "18 g" },
            { key: "- de los cuales azúcares", value: "1,8 g" },
            { key: "Proteínas", value: "4,4 g" },
            { key: "Sal", value: "0,8 g" },
        ],
    })
    .map((recipe, index) => ({
        ...recipe,
        id: index,
        name: recipe.name + " " + index,
    }));
