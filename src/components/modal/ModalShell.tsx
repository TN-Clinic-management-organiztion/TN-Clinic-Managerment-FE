import { cn } from "@heroui/react";
import { X } from "lucide-react";

export function ModalShell(props: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  widthClass?: string; // ex: max-w-6xl
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
          <div className="font-bold text-sm uppercase tracking-wide">
            {props.title}
          </div>
          <button
            onClick={props.onClose}
            className="p-1 hover:bg-primary-700 rounded-[2px]"
          >
            <X size={18} />
          </button>
        </div>
        <div className="bg-bg-content p-3">{props.children}</div>
      </div>
    </div>
  );
}