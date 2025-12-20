export enum Gender {
  NAM = 'NAM',
  NU = 'NU',
  KHAC = 'KHAC'
}

export interface PatientData {
  patient_id?: string;
  cccd?: string;
  full_name: string;
  dob: string;
  gender: Gender;
  phone: string;
  address?: string;
  medical_history?: string;
  allergy_history?: string;
}

export interface CreatePatientDto {
  cccd?: string;
  full_name: string;
  dob: string;
  gender: Gender;
  phone: string;
  address?: string;
  medical_history?: string;
  allergy_history?: string;
}

export interface UpdatePatientDto {
  cccd?: string;
  full_name: string;
  dob: string;
  gender: Gender;
  phone: string;
  address?: string;
  medical_history?: string;
  allergy_history?: string;
}