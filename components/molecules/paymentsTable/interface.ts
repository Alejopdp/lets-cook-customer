interface PaymentOrder {
    id: string;
    billingDate: string;
    amount: number;
    state: string;
    humanState: string;
    ordersQty: number;
    discountAmount: number;
}

export interface PaymentsTableProps {
    paymentOrders: PaymentOrder[];
    lang: any;
    onClick: (paymentOrderId: string) => void;
}
