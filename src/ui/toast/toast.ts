import useToast from "./useToast";

const Toast = {
  error: (message: string) => useToast.getState().error(message),
  warning: (message: string) => useToast.getState().warning(message),
  success: (message: string) => useToast.getState().success(message),
};

export default Toast;
