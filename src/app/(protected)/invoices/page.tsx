"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Search,
  Printer,
  CreditCard,
  Save,
  RefreshCw,
  FileText,
  CheckSquare,
  Square,
  DollarSign,
  Loader2,
  User,
  MapPin,
  Calendar,
} from "lucide-react";

import { UnpaidItem } from "@/types/invoices";
import {
  getUnpaidItemsByEncounter,
  postGenerateInvoice,
  patchInvoiceStatus,
} from "@/services/invoices";
import { getEncounterById } from "@/services/encounters";
import { postCreatePayment } from "@/services/payments";
import {
  patchUpdateServiceRequestPaymentStatusPaid,
  UpdateServiceRequestsDto,
} from "@/services/services";

// Interface giả lập cho bệnh nhân
interface PatientInfo {
  id: string;
  encounter_id: string;
  full_name: string;
  code: string;
  dob: string;
  gender: string;
  address: string;
}

export default function InvoicePage() {
  const { data: session } = useSession();

  // --- STATE ---
  const [activeTab, setActiveTab] = useState<"PAYMENT" | "HISTORY">("PAYMENT");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [patient, setPatient] = useState<PatientInfo | null>(null);
  const [unpaidItems, setUnpaidItems] = useState<UnpaidItem[]>([]);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

  // --- LOGIC ---
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const encounterId = searchQuery.trim();

      // Lấy encounter theo ID (có kèm relations: patient, doctor, assigned_room, final_icd)
      const encounter = await getEncounterById(encounterId);

      if (!encounter || !encounter.encounter_id) {
        throw new Error("Không tìm thấy phiếu khám");
      }

      // Lấy thông tin bệnh nhân từ encounter (encounter có relation 'patient')
      const patientData = encounter.patient;

      if (!patientData) {
        throw new Error("Không tìm thấy thông tin bệnh nhân");
      }

      setPatient({
        id: patientData.patient_id || "",
        encounter_id: encounter.encounter_id,
        full_name: patientData.full_name || "---",
        code: patientData.patient_code || "",
        dob: patientData.dob || "",
        gender:
          patientData.gender === "NAM"
            ? "Nam"
            : patientData.gender === "NU"
            ? "Nữ"
            : patientData.gender || "",
        address: patientData.address || "",
      });

      await fetchUnpaidItems(encounter.encounter_id);
      setIsLoading(false);
    } catch (error: any) {
      console.error("Search error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Không tìm thấy phiếu khám";
      alert(errorMessage);
      setIsLoading(false);
    }
  };

  const fetchUnpaidItems = async (encounterId: string) => {
    try {
      const response = await getUnpaidItemsByEncounter(encounterId);

      console.log("response getUnpaidItemsByEncounter: ", response);
      // Sử dụng dữ liệu thật từ API
      const items: UnpaidItem[] = response.unpaid_items || [];

      setUnpaidItems(items);
      // Tự động chọn tất cả items
      setSelectedItemIds(items.map((i) => i.item_id));
    } catch (error: any) {
      console.error("Fetch unpaid items error:", error);
      alert(
        error.response?.data?.message ||
          "Không thể lấy danh sách dịch vụ chưa thanh toán"
      );
      setUnpaidItems([]);
      setSelectedItemIds([]);
    }
  };

  const totalAmount = unpaidItems
    .filter((item) => selectedItemIds.includes(item.item_id))
    .reduce(
      (sum, item) => sum + parseFloat(item.unit_price) * item.quantity,
      0
    );

  const formatCurrency = (val: number | string) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number(val));
  };

  const handlePayment = async () => {
    if (!patient || totalAmount === 0 || !session?.user) return;

    const confirm = window.confirm(
      `Xác nhận thu ${formatCurrency(totalAmount)} của bệnh nhân ${
        patient.full_name
      }?`
    );
    if (!confirm) return;

    setIsProcessing(true);
    try {
      // 1. Tạo hóa đơn từ encounter (API sẽ tự động thêm tất cả items chưa thanh toán)
      console.log("patient.encounter_id: ", patient.encounter_id);
      console.log(
        "cashier_id: ",
        (session.user as any).staff_id || (session.user as any).id || ""
      );
      const invoice = await postGenerateInvoice({
        encounter_id: patient.encounter_id,
        cashier_id:
          (session.user as any).staff_id || (session.user as any).id || "",
      });

      // Thanh toán bằng tiền mặt only
      const payloadForPayment = {
        invoice_id: invoice.data.invoice_id,
        amount: invoice.data.total_amount,
      };
      // Tạo invoice-payment: ghi vết
      const creatPaymentForInvoice = await postCreatePayment(
        invoice.data.invoice_id,
        invoice.data.total_amount
      );

      // 2. Cập nhật trạng thái hóa đơn thành PAID (xác nhận thanh toán)
      await patchInvoiceStatus(invoice.data.invoice_id, "PAID");
      // 3. Cập nhật trạng thái payment_status của service_request về PAID (Xác nhận thanh toán)
      // Bây giờ hiện tại có danh sách Item chưa trả: UnpaidItems
      // (có thể 1 service-request-item cho 1 service-request) - (có thể nhiều service-request-items cho 1 service-request)
      // Có một cách là viết thêm 1 api từ service-request-items cập nhật ngược lên service-request (có thể bị trùng nhưng không sao)
      // Như vậy là hàm getUnpaidItem nhả thêm 1 service-request_id để gọi hàm cập nhật patchUpdateServiceRequestPaymentStatusPaid
      // Hiện tại chỗ này sẽ là 1 vòng lặp để cập nhật
      unpaidItems.map(async (u) => {
        await patchUpdateServiceRequestPaymentStatusPaid(u.request_id);
      });
      // await patchUpdateServiceRequestPaymentStatusPaid()
      alert("Thu tiền thành công!");

      // Reset form
      setPatient(null);
      setUnpaidItems([]);
      setSelectedItemIds([]);
      setSearchQuery("");
      setIsProcessing(false);
    } catch (error: any) {
      console.error("Payment error:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Lỗi thanh toán";
      alert(errorMessage);
      setIsProcessing(false);
    }
  };

  const toggleAllItems = () => {
    if (selectedItemIds.length === unpaidItems.length) setSelectedItemIds([]);
    else setSelectedItemIds(unpaidItems.map((i) => i.item_id));
  };

  const toggleItem = (id: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // --- RENDER ---
  return (
    <div className="flex flex-col h-screen bg-bg-content font-montserrat text-sm text-secondary-900">
      {/* --- HEADER TABS --- */}
      <div className="bg-bg-white border-b border-secondary-200 flex items-center px-4 h-14 shadow-sm shrink-0 gap-1">
        <button
          onClick={() => setActiveTab("PAYMENT")}
          className={`px-6 h-full font-semibold text-sm flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "PAYMENT"
              ? "border-primary-600 text-primary-700 bg-primary-100/50"
              : "border-transparent text-secondary-500 hover:text-primary-600 hover:bg-secondary-100"
          }`}
        >
          <CreditCard size={18} /> Thu Viện Phí
        </button>
        <button
          onClick={() => setActiveTab("HISTORY")}
          className={`px-6 h-full font-semibold text-sm flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "HISTORY"
              ? "border-primary-600 text-primary-700 bg-primary-100/50"
              : "border-transparent text-secondary-500 hover:text-primary-600 hover:bg-secondary-100"
          }`}
        >
          <RefreshCw size={18} /> Lịch Sử Giao Dịch
        </button>
      </div>

      <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
        {/* --- SECTION 1: TÌM KIẾM & THÔNG TIN BỆNH NHÂN --- */}
        <div className="bg-bg-white rounded-large border border-secondary-200 p-5 shadow-sm shrink-0">
          <div className="grid grid-cols-12 gap-6 items-end">
            {/* Form Tìm Kiếm */}
            <form onSubmit={handleSearch} className="col-span-4">
              <label className="block text-xs font-semibold text-secondary-500 mb-2 uppercase tracking-wide">
                Mã phiếu khám (Encounter ID)
              </label>
              <div className="flex shadow-sm rounded-md overflow-hidden">
                <input
                  type="text"
                  className="flex-1 border border-secondary-300 px-4 py-2.5 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 uppercase font-bold text-primary-900 placeholder:normal-case placeholder:font-normal placeholder:text-secondary-400"
                  placeholder="Nhập mã phiếu khám..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-5 flex items-center justify-center transition-colors disabled:opacity-70"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <Search size={20} />
                  )}
                </button>
              </div>
            </form>

            {/* Thông Tin Hiển Thị */}
            <div className="col-span-8 bg-primary-100/40 p-4 rounded-large border border-primary-200 grid grid-cols-3 gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-secondary-500 font-semibold uppercase flex items-center gap-1">
                  Họ tên
                </span>
                <span className="font-bold text-lg text-primary-800 truncate h-7">
                  {patient?.full_name || "---"}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-secondary-500 font-semibold uppercase flex items-center gap-1">
                  Năm sinh / Giới tính
                </span>
                <span className="font-medium text-base text-secondary-800 h-7">
                  {patient
                    ? `${new Date(patient.dob).getFullYear()} - ${
                        patient.gender
                      }`
                    : "---"}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-secondary-500 font-semibold uppercase flex items-center gap-1">
                  Địa chỉ
                </span>
                <span
                  className="font-medium text-base text-secondary-800 truncate h-7"
                  title={patient?.address}
                >
                  {patient?.address || "---"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: DANH SÁCH DỊCH VỤ & THANH TOÁN --- */}
        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Bảng Kê Chi Tiết (Bên Trái) */}
          <div className="flex-1 bg-bg-white rounded-large border border-secondary-200 flex flex-col shadow-sm overflow-hidden">
            <div className="p-4 border-b border-secondary-200 bg-secondary-100/50 flex justify-between items-center">
              <div className="font-bold text-primary-800 flex items-center gap-2">
                <FileText size={18} />
                DỊCH VỤ CẦN THANH TOÁN
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-primary-100/60 sticky top-0 z-10 text-xs font-bold text-primary-900 uppercase">
                  <tr>
                    <th
                      className="p-4 border-b border-primary-200 w-14 text-center cursor-pointer hover:bg-primary-200 transition-colors"
                      onClick={toggleAllItems}
                    >
                      {unpaidItems.length > 0 &&
                      selectedItemIds.length === unpaidItems.length ? (
                        <CheckSquare
                          size={18}
                          className="text-primary-600 mx-auto"
                        />
                      ) : (
                        <Square
                          size={18}
                          className="text-secondary-400 mx-auto"
                        />
                      )}
                    </th>
                    <th className="p-4 border-b border-primary-200">
                      Nội dung
                    </th>
                    <th className="p-4 border-b border-primary-200 text-center w-24">
                      Đơn vị
                    </th>
                    <th className="p-4 border-b border-primary-200 text-center w-20">
                      SL
                    </th>
                    <th className="p-4 border-b border-primary-200 text-right w-36">
                      Đơn giá
                    </th>
                    <th className="p-4 border-b border-primary-200 text-right w-40">
                      Thành tiền
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm text-secondary-700">
                  {unpaidItems.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-12 text-center text-secondary-400 italic"
                      >
                        {patient
                          ? "Bệnh nhân không có khoản nợ nào."
                          : "Vui lòng chọn bệnh nhân để xem chi phí."}
                      </td>
                    </tr>
                  ) : (
                    unpaidItems.map((item, idx) => {
                      const isSelected = selectedItemIds.includes(item.item_id);
                      const amount =
                        parseFloat(item.unit_price) * item.quantity;

                      return (
                        <tr
                          key={item.item_id + idx}
                          className={`
                            hover:bg-primary-100/30 transition-colors border-b border-secondary-100 cursor-pointer
                            ${isSelected ? "bg-warning-100/30" : ""}
                          `}
                          onClick={() => toggleItem(item.item_id)}
                        >
                          <td className="p-4 text-center">
                            {isSelected ? (
                              <CheckSquare
                                size={18}
                                className="text-primary-600 mx-auto"
                              />
                            ) : (
                              <Square
                                size={18}
                                className="text-secondary-400 mx-auto"
                              />
                            )}
                          </td>
                          <td className="p-4 font-medium">
                            {/* Badges phân loại */}
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded mr-2 uppercase border ${
                                item.item_type === "DRUG"
                                  ? "bg-success-100 text-success-700 border-success-200"
                                  : item.item_type === "CONSULTATION"
                                  ? "bg-information-100 text-information-700 border-information-200"
                                  : "bg-primary-100 text-primary-700 border-primary-200"
                              }`}
                            >
                              {item.item_type === "DRUG"
                                ? "Thuốc"
                                : item.item_type === "CONSULTATION"
                                ? "Khám"
                                : "Dịch vụ"}
                            </span>
                            {item.description}
                          </td>
                          <td className="p-4 text-center text-secondary-500">
                            {item.item_type === "DRUG" ? "Viên" : "Lần"}
                          </td>
                          <td className="p-4 text-center font-bold text-secondary-900">
                            {item.quantity}
                          </td>
                          <td className="p-4 text-right text-secondary-600">
                            {formatCurrency(item.unit_price)}
                          </td>
                          <td className="p-4 text-right font-bold text-error-600">
                            {formatCurrency(amount)}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Panel Tổng Hợp & Nút Bấm (Bên Phải) */}
          <div className="w-96 bg-bg-white rounded-large border border-secondary-200 flex flex-col shadow-sm shrink-0">
            <div className="p-6 flex-1 flex flex-col gap-6">
              {/* Thông tin tiền */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-secondary-600">
                  <span className="text-lg">Tổng cộng:</span>
                  <span className="text-lg">{formatCurrency(totalAmount)}</span>
                </div>

                <div className="border-t-2 border-secondary-200 border-dashed pt-4 mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-primary-900 font-bold uppercase">
                      Khách phải trả:
                    </span>
                    <span className="text-lg">
                      {formatCurrency(totalAmount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hình thức thanh toán */}
              {/* <div className="bg-bg-content p-4 rounded-lg border border-secondary-200">
                <span className="text-xs font-bold text-secondary-500 mb-3 block uppercase">
                  Hình thức
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-2.5 px-3 bg-information-100 text-information-700 font-bold rounded-md border border-information-200 shadow-sm text-sm hover:bg-information-200 transition-colors">
                    Tiền mặt
                  </button>
                  <button className="py-2.5 px-3 bg-bg-white text-secondary-600 font-medium rounded-md border border-secondary-300 hover:border-information-500 hover:text-information-600 transition-colors text-sm">
                    Chuyển khoản
                  </button>
                </div>
              </div> */}
            </div>

            {/* Footer Buttons */}
            <div className="grid grid-cols-2 gap-3 p-4">
              {/* Nút Thu Tiền - Tone Primary */}
              <button
                onClick={handlePayment}
                disabled={!patient || totalAmount === 0 || isProcessing}
                className="py-2.5 px-3 bg-primary-600 text-white font-bold rounded-md border border-primary-700 shadow-sm text-sm hover:bg-primary-700 transition-colors uppercase disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Đang xử lý..." : "Thu Tiền"}
              </button>

              {/* Nút In hóa đơn - Tone Secondary White */}
              <button
                disabled={!patient}
                className="py-2.5 px-3 bg-white text-secondary-600 font-bold rounded-md border border-secondary-300 shadow-sm text-sm hover:border-primary-500 hover:text-primary-600 transition-colors uppercase disabled:opacity-50"
              >
                In hoá đơn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
