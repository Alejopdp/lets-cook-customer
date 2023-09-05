import create from "zustand";

export interface IUserInfoFields {
    id: string;
    fullName: string;
    firstName: string;
    lastName: string;
    email: string;
    roleTitle: string;
    permissions: any[];
    phone1: string;
    shippingAddress?: IShippingAddress;
    paymentMethods?: IPaymentMethod[];
    preferredLanguage: string;
    wallet?: Wallet | undefined;
}

export interface IShippingAddress {
    addressDetails: string;
    addressName: string;
    latitude: number;
    longitude: number;
}

export interface IPaymentMethod {
    id: string;
    label: string;
    isDefault: string;
    expirationDate: string;
    card?: string;
}
export interface IUserInfo {
    userInfo: IUserInfoFields;
}

export type Wallet = {
    id: string;
    balance: number;
    amountToCharge: number;
    paymentMethodForCharging: string;
    last4Numbers: string;
    isEnabled: boolean;
    datesOfCharge: { dayNumber: number; hour: string; minute: string }[];
};

interface IUserInfoStore extends IUserInfo {
    setuserInfo: (userInfo: IUserInfoFields) => void;
}

const initialState: IUserInfo = {
    userInfo: {
        id: "",
        phone1: "",
        fullName: "",
        firstName: "",
        lastName: "",
        email: "",
        roleTitle: "",
        permissions: [],
        preferredLanguage: "",
        shippingAddress: {
            addressDetails: "",
            addressName: "",
            latitude: null,
            longitude: null,
        },
        paymentMethods: [],
        wallet: {
            id: "",
            balance: 0,
            amountToCharge: 0,
            paymentMethodForCharging: "",
            last4Numbers: "",
            isEnabled: false,
            datesOfCharge: [],
        },
    },
};

export const useUserInfoStore = create<IUserInfoStore>((set, get) => ({
    ...initialState,
    setuserInfo: (userInfo: IUserInfoFields) => set({ userInfo: userInfo }),
}));

/** AUTHENTICATION STORAGE */

export interface IAuth {
    isAuthenticated: boolean;
}

export interface IAuthStore extends IAuth {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));
