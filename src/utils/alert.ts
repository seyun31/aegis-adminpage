import { toast } from "react-toastify";

export const showError = (message: string) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 2500,
    icon: false,
  });
};

export const showSuccess = (message: string) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 2500,
    icon: false,
  });
};

export const showWarning = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const result = window.confirm(message);
    resolve(result);
  });
};

export const showConfirm = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const result = window.confirm(message);
    resolve(result);
  });
};

