import { Room } from "./rooms/index";
import {
  PatientData,
  Gender,
  CreatePatientDto,
  UpdatePatientDto,
} from "./patient/index";
import {
  QueueTicket,
  PatientForm,
  TicketType,
  TicketStatus,
  GetWaitingTicketsQuery,
  CreateTicketPayload,
  UpdateTicketDto,
} from "./reception/index";

export { Gender };

export type {
  QueueTicket,
  PatientForm,
  TicketType,
  TicketStatus,
  PatientData,
  Room,
  GetWaitingTicketsQuery,
  CreateTicketPayload,
  CreatePatientDto,
  UpdatePatientDto,
  UpdateTicketDto,
};
