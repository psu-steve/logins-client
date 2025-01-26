import { toast, ToastOptions } from "react-toastify";
import { getThemeColors } from "./theme";

export const createThemedToast = (theme: "light" | "dark") => {
  const colors = getThemeColors(theme);

  const defaultOptions: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      backgroundColor: colors.card,
      color: colors.text,
      boxShadow: `0 2px 4px ${colors.shadow}`,
    },
  };

  return {
    success: (message: string) =>
      toast.success(message, {
        ...defaultOptions,
        style: {
          ...defaultOptions.style,
          backgroundColor: colors.toast.success.background,
          color: colors.toast.success.text,
        },
      }),
    error: (message: string) =>
      toast.error(message, {
        ...defaultOptions,
        style: {
          ...defaultOptions.style,
          backgroundColor: colors.toast.error.background,
          color: colors.toast.error.text,
        },
      }),
    info: (message: string) =>
      toast.info(message, {
        ...defaultOptions,
        style: {
          ...defaultOptions.style,
          backgroundColor: colors.toast.info.background,
          color: colors.toast.info.text,
        },
      }),
  };
}; 