// Utils & Config
import React, { useState, useEffect, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import { useRouter } from "next/router";
// const langs = require("../../lang").comoFunciona;

// External Components
import Grid from "@material-ui/core/Grid";

// Internal components
import PlanCard from "./planCard/index";
import ShippingAddressCard from "./ShippingAddressCard/index";
import PaymentMethodCard from "./paymentMethodCard/index";
import CalendarCard from "./calendarCard/index";
import RecipesActualWeekCard from "./recipesActualWeekCard/index";
import RecipesNextWeekCard from "./recipesNextWeekCard/index";
import TextButton from "../../atoms/textButton/textButton";
import RecipeModal from "../../molecules/recipeModal/recipeModal";
import ChangePlanModal from "../../molecules/managePlanModals/changePlanModal";

const useStyles = makeStyles((theme) => ({}));

const PlanDetails = (props) => {
    const data = {
        plan: {
            name: "Plan Familiar",
            icon: "/assets/plan-test-color.svg",
            status: { value: "active", text: "activo" },
            variantInfo: "4 recetas para 3 personas por semana",
            variantExtraInfo: "12 raciones a 3 € por ración",
            priceText: "Valor total: 36 €/semana",
        },
        shippingAddress: {
            address: "Calle Ing Fausto Elio 42, 46001, Valencia",
            floor: "Piso 2, Puerta 10",
            preferredSchedule: "Sin indicar",
        },
        paymentMethod: {
            cardInfo: "Visa terminada en 0123",
            cardExpiration: "Expira el 10/25",
        },
        calendar: {
            nextShippingDate: "Martes 12 de Junio",
            nextChargeDate: "Sábado 9 de Junio",
            skipWeeks: "",
        },
        abilityToChooseRecipes: true,
        hasRecipesActualWeek: true,
        hasRecipesNextWeek: true,
        recipesActualWeek: [
            {
                id: "3003d63c-68ee-4be4-82f6-20a5241afd6f",
                imageUrl: "https://cdn.shopify.com/s/files/1/0196/4330/1988/products/perfil1_26_1024x1024@2x.jpg",
                imageTags: ["Mas vendida"],
                name: "Arepas de Crhistian",
                shortDescription:
                    "Lorem ipsum dolor sit amet, conetur meand las ipscing elitr, sed diam nonumy eir tempor invidunt uorem ipsum dolor sit amet aswim",
                cookDuration: "50 min",
                difficultyLevel: "Alta",
                variantOptions: ["Opción sin gluten", "Opción sin lactosa"],
                longDescription:
                    "Lorem ipsum dolor sit amet, conetur meand ipscing elitr, sed diam nonumy eir tempor invidunt uLorem ipsum dolor sit amet ipsum dolor sit amet, conetur meand ipscing elitr, sed diam nonumy eir tempor invidunt uLorem ipsum dolor sit amet aswim",
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
            },
            {
                id: "4003d63c-68ee-4be4-82f6-20a5241afd6f",
                imageUrl: "https://cdn.shopify.com/s/files/1/0196/4330/1988/products/perfil1_26_1024x1024@2x.jpg",
                imageTags: ["Mas vendida"],
                name: "Arepas de Alejo",
                shortDescription:
                    "Lorem ipsum dolor sit amet, conetur meand las ipscing elitr, sed diam nonumy eir tempor invidunt uorem ipsum dolor sit amet aswim",
                cookDuration: "50 min",
                difficultyLevel: "Alta",
                variantOptions: ["Opción sin gluten", "Opción sin lactosa"],
                longDescription:
                    "Lorem ipsum dolor sit amet, conetur meand ipscing elitr, sed diam nonumy eir tempor invidunt uLorem ipsum dolor sit amet ipsum dolor sit amet, conetur meand ipscing elitr, sed diam nonumy eir tempor invidunt uLorem ipsum dolor sit amet aswim",
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
            },
            {
                id: "5003d63c-68ee-4be4-82f6-20a5241afd6f",
                imageUrl: "https://cdn.shopify.com/s/files/1/0196/4330/1988/products/perfil1_26_1024x1024@2x.jpg",
                imageTags: ["Mas vendida"],
                name: "Arepas de Mabel",
                shortDescription:
                    "Lorem ipsum dolor sit amet, conetur meand las ipscing elitr, sed diam nonumy eir tempor invidunt uorem ipsum dolor sit amet aswim",
                cookDuration: "50 min",
                difficultyLevel: "Alta",
                variantOptions: ["Opción sin gluten", "Opción sin lactosa"],
                longDescription:
                    "Lorem ipsum dolor sit amet, conetur meand ipscing elitr, sed diam nonumy eir tempor invidunt uLorem ipsum dolor sit amet ipsum dolor sit amet, conetur meand ipscing elitr, sed diam nonumy eir tempor invidunt uLorem ipsum dolor sit amet aswim",
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
            },
        ],
        recipesNextWeek: [
            // {
            //     id: "7003d63c-68ee-4be4-82f6-20a5241afd6f",
            //     imageUrl: "https://cdn.shopify.com/s/files/1/0196/4330/1988/products/perfil1_26_1024x1024@2x.jpg",
            //     imageTags: ["Mas vendida"],
            //     name: "Tostones de Tomás",
            //     shortDescription: "Lorem ipsum dolor sit amet, conetur meand las ipscing elitr, sed diam nonumy eir tempor invidunt uorem ipsum dolor sit amet aswim",
            //     cookDuration: "50 min",
            //     difficultyLevel: "Alta",
            //     variantOptions: ['Opción sin gluten', 'Opción sin lactosa'],
            //     longDescription: "Lorem ipsum dolor sit amet, conetur meand ipscing elitr, sed diam nonumy eir tempor invidunt uLorem ipsum dolor sit amet ipsum dolor sit amet, conetur meand ipscing elitr, sed diam nonumy eir tempor invidunt uLorem ipsum dolor sit amet aswim",
            //     recipeVariants: [
            //         ['Opción principal', 'Opción sin glúten', 'Opción sin lactosa'],
            //         ['Pan, Tomate, Lechuga, Queso, Carne', 'Tomate, Lechuga', 'Pan, Lechuga, Carne']
            //     ],
            //     tools: 'Bol, Tenedor, Cuchillo',
            //     nutritionalInformation: [
            //         { key: 'Valor energético', value: '114,8 kcal' },
            //         { key: 'Grasas', value: '2,2 g' },
            //         { key: '- de las cuales saturadas', value: '1,1 g' },
            //         { key: 'Hidratos de carbono', value: '18 g' },
            //         { key: '- de los cuales azúcares', value: '1,8 g' },
            //         { key: 'Proteínas', value: '4,4 g' },
            //         { key: 'Sal', value: '0,8 g' },
            //     ]
            // },
            // {
            //     id: "8003d63c-68ee-4be4-82f6-20a5241afd6f",
            //     imageUrl: "https://cdn.shopify.com/s/files/1/0196/4330/1988/products/perfil1_26_1024x1024@2x.jpg",
            //     imageTags: ["Mas vendida"],
            //     name: "Tostones de Damián",
            //     shortDescription: "Lorem ipsum dolor sit amet, conetur meand las ipscing elitr, sed diam nonumy eir tempor invidunt uorem ipsum dolor sit amet aswim",
            //     cookDuration: "50 min",
            //     difficultyLevel: "Alta",
            //     variantOptions: ['Opción sin gluten', 'Opción sin lactosa'],
            //     longDescription: "Lorem ipsum dolor sit amet, conetur meand ipscing elitr, sed diam nonumy eir tempor invidunt uLorem ipsum dolor sit amet ipsum dolor sit amet, conetur meand ipscing elitr, sed diam nonumy eir tempor invidunt uLorem ipsum dolor sit amet aswim",
            //     recipeVariants: [
            //         ['Opción principal', 'Opción sin glúten', 'Opción sin lactosa'],
            //         ['Pan, Tomate, Lechuga, Queso, Carne', 'Tomate, Lechuga', 'Pan, Lechuga, Carne']
            //     ],
            //     tools: 'Bol, Tenedor, Cuchillo',
            //     nutritionalInformation: [
            //         { key: 'Valor energético', value: '114,8 kcal' },
            //         { key: 'Grasas', value: '2,2 g' },
            //         { key: '- de las cuales saturadas', value: '1,1 g' },
            //         { key: 'Hidratos de carbono', value: '18 g' },
            //         { key: '- de los cuales azúcares', value: '1,8 g' },
            //         { key: 'Proteínas', value: '4,4 g' },
            //         { key: 'Sal', value: '0,8 g' },
            //     ]
            // },
            // {
            //     id: "9003d63c-68ee-4be4-82f6-20a5241afd6f",
            //     imageUrl: "https://cdn.shopify.com/s/files/1/0196/4330/1988/products/perfil1_26_1024x1024@2x.jpg",
            //     imageTags: ["Mas vendida"],
            //     name: "Tostones de Martín",
            //     shortDescription: "Lorem ipsum dolor sit amet, conetur meand las ipscing elitr, sed diam nonumy eir tempor invidunt uorem ipsum dolor sit amet aswim",
            //     cookDuration: "50 min",
            //     difficultyLevel: "Alta",
            //     variantOptions: ['Opción sin gluten', 'Opción sin lactosa'],
            //     longDescription: "Lorem ipsum dolor sit amet, conetur meand ipscing elitr, sed diam nonumy eir tempor invidunt uLorem ipsum dolor sit amet ipsum dolor sit amet, conetur meand ipscing elitr, sed diam nonumy eir tempor invidunt uLorem ipsum dolor sit amet aswim",
            //     recipeVariants: [
            //         ['Opción principal', 'Opción sin glúten', 'Opción sin lactosa'],
            //         ['Pan, Tomate, Lechuga, Queso, Carne', 'Tomate, Lechuga', 'Pan, Lechuga, Carne']
            //     ],
            //     tools: 'Bol, Tenedor, Cuchillo',
            //     nutritionalInformation: [
            //         { key: 'Valor energético', value: '114,8 kcal' },
            //         { key: 'Grasas', value: '2,2 g' },
            //         { key: '- de las cuales saturadas', value: '1,1 g' },
            //         { key: 'Hidratos de carbono', value: '18 g' },
            //         { key: '- de los cuales azúcares', value: '1,8 g' },
            //         { key: 'Proteínas', value: '4,4 g' },
            //         { key: 'Sal', value: '0,8 g' },
            //     ]
            // }
        ],
    };

    const changePlanData = {
        plans: [
            { planId: "1", name: "Plan Familiar", active: false },
            { planId: "2", name: "Plan Gourmet", active: false },
            { planId: "3", name: "Plan Ahorro", active: true },
            { planId: "4", name: "Plan Vegetariano", active: false },
            { planId: "5", name: "Plan Vegano", active: false },
        ],
        variants: [
            { planId: "1", planVariantId: "6", variantDescription: "4 recetas para 3 personas - 36 €/semana", active: false },
            { planId: "1", planVariantId: "7", variantDescription: "3 recetas para 3 personas - 30 €/semana", active: false },
            { planId: "1", planVariantId: "8", variantDescription: "2 recetas para 3 personas - 24 €/semana", active: false },
            { planId: "2", planVariantId: "9", variantDescription: "4 recetas para 2 personas - 30 €/semana", active: false },
            { planId: "2", planVariantId: "10", variantDescription: "3 recetas para 2 personas - 24 €/semana", active: false },
            { planId: "2", planVariantId: "11", variantDescription: "2 recetas para 2 personas - 18 €/semana", active: false },
            { planId: "3", planVariantId: "12", variantDescription: "3 recetas para 2 personas - 24 €/semana", active: true },
            { planId: "3", planVariantId: "13", variantDescription: "2 recetas para 2 personas - 18 €/semana", active: false },
            { planId: "4", planVariantId: "14", variantDescription: "2 recetas para 2 personas - 18 €/semana", active: false },
            { planId: "5", planVariantId: "15", variantDescription: "2 recetas para 2 personas - 18 €/semana", active: false },
        ],
    };

    const theme = useTheme();
    const classes = useStyles();
    // const router = useRouter();
    // const lang = langs[router.locale];
    const [recipeSelectedIndex, setRecipeSelectedIndex] = useState({ index: -1, period: "" });
    const [openRecipeModal, setOpenRecipeModal] = useState(false);
    const [openChangePlanModal, setOpenChangePlanModal] = useState(false);

    // Change Plan Modal Functions

    const handleClickOpenChangePlanModal = () => {
        setOpenChangePlanModal(true);
    };

    const handleCloseChangePlanModal = () => {
        setOpenChangePlanModal(false);
    };

    const handlePrimaryButtonClickChangePlanModal = () => {
        alert("primary click change plan modal");
        setOpenChangePlanModal(false);
    };

    // Recipes Modal Functions

    const handleClickOpenRecipeModal = (recipeId, period) => {
        let recipeIndex;
        if (period === "actualWeek") {
            recipeIndex = data.recipesActualWeek.findIndex((recipe) => recipe.id === recipeId);
        } else {
            recipeIndex = data.recipesNextWeek.findIndex((recipe) => recipe.id === recipeId);
        }
        setRecipeSelectedIndex({
            ...recipeSelectedIndex,
            index: recipeIndex,
            period: period,
        });
        setOpenRecipeModal(true);
    };

    const handleCloseRecipeModal = () => {
        setOpenRecipeModal(false);
    };

    const descriptionElementRefRecipeModal = useRef(null);

    useEffect(() => {
        if (openRecipeModal) {
            const { current: descriptionElement } = descriptionElementRefRecipeModal;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [openRecipeModal]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <PlanCard plan={data.plan} handleClickOpenChangePlanModal={handleClickOpenChangePlanModal} />
                        </Grid>
                        <Grid item xs={12}>
                            <ShippingAddressCard shippingAddress={data.shippingAddress} />
                        </Grid>
                        <Grid item xs={12}>
                            <PaymentMethodCard paymentMethod={data.paymentMethod} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextButton btnText="cancelar plan" style={{ color: "#FC1919", marginTop: theme.spacing(2) }} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CalendarCard calendar={data.calendar} />
                        </Grid>
                        {data.hasRecipesActualWeek && (
                            <Grid item xs={12}>
                                <RecipesActualWeekCard
                                    recipesActualWeek={data.recipesActualWeek}
                                    handleClickOpenRecipeModal={handleClickOpenRecipeModal}
                                />
                            </Grid>
                        )}
                        {data.hasRecipesNextWeek && (
                            <Grid item xs={12}>
                                <RecipesNextWeekCard
                                    recipesNextWeek={data.recipesNextWeek}
                                    handleClickOpenRecipeModal={handleClickOpenRecipeModal}
                                />
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
            <RecipeModal
                open={openRecipeModal}
                handleClose={handleCloseRecipeModal}
                descriptionElementRef={descriptionElementRefRecipeModal}
                data={
                    recipeSelectedIndex.period === "actualWeek"
                        ? data.recipesActualWeek[recipeSelectedIndex.index]
                        : data.recipesNextWeek[recipeSelectedIndex.index]
                }
            />
            <ChangePlanModal
                open={openChangePlanModal}
                handleClose={handleCloseChangePlanModal}
                handlePrimaryButtonClick={handlePrimaryButtonClickChangePlanModal}
                data={changePlanData}
            />
        </>
    );
};

export default PlanDetails;
