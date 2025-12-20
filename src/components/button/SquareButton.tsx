import { cn } from "@/lib/utils";

export default function SquareButton(props: {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      title={props.title}
      onClick={props.onClick}
      disabled={props.disabled}
      className={cn(
        "px-3 py-2 border text-xs font-bold tracking-wide",
        "rounded-[2px] transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        props.className
      )}
    >
      {props.children}
    </button>
  );
}