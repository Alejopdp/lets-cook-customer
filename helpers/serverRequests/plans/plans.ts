import Axios from "axios";
import { API_URL } from "../serverRequestInterfaces/response";
import { Plan, PlanResponse } from "./plansInterfaces";

export const getDataForSwappingAPlan = async (subscriptionId: string, locale?: string) => {
    try {
        const res = await Axios({
            method: "GET",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${API_URL}/plan/data-for-swapping/${subscriptionId}`,
            params: {
                locale,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export async function getPlans(locale: string): Promise<PlanResponse> {
    try {
        const res = await Axios.request<Plan[]>({
            method: "GET",
            // headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${API_URL}/plan/plans/week`,
            params: {
                locale,
            },
        });
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        return {
            status: 500,
            error: error.response as string,
        };
    }
}

export const getAdditionalPlans = async (locale: string, planId?: string) => {
    try {
        const res = await Axios.request<Plan[]>({
            method: "GET",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${API_URL}/plan/additionals`,
            params: {
                locale,
                planId,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const getPlanAhorro = async () => {
    try {
        const res = await Axios.request<Plan>({
            method: "GET",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${API_URL}/plan/ahorro`,
            params: {
                locale: "es",
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const getDemoPlans = async (locale: string): Promise<PlanResponse> => ({
    status: 200,
    data,
});

const data: Plan[] = Array<Plan>(20)
    .fill({
        id: "a01f9820-adfa-41ee-823c-858c16c64a6b",
        name: "Plan #planName#",
        sku: "PLDES",
        description: "Plan para desayunar",
        availablePlanFrecuencies: ["Semanal", "Quincenal", "Mensual"],
        isActive: true,
        type: "Principal",
        imageUrl:
            "https://lets-cook-assets.s3.eu-west-3.amazonaws.com/development/plans/Plan_test/Plan_test.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZNRGZIDJTCFDYFOU%2F20210627%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20210627T154619Z&X-Amz-Expires=900&X-Amz-Signature=ad91aba8e7fc17e18986e5c7839eec7aef96e3a4363f8142f636293d6d399886&X-Amz-SignedHeaders=host",
        hasRecipes: true,
        variants: [
            {
                id: "v-1-1",
                sku: "PLDES1",
                name: "Desayuno para 1 persona",
                price: 30,
                priceWithOffer: 20,
                numberOfPersons: 1,
                numberOfRecipes: 1,
                attributes: [
                    ["Key 1", "Value 1"],
                    ["Key 2", "Value 2"],
                ],
            },
            {
                id: "v-2-1",
                sku: "PLDES2",
                name: "Desayuno para 2 personas",
                price: 30,
                priceWithOffer: 20,
                numberOfPersons: 2,
                numberOfRecipes: 1,
                attributes: [],
            },
            {
                id: "v-3-1",
                sku: "PLDES3",
                name: "Desayuno para 3 personas",
                price: 30,
                priceWithOffer: 20,
                numberOfPersons: 3,
                numberOfRecipes: 1,
                attributes: [["Key 2", "Value 2"]],
            },
            {
                id: "v-2-2",
                sku: "PLDES3-2",
                name: "Desayuno para 2 personas, 2 raciones",
                price: 30,
                priceWithOffer: 20,
                numberOfPersons: 2,
                numberOfRecipes: 2,
                attributes: [["Key 2", "Value 2"]],
            },
            {
                id: "v-3-3",
                sku: "PLDES3-3",
                name: "Desayuno para 3 personas, 3 raciones",
                price: 30,
                priceWithOffer: 20,
                numberOfPersons: 3,
                numberOfRecipes: 3,
                attributes: [["Key 2", "Value 2"]],
            },
        ],
        additionalPlans: [],
        abilityToChooseRecipes: true,
        slug: "plan-desayuno",
        icon: "https://lets-cook-assets.s3.eu-west-3.amazonaws.com/development/plan-familiar.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZNRGZIDJTCFDYFOU%2F20210627%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20210627T154619Z&X-Amz-Expires=900&X-Amz-Signature=56bcc55d13018c61f11bdda05d325b5108d0b96f66201c06d6616ab1f5b1aa14&X-Amz-SignedHeaders=host",
        iconWithColor:
            "https://lets-cook-assets.s3.eu-west-3.amazonaws.com/development/plan-familiar-color.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZNRGZIDJTCFDYFOU%2F20210627%2Feu-west-3%2Fs3%2Faws4_request&X-Amz-Date=20210627T154619Z&X-Amz-Expires=900&X-Amz-Signature=2f473a9bc23595c07f452277376259333ffd4acfee7d611bf9cefc9d3d682dac&X-Amz-SignedHeaders=host",
        recipes: [
            {
                id: "0e9c00f3-929b-4d46-bcfd-28da38c3c8ba",
                name: "Arepas de Crhistian",
                sku: "ARP",
                shortDescription: "Las mejores arepas de Colombia",
                longDescription: "Las mejores arepas hechas por el mejor dev de Colombia",
                cookDuration: "50 min",
                cookDurationNumberValue: 50,
                difficultyLevel: "Dificil",
                imageUrl: "development/plans/Plan_test/Plan_test.png",
                weight: "150 gr",
                weightNumberValue: 150,
                recipeVariants: [],
                imageTags: ["Mas vendida", "Mas rica"],
                backOfficeTags: ["Mas vendida", "Mas rica"],
                recipeNutritionalData: [],
                availableWeeks: [
                    {
                        id: "ad38bcbe-b1cd-4b14-a0da-c5526e7a22d5",
                        label: "13-19 jul.",
                    },
                    {
                        id: "95611f61-70b2-4267-85ca-2f5151c89cee",
                        label: "29-05 jun.",
                    },
                ],
                availableMonths: ["Abril", "Mayo", "Marzo", "Agosto"],
                relatedPlans: ["1b0f2a16-35db-4052-843e-e58ed97a6df0", "a0d57052-133b-4ed1-adc5-eddc90044b2a"],
                recipeTools: ["Bol", "Tenedor", "Cuchillo"],
            },
        ],
    })
    .map<Plan>((plan, index) => ({
        ...plan,
        id: plan.id + "-" + index,
        slug: plan.slug + `-${index}`,
        name: plan.name.replace("#planName#", index + ""),
        type: index % 2 === 0 ? "Adicional" : "Principal",
    }));
