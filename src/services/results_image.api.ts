import axios from "axios";

// URL trỏ đến ResultsController
const API_URL = "http://127.0.0.1:8080/results"; 

export const uploadResultImage = async (file: File, uploadedBy: string, resultId?: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('uploaded_by', uploadedBy);
  
  if (resultId) {
    formData.append('result_id', resultId);
  }
  // Nếu không có resultId (ảnh training), ta không append, BE sẽ nhận null

  const res = await axios.post(`${API_URL}/images-cloudinary`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};