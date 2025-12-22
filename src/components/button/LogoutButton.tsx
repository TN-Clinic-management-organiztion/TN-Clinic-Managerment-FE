"use client";
import { LogOut } from "lucide-react";
import { SquareButton } from "@/components/ui/square";
import { cn } from "@/lib/utils";
import { useLogout } from "@/hook/useLoggout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type LogoutButtonProps = {
  className?: string;
  variant?: "default" | "icon" | "text";
  size?: "sm" | "md" | "lg";
};

export function LogoutButton({ 
  className, 
  variant = "default",
  size = "md" 
}: LogoutButtonProps) {
  const { logout, isLoggingOut } = useLogout();

  const renderTriggerButton = () => {
    // 1. Variant Icon
    if (variant === "icon") {
      return (
        <button
          disabled={isLoggingOut}
          className={cn(
            "p-2 rounded-lg hover:bg-red-50 hover:text-red-600 text-gray-400 transition-colors",
            isLoggingOut && "opacity-50 cursor-not-allowed",
            className
          )}
          title="Đăng xuất"
        >
          <LogOut size={20} />
        </button>
      );
    }

    // 2. Variant Text
    if (variant === "text") {
      return (
        <button
          disabled={isLoggingOut}
          className={cn(
            "inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors",
            isLoggingOut && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          <LogOut size={16} />
          {isLoggingOut ? "Đang xử lý..." : "Đăng xuất"}
        </button>
      );
    }

    // 3. Variant Default (SquareButton)
    return (
      <SquareButton
        disabled={isLoggingOut}
        className={cn(
          "bg-red-600 hover:bg-red-700 border-red-700 text-white w-full justify-center", // Thêm w-full nếu cần
          isLoggingOut && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <span className="inline-flex items-center gap-2">
          <LogOut size={16} />
          {isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
        </span>
      </SquareButton>
    );
  };

  return (
    <AlertDialog>
      {/* Trigger là nút bấm, dùng asChild để tránh lỗi lồng button vào button */}
      <AlertDialogTrigger asChild>
        {renderTriggerButton()}
      </AlertDialogTrigger>
      
      {/* Nội dung Modal Confirm */}
      <AlertDialogContent className="bg-white rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận đăng xuất</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn kết thúc phiên làm việc này không?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-lg border-gray-200 hover:bg-gray-100">
            Hủy bỏ
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={() => logout()}
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg border-none"
          >
            Đăng xuất
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}