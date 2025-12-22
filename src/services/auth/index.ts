import axiosInstance from "@/lib/http/client";

export async function postLogout(): Promise<void> {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Logout API error:", error);
    throw error;
  }
}