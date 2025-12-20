import axiosInstance from "@/lib/http/client";
import { CreatePatientDto, UpdatePatientDto } from "@/types";

export class PatientSearchDto {
  phone?: string;
  full_name?: string;
  cccd?: string;
}

export const getSearchPatient = async (search: PatientSearchDto) => {
  try {
    const response = await axiosInstance.get("/patients/search", {
      params: search,
    });
    return response.data.data;
  } catch (error: any) {
    console.error("Search Patient error: ", error);
    throw error;
  }
};

export const postCreatePatient = async (createPatientDto: CreatePatientDto) => {
  try {
    const response = await axiosInstance.post("/patients", createPatientDto);
    return response.data.data;
  } catch (error) {
    console.error("Create Patient error: ", error);
    throw error;
  }
};

export const putUpdatePatient = async (patientId: string, updatePatientDto: UpdatePatientDto) => {
  try {
    const response = await axiosInstance.put(`/patients/${patientId}`, updatePatientDto);
    return response.data.data;
  } catch (error) {
    console.error("Update Patient error: ", error);
    throw error;
  }
};
