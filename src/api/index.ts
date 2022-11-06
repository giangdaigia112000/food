import axiosClient from "./axiosClients";

export const register = async (data: {
    email: string;
    password: string;
    name: string;
}) => {
    let resData = await axiosClient.post("api/auth/register", data);
    return resData;
};
