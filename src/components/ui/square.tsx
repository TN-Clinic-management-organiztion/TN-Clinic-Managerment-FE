import React from "react";

export const cn = (...s: Array<string | false | undefined | null>) =>
  s.filter(Boolean).join(" ");

export function SquareButton(props: {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  title?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={props.type ?? "button"}
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

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full border border-secondary-200 bg-white px-2 py-2 text-sm",
        "rounded-[2px] outline-none",
        "focus:border-primary-500 focus:ring-1 focus:ring-primary-500",
        props.className
      )}
    />
  );
}

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full border border-secondary-200 bg-white px-2 py-2 text-sm",
        "rounded-[2px] outline-none resize-none",
        "focus:border-primary-500 focus:ring-1 focus:ring-primary-500",
        props.className
      )}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "w-full border border-secondary-200 bg-white px-2 py-2 text-sm",
        "rounded-[2px] outline-none",
        "focus:border-primary-500 focus:ring-1 focus:ring-primary-500",
        props.className
      )}
    />
  );
}

export function Field(props: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", props.className)}>
      <div className="text-[11px] uppercase font-bold text-secondary-500">
        {props.label}
      </div>
      <div className="mt-1 border border-secondary-200 bg-white px-2 py-2 rounded-[2px] text-sm">
        {props.children}
      </div>
    </div>
  );
}

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
