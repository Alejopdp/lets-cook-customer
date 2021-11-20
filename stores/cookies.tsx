import create from "zustand";

export interface ICookies {
    hasAcceptedCookies: boolean;
}

interface ICookiesStore extends ICookies {
    setHasAcceptedCookies: (cookies: boolean) => void;
}

const initialState: ICookiesStore = {
    hasAcceptedCookies: false,
    setHasAcceptedCookies: () => "",
};

export const useCookiesStore = create<ICookiesStore>((set, get) => ({
    ...initialState,
    setuserInfo: (hasAcceptedCookies: boolean) => set({ hasAcceptedCookies }),
}));
