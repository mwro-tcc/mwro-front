import toast_store from "../ui/toast/toast_store";

const Toast = {
  error: (message: string) => toast_store.getState().error(message),
  warning: (message: string) => toast_store.getState().warning(message),
  success: (message: string) => toast_store.getState().success(message),
};

export default Toast;
