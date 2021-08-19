export type PlanVariant = {
    id: string;
    sku: string;
    name: string;
    price: number;
    priceWithOffer: number;
    attributes: [string, string][];
    numberOfRecipes?: number;
    numberOfPersons?: number;
    planId?: string;
};
