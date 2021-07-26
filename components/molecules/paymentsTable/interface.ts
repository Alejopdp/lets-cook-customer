interface PaymentOrder {
    id: string;
    billingDate: string;
    amount: number;
    state: string;
    humanState: string;
    ordersQty: number;
}

export interface PaymentsTableProps {
    paymentOrders: PaymentOrder[];
    onClick: (paymentOrderId: string) => void;
}
