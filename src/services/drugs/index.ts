import axiosInstance from "@/lib/http/client";
import { PageQueryDto } from "@/types/pagination";

export interface QueryDrugDto extends PageQueryDto {
  category_id?: number,
  is_active?: boolean;
  dosage_form?: string;
  route?: string;
}

export const getAllDrugs = async (search: QueryDrugDto) => {
  try {
    const response = await axiosInstance.get("pharmacy/drugs", {params: search});
    return response.data.data;
  } catch (error) {
    console.error("Get all drugs error: ", error);
    throw error;
  }
};
