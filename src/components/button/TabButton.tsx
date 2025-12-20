import { cn } from "@/lib/utils";

export function TabButton(props: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={props.onClick}
      className={cn(
        "px-3 py-2 text-xs font-bold border-b-[2px] transition-colors",
        props.active
          ? "border-primary-600 text-primary-800 bg-white"
          : "border-transparent text-secondary-500 hover:text-secondary-800"
      )}
    >
      {props.children}
    </button>
  );
}