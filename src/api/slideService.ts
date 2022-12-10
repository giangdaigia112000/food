import axiosClient from "./axiosClients";

export const getAllSlideService = async () => {
    const res = await axiosClient.post("api/admin/slider", {
        _method: "get",
    });
    return res.data;
};
