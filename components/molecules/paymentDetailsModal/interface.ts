interface Recipe {
    recipeId: string;
    imageUrl: string;
    name: string;
}

interface Order {
    subscriptionId: string;
    planName: string;
    planIcon: string;
    planVariant: string;
    frequency: string;
    subtotal: string;
    hasRecipes: true;
    recipes: Recipe[];
}

export interface PaymentDetailsModalProps {
    data: {
        amounts: {
            subtotal: "100 €";
            shippingCost: "10 €";
            discounts: "-5 €";
            total: "105 €";
        };
        amount: string;
        shippingCost: string;
        discountAmount: string;
        totalAmount: string;
        orders: Order[];
    };
    open: boolean;
    handleClose: () => void;
}
