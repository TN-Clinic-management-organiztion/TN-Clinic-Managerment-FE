import axiosInstance from "@/lib/http/client";
import {
  GenerateInvoicePayload,
  Invoice,
  GetInvoicesQuery,
  InvoiceStatus,
} from "@/types/invoices";

// 1. Lấy danh sách các mục chưa thanh toán của một đợt khám
export const getUnpaidItemsByEncounter = async (encounterId: string) => {
  try {
    const response = await axiosInstance.get(
      `/invoices/unpaid-items/${encounterId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Get unpaid items error:", error);
    throw error;
  }
};

// 2. Tạo hóa đơn từ đợt khám (Sinh ra hóa đơn trạng thái DRAFT - Những services, drugs chưa thanh toán)
export const postGenerateInvoice = async (payload: GenerateInvoicePayload) => {
  try {
    const response = await axiosInstance.post(
      "/invoices/generate-from-encounter",
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Generate invoice error:", error);
    throw error;
  }
};

// 3. Cập nhật trạng thái hóa đơn (Dùng để xác nhận thanh toán -> PAID)
export const patchInvoiceStatus = async (id: string, status: InvoiceStatus) => {
  try {
    const response = await axiosInstance.patch(
      `/invoices/${id}/status`,
      { status }
    );
    return response.data;
  } catch (error) {
    console.error("Update invoice status error:", error);
    throw error;
  }
};

// 4. Lấy lịch sử hóa đơn (Phân trang, tìm kiếm)
export const getInvoices = async (query: GetInvoicesQuery) => {
  try {
    const response = await axiosInstance.get("/invoices", { params: query });
    return response.data; // Thường trả về { data: Invoice[], meta: ... }
  } catch (error) {
    console.error("Get invoices list error:", error);
    throw error;
  }
};

// 5. Lấy chi tiết hóa đơn (In lại hóa đơn)
export const getInvoiceDetail = async (id: string) => {
  try {
    const response = await axiosInstance.get<Invoice>(`/invoices/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get invoice detail error:", error);
    throw error;
  }
};