import { notification } from 'antd';

export const openNotificationWithIcon = (noti) => {
  notification[noti.type]({
    message: noti.message,
    description: noti.description,
  });
};
