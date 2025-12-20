// Enums từ Backend
export type InvoiceStatus = 'DRAFT' | 'PAID' | 'CANCELLED' | 'REFUNDED';
export type InvoiceItemType = 'SERVICE' | 'DRUG' | 'CONSULTATION';

// DTO cho Payload gửi đi (Create/Update)
export interface GenerateInvoicePayload {
  encounter_id: string;
  cashier_id: string;
}

export interface UpdateInvoiceStatusPayload {
  status: InvoiceStatus;
}

// Interface cho Models (Entities trả về)
export interface InvoiceItem {
  invoice_item_id?: string; // Optional vì khi chưa lưu có thể chưa có
  item_type: InvoiceItemType;
  service_item_id?: string;
  description: string;
  quantity: number;
  unit_price: string; // Backend trả về string cho số tiền (decimal)
  line_amount: string;
}

export interface Invoice {
  invoice_id: string;
  encounter_id: string;
  cashier_id: string;
  total_amount: string;
  status: InvoiceStatus;
  created_at: string;
  payment_time?: string;
  items?: InvoiceItem[];
  // Có thể thêm thông tin bệnh nhân nếu backend join sẵn
  patient_name?: string; 
  patient_code?: string;
}

// Interface cho API lấy danh sách chưa thanh toán (Unpaid Items)
export interface UnpaidItem {
  item_type: InvoiceItemType;
  item_id: string; // service_item_id
  description: string;
  quantity: number;
  unit_price: string;
  request_id: string; // Đây chính là request_id của service-request để query ngược lên cập nhật payment_status cho service-request
}

export interface UnpaidItemsResponse {
  encounter_id: string;
  unpaid_items: UnpaidItem[];
  total_items: number;
  total_amount: string;
}

// Interface cho Query Params (Lịch sử giao dịch)
export interface GetInvoicesQuery {
  page?: number;
  limit?: number;
  encounter_id?: string;
  status?: InvoiceStatus;
  from_date?: string;
  to_date?: string;
  search?: string; // Tìm theo tên bệnh nhân
}