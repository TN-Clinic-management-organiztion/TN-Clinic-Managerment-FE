export type TicketStatus =
  | "WAITING"
  | "CALLED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "SKIPPED";
export type TicketType = "REGISTRATION" | "CONSULTATION" | "SERVICE";
export type TicketSource = "ONLINE" | "WALKIN";

export interface QueueTicket {
  ticket_id?: string;
  display_number?: number;
  ticket_type?: TicketType;
  source?: TicketSource;
  status?: TicketStatus;
  created_at?: string;
  room_id?: number;
  encounter_id?: string | null;
}

export interface PatientForm {
  fullName: string;
  gender: string;
  yob: string;
  address: string;
  phone: string;
  reason: string;
  targetRoomId: number | null;
}

export type GetWaitingTicketsQuery = {
  ticket_type?: TicketType;
  source?: TicketSource;
};


export type CreateTicketPayload = {
  room_id: number;
  ticket_type: "REGISTRATION" | "CONSULTATION" | "SERVICE";
  encounter_id?: string;
  source?: "WALKIN" | "APPOINTMENT";
  service_ids?: number[];
};

export type UpdateTicketDto = {
  status?: TicketStatus;
  service_ids?: number[];
}