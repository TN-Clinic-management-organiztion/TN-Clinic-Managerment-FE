import axiosInstance from "@/lib/http/client";

export const getAllPaymentMethods = async () => {
  try {
    const response = await axiosInstance.get("/");
    return response.data.data;
  } catch (error) {
    console.error("Get all method payments error:", error);
    throw error;
  }
};
