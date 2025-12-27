import { toast } from "react-toastify";

// Toastify
const notifySuccess = (content: string) => toast.success(content);
const notifyError = (content: string) => toast.error(content);

export { notifyError, notifySuccess };
