export const LOCAL_STORAGE_KEYS = {
    token: "token",
    userInfo: "userInfo",
};

export const useLocalStorage = () => {
    const saveInLocalStorage = (key, value) => {
        if (typeof window === "undefined") return false;
        return localStorage.setItem(key, JSON.stringify(value));
    };

    const getFromLocalStorage = (key) => {
        if (typeof window === "undefined") return {};
        return JSON.parse(localStorage.getItem(key));
    };

    const resetLocalStorage = () => {
        if (typeof window === "undefined") return false;
        localStorage.clear();
    };

    const removeFromLocalStorage = (key) => {
        if (typeof window === "undefined") return false;
        localStorage.removeItem(key);
    };

    return {
        saveInLocalStorage,
        getFromLocalStorage,
        resetLocalStorage,
        removeFromLocalStorage,
    };
};

export default useLocalStorage;
