"use client";

import React, { useEffect, useState } from "react";
import { Search, Trash2, X } from "lucide-react";
import { cn, Input, SquareButton } from "@/components/ui/square";
import { getAllDrugs } from "@/services/drugs";

type Drug = {
  drug_id?: number;
  drug_code?: string;
  drug_name: string;
  active_ingredient?: string;
  dosage_form?: string;
  route?: string;
  unit?: string;
  unit_price?: string | number; // tuỳ bạn có field nào
};

type Props = {
  open: boolean;
  onClose: () => void;
  encounterId: string | null;
  onCreated?: () => void;
};

function ModalShell(props: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  widthClass?: string;
}) {
  if (!props.open) return null;
  return (
    <div className="fixed inset-0 z-[80] bg-secondary-900/50 backdrop-blur-[1px] flex items-center justify-center p-4">
      <div
        className={cn(
          "w-full bg-white border border-secondary-200 rounded-[2px] shadow-2xl overflow-hidden",
          props.widthClass ?? "max-w-6xl"
        )}
      >
        <div className="h-11 bg-primary-800 text-white flex items-center justify-between px-3">
          <div className="font-bold text-sm uppercase tracking-wide">{props.title}</div>
          <button onClick={props.onClose} className="p-1 hover:bg-primary-700 rounded-[2px]">
            <X size={18} />
          </button>
        </div>
        <div className="bg-bg-content p-3">{props.children}</div>
      </div>
    </div>
  );
}

const safeMoney = (v: any) => {
  const n = typeof v === "string" ? Number(v) : Number(v ?? 0);
  return Number.isFinite(n) ? n : 0;
};

