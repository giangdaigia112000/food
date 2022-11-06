import { message } from "antd";

export const success = (mes: string) => {
    message.success(mes);
};

export const error = (mes: string) => {
    message.error(mes);
};

export const warning = (mes: string) => {
    message.warning(mes);
};
