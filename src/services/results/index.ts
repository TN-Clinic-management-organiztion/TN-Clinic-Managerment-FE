import axiosInstance from "@/lib/http/client";

export interface CreateResultDto {
  request_item_id: string;
  technician_id: string;
  main_conclusion?: string;
  report_body_html?: string;
  is_abnormal?: boolean;
}

export const postCreateServiceResults = async (dto: CreateResultDto) => {
  try {
    const response = await axiosInstance.post("/results", dto);
    return response.data.data;
  } catch (error) {
    console.error("Create result service error: ", error);
    throw error;
  }
};

export const getFindResultByRequestItemId = async (
  request_item_id: string
) => {
  try {
    const response = await axiosInstance.get("/results", { params: {request_item_id: request_item_id} });
    return response.data.data;
  } catch (error) {
    console.error("Get service result by request_item_id error: ", error);
    throw error;
  }
};
