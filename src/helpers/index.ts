export function formatNumberWithCommas(number: string) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const formatTime = (iso: string) => {
  try {
    return new Date(iso).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "--:--";
  }
};