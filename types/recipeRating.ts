export interface RecipeRating {
    id: string;
    customer: string;
    recipeId: string;
    recipeName: string;
    recipeImageUrl: string;
    rating: number;
    comment: string;
    lastShippingDate: string | Date;
    qtyDelivered: number;
    isRated: boolean;
    dontRate: boolean;
}
