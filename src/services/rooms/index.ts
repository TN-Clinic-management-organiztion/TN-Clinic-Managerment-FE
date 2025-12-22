import axiosInstance from "@/lib/http/client";
import { PageQueryDto } from "@/types/pagination";
import { RoomType } from "@/types/rooms";

export interface QueryOrgRoomDto extends PageQueryDto {
  room_type?: RoomType;
  is_active?: boolean;
}


export const getAllRooms = async (search: QueryOrgRoomDto) => {
  try {
    const response = await axiosInstance.get("/system/rooms", {
      params: search,
    });
    return response.data.data;
  } catch (error: any) {
    console.error("Find rooms error: ", error);
    throw error;
  }
};
