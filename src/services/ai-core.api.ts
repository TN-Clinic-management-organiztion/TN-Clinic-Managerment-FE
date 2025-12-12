import axios from "axios";

// URL trỏ đến AiCoreController (Backend chạy local port 8080)
const API_URL = "http://127.0.0.1:8080/ai-core";

// 1. Get List Result Images
export const getListResultImages = async (page = 1, limit = 8, statusFilter = "", search = "") => {
  const params = { page, limit, status: statusFilter, search }; 
  try {
    const res = await axios.get(`${API_URL}/result-images`, { params });
    // Xử lý trường hợp Interceptor bọc data
    const body = res.data || {};
    return body.data ? body.data : body;
  } catch (error) {
    console.error("Error fetching list:", error);
    return { items: [], meta: { total_pages: 1, total_items: 0 } };
  }
};

// 2. Get Detail
export const getResultImageDetail = async (image_id: string) => {
  try {
    const res = await axios.get(`${API_URL}/result-images/${image_id}`);
    const body = res.data || {};
    return body.data ? body.data : body;
  } catch (error) {
    console.error("Error get detail:", error);
    throw error;
  }
};

// 3. Save / Upsert (Tạo bản ghi mới hoặc update draft)
export const saveHumanAnnotation = async (image_id: string, payload: any) => {
  try {
    const res = await axios.post(`${API_URL}/result-images/${image_id}/human-annotations`, payload);
    return res.data;
  } catch (error) {
    console.error("Error save:", error);
    throw error;
  }
};

// 4. Approve
export const approveHumanAnnotation = async (image_id: string, payload: any) => {
  try {
    const res = await axios.patch(`${API_URL}/result-images/${image_id}/approve`, payload);
    return res.data;
  } catch (error) {
    console.error("Error approve:", error);
    throw error;
  }
};

// 5. Reject (Lưu lý do reject)
export const rejectHumanAnnotation = async (image_id: string, payload: { rejected_by: string, reason: string }) => {
  try {
    const res = await axios.patch(`${API_URL}/result-images/${image_id}/reject`, payload);
    return res.data;
  } catch (error) {
    console.error("Error reject:", error);
    throw error;
  }
};

// 6. Deprecate (MỚI: Nhận reason thay vì boolean)
// Dùng khi muốn đánh dấu thủ công 1 bản ghi Approved là lỗi thời
export const setAnnotationDeprecated = async (annotation_id: string, reason: string) => {
  try {
    const res = await axios.patch(`${API_URL}/annotations/${annotation_id}/deprecate`, { reason });
    return res.data;
  } catch (error) {
    console.error("Error deprecate:", error);
    throw error;
  }
};