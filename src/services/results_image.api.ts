import axiosInstance from "@/lib/http/client";

export const uploadResultImage = async (
  file: File,
  uploadedBy: string,
  resultId?: string
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("uploaded_by", uploadedBy);

  if (resultId) {
    formData.append("result_id", resultId);
  }

  const res = await axiosInstance.post(`results/images/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
