import { IPaymentMethod } from "@stores";

export interface PaymentMethodFormProps {
    // value: string;
    // handleChange: () => void;
    // selectedSavedCard: string
    selectedOption: string;
    setselectedOption: (event: any) => void;
    paymentMethods: IPaymentMethod[];
    selectedSavedCard: string;
    setselectedSavedCard: (event: any) => void;
    lang: any;
}
