import axiosInstance from "@/lib/http/client";
import { PageQueryDto } from "@/types/pagination";

export enum EncounterStatus {
  REGISTERED = "REGISTERED",
  AWAITING_PAYMENT = "AWAITING_PAYMENT",
  IN_CONSULTATION = "IN_CONSULTATION",
  AWAITING_CLS = "AWAITING_CLS",
  IN_CLS = "IN_CLS",
  CLS_COMPLETED = "CLS_COMPLETED",
  RESULTS_READY = "RESULTS_READY",
  COMPLETED = "COMPLETED",
}

export interface CreateEncounterDto {
  patient_id?: string;
  doctor_id?: string;
  assigned_room_id?: number;
  initial_symptoms?: string;
  weight?: number; // Cân nặng (kg)
  height?: number; // Chiều cao (cm)
  bmi?: number; // BMI (Có thể gửi từ FE hoặc để BE tự tính)
  temperature?: number; // Nhiệt độ
  pulse?: number; // Mạch
  respiratory_rate?: number; // Nhịp thở
  bp_systolic?: number; // Huyết áp tâm thu
  bp_diastolic?: number; // Huyết áp tâm trương
  sp_o2?: number; // SpO2
}

export interface UpdateEncounterDto extends CreateEncounterDto {
  current_status?: EncounterStatus;
  final_icd_code?: string | null;
  doctor_conclusion?: string;
}

export interface QueryEncounterDto extends PageQueryDto {
  patient_id?: string;
  doctor_id?: string;
  assigned_room_id?: number;
  current_status?: EncounterStatus;
}

export interface StartConsultationDto {
  doctor_id: string;
  assigned_room_id?: number;
}

export interface CompleteConsultationDto {
  final_icd_code: string;
  doctor_conclusion: string;
}

export const postCreateEncounter = async (dto: CreateEncounterDto) => {
  try {
    console.log("dto: ", dto);
    const response = await axiosInstance.post("clinical/encounters", dto);
    return response.data.data;
  } catch (error) {
    console.error("Create medical encounter for Patient error:", error);
    throw error;
  }
};

// Lấy encounter theo ID (có kèm relations: patient, doctor, assigned_room, final_icd)
export const getEncounterById = async (encounterId: string) => {
  try {
    const response = await axiosInstance.get(
      `clinical/encounters/${encounterId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Get encounter by ID error:", error);
    throw error;
  }
};

// Lấy các encouter thuộc phòng đó
export const getEncounterByRoomId = async (assigned_room_id: number) => {
  try {
    const payload: QueryEncounterDto = {
      assigned_room_id: assigned_room_id,
    };
    const response = await axiosInstance.get("clinical/encounters", {
      params: payload,
    });
    console.log("response get encounterByRoomId: ", response);
    return response.data.data;
  } catch (error) {
    console.error("Get encounters by assigned room id error:", error);
    throw error;
  }
};

// Start consultation
export const postStartConsultation = async (
  id: string,
  dto: StartConsultationDto
) => {
  try {
    const response = await axiosInstance.post(
      `clinical/encounters/${id}/start-consultation`,
      dto
    );
    return response.data.data;
  } catch (error) {
    console.error("Start consulation error:", error);
    throw error;
  }
};

// Complete consultation
export const postCompleteConsultation = async (
  id: string,
  body: CompleteConsultationDto
) => {
  try {
    const response = await axiosInstance.post(
      `clinical/encounters/${id}/complete-consultation`,
      body
    );
    return response.data.data;
  } catch (error) {
    console.error("Complete consulation error:", error);
    throw error;
  }
};

// Update những trường thông tin như là hiệu sinh ...
export const patchUpdateConsultation = async (
  id: string,
  dto: UpdateEncounterDto
) => {
  try {
    const response = await axiosInstance.patch(
      `clinical/encounters/${id}`,
      dto
    );
    return response.data.data;
  } catch (error) {
    console.error("Update consulation error:", error);
    throw error;
  }
};
