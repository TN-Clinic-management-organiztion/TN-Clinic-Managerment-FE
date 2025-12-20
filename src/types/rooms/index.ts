export enum RoomType {
  CLINIC = 'CLINIC',
  PARACLINICAL = 'PARACLINICAL',
  PHARMACY = 'PHARMACY',
  CASHIER = 'CASHIER',
  ADMIN = 'ADMIN',
}

export interface Room {
  room_id: number;
  room_name: string;
  room_type: string; // 'CLINIC', 'IMAGING', etc.
}