export default function MedicationModal(props: Props) {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const limit = 20;

  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<
    Array<{ drug: Drug; qty: number; usage: string }>
  >([]);

  useEffect(() => {
    if (!props.open) return;

    (async () => {
      setLoading(true);
      try {
        const data = await getAllDrugs({
          page,
          limit,
          search: q || undefined,
        } as any);

        setDrugs(data ?? []);
      } catch (e) {
        console.error("Load drugs error:", e);
        setDrugs([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [props.open, page, q]);

  const toggle = (drug: Drug) => {
    setSelected((prev) => {
      const key = drug.drug_id ?? drug.drug_code ?? drug.drug_name;
      const idx = prev.findIndex((x) => (x.drug.drug_id ?? x.drug.drug_code ?? x.drug.drug_name) === key);
      if (idx >= 0) return prev.filter((x) => (x.drug.drug_id ?? x.drug.drug_code ?? x.drug.drug_name) !== key);
      return [...prev, { drug, qty: 1, usage: "Ngày 2 lần, chia 2" }];
    });
  };

  const setQty = (key: any, qty: number) => {
    const safe = Math.max(1, Math.min(999, Number.isFinite(qty) ? qty : 1));
    setSelected((prev) =>
      prev.map((x) =>
        (x.drug.drug_id ?? x.drug.drug_code ?? x.drug.drug_name) === key
          ? { ...x, qty: safe }
          : x
      )
    );
  };

  const setUsage = (key: any, usage: string) => {
    setSelected((prev) =>
      prev.map((x) =>
        (x.drug.drug_id ?? x.drug.drug_code ?? x.drug.drug_name) === key
          ? { ...x, usage }
          : x
      )
    );
  };

  const total = selected.reduce((sum, s) => sum + safeMoney(s.drug.unit_price) * s.qty, 0);

  const submit = async () => {
    if (!props.encounterId) return;

    // TODO: gọi API tạo đơn thuốc theo encounterId
    props.onCreated?.();
    props.onClose();
  };

  return (
    <ModalShell open={props.open} onClose={props.onClose} title="Kê đơn thuốc" widthClass="max-w-6xl">
      <div className="bg-white border border-secondary-200 rounded-[2px]">
        <div className="grid grid-cols-12">
          {/* Left */}
          <div className="col-span-5 border-r border-secondary-200">
            <div className="p-2 bg-bg-content border-b border-secondary-200 space-y-2">
              <div className="relative">
                <Input
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Tìm theo tên thuốc / hoạt chất / mã..."
                  className="pl-8"
                />
                <Search size={16} className="absolute left-2 top-2.5 text-secondary-400" />
              </div>
              <div className="text-[11px] text-secondary-500">
                {loading ? "Đang tải thuốc..." : `Trang ${page}`}
              </div>
            </div>

            <div className="h-[420px] overflow-auto bg-white">
              <table className="w-full text-xs">
                <thead className="sticky top-0 bg-bg-content border-b border-secondary-200">
                  <tr className="text-left">
                    <th className="p-2 w-10"></th>
                    <th className="p-2">Thuốc</th>
                    <th className="p-2 w-20">Đường</th>
                    <th className="p-2 w-24 text-right">Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {drugs.map((d, idx) => {
                    const key = d.drug_id ?? d.drug_code ?? `${d.drug_name}-${idx}`;
                    const checked = selected.some(
                      (x) => (x.drug.drug_id ?? x.drug.drug_code ?? x.drug.drug_name) === key
                    );
                    return (
                      <tr
                        key={String(key)}
                        className={cn(
                          "border-b border-secondary-100 hover:bg-primary-0 cursor-pointer",
                          checked && "bg-primary-100/60"
                        )}
                        onClick={() => toggle(d)}
                      >
                        <td className="p-2">
                          <input type="checkbox" checked={checked} readOnly />
                        </td>
                        <td className="p-2">
                          <div className="font-semibold text-secondary-800">{d.drug_name}</div>
                          <div className="text-[11px] text-secondary-500">
                            {d.active_ingredient ?? ""} {d.dosage_form ? `• ${d.dosage_form}` : ""}
                          </div>
                        </td>
                        <td className="p-2">{d.route ?? "--"}</td>
                        <td className="p-2 text-right font-semibold text-primary-700">
                          {safeMoney(d.unit_price).toLocaleString("vi-VN")}đ
                        </td>
                      </tr>
                    );
                  })}

                  {!loading && drugs.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-10 text-center text-secondary-500">
                        Không có dữ liệu thuốc.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-2 border-t border-secondary-200 bg-bg-white flex justify-between">
              <SquareButton
                className="bg-secondary-100 hover:bg-secondary-200 border-secondary-200 text-secondary-800"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || loading}
              >
                Trang trước
              </SquareButton>
              <SquareButton
                className="bg-secondary-100 hover:bg-secondary-200 border-secondary-200 text-secondary-800"
                onClick={() => setPage((p) => p + 1)}
                disabled={loading}
              >
                Trang sau
              </SquareButton>
            </div>
          </div>

          {/* Right */}
          <div className="col-span-7">
            <div className="p-2 bg-bg-content border-b border-secondary-200 flex items-center justify-between">
              <div className="text-xs font-bold uppercase text-secondary-700">Thuốc đã chọn</div>
              <div className="text-xs text-secondary-600">
                Tổng: <span className="font-bold text-primary-800">{total.toLocaleString("vi-VN")}đ</span>
              </div>
            </div>

            <div className="h-[420px] overflow-auto bg-white">
              <table className="w-full text-xs">
                <thead className="sticky top-0 bg-bg-content border-b border-secondary-200">
                  <tr className="text-left">
                    <th className="p-2 w-10">#</th>
                    <th className="p-2">Thuốc</th>
                    <th className="p-2 w-20 text-center">SL</th>
                    <th className="p-2 w-64">Cách dùng</th>
                    <th className="p-2 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {selected.map((s, idx) => {
                    const key = s.drug.drug_id ?? s.drug.drug_code ?? s.drug.drug_name;
                    return (
                      <tr key={String(key)} className="border-b border-secondary-100">
                        <td className="p-2">{idx + 1}</td>
                        <td className="p-2">
                          <div className="font-semibold">{s.drug.drug_name}</div>
                          <div className="text-[11px] text-secondary-500">
                            {s.drug.route ?? "--"} {s.drug.unit ? `• ${s.drug.unit}` : ""}
                          </div>
                        </td>
                        <td className="p-2">
                          <Input
                            type="number"
                            min={1}
                            max={999}
                            value={s.qty}
                            onChange={(e) => setQty(key, Number(e.target.value))}
                            className="text-center py-1"
                          />
                        </td>
                        <td className="p-2">
                          <Input
                            value={s.usage}
                            onChange={(e) => setUsage(key, e.target.value)}
                            className="py-1"
                          />
                        </td>
                        <td className="p-2">
                          <button
                            onClick={() => setSelected((prev) => prev.filter((x) => (x.drug.drug_id ?? x.drug.drug_code ?? x.drug.drug_name) !== key))}
                            className="p-1 border border-secondary-200 hover:bg-error-100 rounded-[2px]"
                            title="Xóa"
                          >
                            <Trash2 size={14} className="text-error-600" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  {selected.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-10 text-center text-secondary-500">
                        Chưa chọn thuốc.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-2 border-t border-secondary-200 bg-bg-white flex justify-end gap-2">
              <SquareButton
                className="bg-secondary-100 hover:bg-secondary-200 border-secondary-200 text-secondary-800"
                onClick={() => setSelected([])}
                disabled={selected.length === 0}
              >
                Xóa hết
              </SquareButton>
              <SquareButton
                className="bg-primary-600 hover:bg-primary-700 border-primary-700 text-white"
                onClick={submit}
                disabled={selected.length === 0 || !props.encounterId}
              >
                Lưu đơn
              </SquareButton>
            </div>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
