import axiosInstance from "@/lib/http/client";

export const postCreatePayment = async (invoiceId: string, amount: string) => {
  try {
    const payload = {
      invoice_id: invoiceId,
      payment_method_code: "CASH",
      amount: amount,
    };
    const response = await axiosInstance.post("payments", payload);
    return response.data.data;
  } catch (error) {
    console.error("Create payment for invoice error: ", error);
    throw error;
  }
};
