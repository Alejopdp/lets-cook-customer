import create from "zustand";

export interface IUserInfoFields {
    fullName: string;
    firstName: string;
    lastName: string;
    email: string;
    roleTitle: string;
    permissions: any[];
}

export interface IUserInfo {
    userInfo: IUserInfoFields
}

interface IUserInfoStore extends IUserInfo {
   setuserInfo: (userInfo: IUserInfoFields) => void;
}

const initialState: IUserInfo = {
    userInfo: {
        fullName: "",
        firstName: "",
        lastName: "",
        email: "",
        roleTitle: "",
        permissions: [],
    },
}

export const useUserInfoStore = create<IUserInfoStore>((set, get) => ({
    ...initialState,
    setuserInfo: (userInfo: IUserInfoFields) => set({ userInfo: userInfo })
}));

/** AUTHENTICATION STORAGE */ 

export interface IAuth {
    isAuthenticated: boolean;
}

export interface IAuthStore extends IAuth {
    setIsAuthenticated: (isAuthenticated: boolean) => void,
}

export const useAuthStore = create<IAuthStore>((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated })
}));
