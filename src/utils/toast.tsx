import { toast } from "sonner";
import { CinematicNotification } from "@/components/ui/sonner";

type NotificationOptions = {
  title: string;
  message: string;
  duration?: number;
};

const showNotification = (type: 'success' | 'error' | 'warning' | 'info' | 'default', { title, message, duration = 5000 }: NotificationOptions) => {
  return toast.custom(
    (t) => (
      <CinematicNotification
        type={type}
        title={title}
        description={message}
      />
    ),
    { duration }
  );
};

export const showSuccess = (message: string, title: string = "Success") => {
  showNotification('success', { title, message });
};

export const showError = (message: string, title: string = "Error") => {
  showNotification('error', { title, message });
};

export const showWarning = (message: string, title: string = "Warning") => {
  showNotification('warning', { title, message });
};

export const showInfo = (message: string, title: string = "Information") => {
  showNotification('info', { title, message });
};

export const showLoading = (message: string) => {
  return toast.loading(message);
};

export const dismissToast = (toastId: string | number) => {
  toast.dismiss(toastId);
};