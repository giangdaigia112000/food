export const getStorge = (name: string): string => {
    if (typeof window !== "undefined") {
        return localStorage.getItem(name)?.toString() || "";
    }
    return "";
};
export const setStorage = (name: string, value: string) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(name, value);
    }
};
export const removeStorage = (name: string) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(name);
    }
};

export const authorizationToken = () => {
    const headerToken = `Bearer ${getStorge("token")}`;
    return headerToken;
};
