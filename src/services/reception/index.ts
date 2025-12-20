import axiosInstance from "@/lib/http/client";
import {
  QueueTicket,
  GetWaitingTicketsQuery,
  CreateTicketPayload,
  UpdateTicketDto,
} from "@/types";

export const getAllTicketReception = async (
  roomId: number,
  query: GetWaitingTicketsQuery
) => {
  try {
    const response = await axiosInstance.get(
      `/reception/queue/tickets/waiting/${roomId}`,
      {
        params: query,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Get waiting tickets Reception error:", error);
    throw error;
  }
};

export const postQueueTicketWalkin = async (payload: CreateTicketPayload) => {
  try {
    console.log("payload: ", payload);
    const res = await axiosInstance.post("/reception/queue/tickets", {
      room_id: payload.room_id,
      ticket_type: "REGISTRATION",
      source: payload.source ?? "WALKIN",
    });
    return res.data.data;
  } catch (error) {
    console.error("Create walkin ticket error:", error);
    throw error;
  }
};

export const postQueueTicketConsultation = async (
  payload: CreateTicketPayload
) => {
  try {
    const res = await axiosInstance.post("/reception/queue/tickets", {
      room_id: payload.room_id, // Phòng do thu ngân chỉ định theo yêu cầu của bệnh nhân
      encounter_id: payload.encounter_id, // Sau khi tạo medical_encouter cho bệnh nhân
      ticket_type: "CONSULTATION",
      source: payload.source ?? "WALKIN",
      service_ids: payload.service_ids, // Dịch vụ mà bệnh nhân yêu cầu
    });
    return res.data.data;
  } catch (error) {
    console.error("Create walkin ticket error:", error);
    throw error;
  }
};

export const postCallSpecific = async (id: string) => {
  try {
    const response = await axiosInstance.post(
      `/reception/queue/tickets/${id}/call`
    );
    return response.data.data;
  } catch (error) {
    console.error("Call ticket error: ", error);
    throw error;
  }
};

export const postStartTicket = async (id: string) => {
  try {
    const response = await axiosInstance.post(
      `/reception/queue/tickets/${id}/start`
    );
    return response.data.data;
  } catch (error) {
    console.error("Start ticket error: ", error);
    throw error;
  }
};

export const postSkipTicket = async (id: string) => {
  try {
    const response = await axiosInstance.post(
      `/reception/queue/tickets/${id}/skip`
    );
    return response.data.data;
  } catch (error) {
    console.error("Skip ticket error: ", error);
    throw error;
  }
};

export const postCompleteTicket = async (id: string) => {
  try {
    const response = await axiosInstance.post(
      `/reception/queue/tickets/${id}/complete`
    );
    return response.data.data;
  } catch (error) {
    console.error("Complete ticket error: ", error);
    throw error;
  }
};

export const getLastNumberOfRoomToday = async (id: number) => {
  try {
    const response = await axiosInstance.get(
      `/reception/queue/counters/last-numbers/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error(`Get last number of room (id: ${id}) error: `, error);
    throw error;
  }
};

export const patchUpdateTicket = async (id: string, dto: UpdateTicketDto) => {
  try {
    const response = await axiosInstance.patch(
      `/reception/queue/tickets/${id}`,
      dto
    );

    return response.data.data;
  } catch (error) {
    console.error("Update ticket error: ", error);
  }
};

export const postCreateTicketForCLS = async (payload: CreateTicketPayload) => {
  try {
    const dto: CreateTicketPayload = {
      room_id: payload.room_id,
      ticket_type: "SERVICE",
      encounter_id: payload.encounter_id,
      source: "WALKIN",
      service_ids: payload.service_ids,
    };
    const res = await axiosInstance.post("/reception/queue/tickets", dto);
    return res.data.data;
  } catch (error) {
    console.error("Create service CLS error: ", error);
    throw error;
  }
};

export const getQueueTicketsTodayByRoomId = async (id: number) => {
  // Kĩ thuật viên tại phòng đó có thể lấy những queue_tickets gồm các serviceIds được chỉ định đến
  try {
    console.log("id trong hàm: ", id);
    const response = await axiosInstance.get(
      `/reception/queue/tickets/today/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Get queue tickets today by room ID error: ", error);
    throw error;
  }
};
