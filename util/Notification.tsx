import { notification } from "antd";
import type { NotificationArgsProps } from "antd";
export const openNotification = (args: NotificationArgsProps) => {
  notification.open({
    ...args,
    placement: "topRight",
    duration: 5,
    showProgress: true,
  });
};
