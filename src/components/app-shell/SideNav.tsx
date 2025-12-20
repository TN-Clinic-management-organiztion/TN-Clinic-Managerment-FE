"use client"; // Cần dùng client component để lấy pathname

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RouteAccess } from "@/lib/auth/route-access";
import { hasRole } from "@/lib/auth/role";
import { 
  LayoutDashboard, 
  User, 
  Settings, 
  Folder, 
  LogOut, 
  ChevronRight 
} from "lucide-react";
import { cn } from "@/lib/utils"; // Nếu bạn chưa có hàm cn, xem phần note bên dưới*

// Hàm helper để map icon theo route (bạn có thể tùy chỉnh)
const getIcon = (path: string) => {
  if (path.includes("dashboard")) return <LayoutDashboard size={20} />;
  if (path.includes("user")) return <User size={20} />;
  if (path.includes("setting")) return <Settings size={20} />;
  return <Folder size={20} />;
};

// Hàm làm đẹp tên menu (VD: /admin/users -> Admin Users)
const formatLabel = (path: string) => {
  return path.replace("/", "").split("/").map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" ");
};

export default function SideNav({ session }: any) {
  const role = session?.user?.role;
  const pathname = usePathname();

  const items = RouteAccess
    .filter((r) => hasRole(role, r.roles))
    .map((r) => r.prefix);

  const BRAND_COLOR = "#79cbf2"; 

  return (
    <aside className="flex flex-col w-72 h-screen bg-white border-r border-gray-300 shadow-sm sticky top-0">
      {/* 1. Logo / Header Area */}
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold shadow-md" style={{ backgroundColor: BRAND_COLOR }}>
          A
        </div>
        <span className="font-bold text-xl text-gray-800 tracking-tight">BCare</span>
      </div>

      {/* 2. Navigation Area */}
      <nav className="flex-1 px-4 space-y-2 mt-2">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 pl-2">
          Menu
        </div>
        
        {items.map((p) => {
          const isActive = pathname?.startsWith(p);
          
          return (
            <Link 
              key={p} 
              href={p}
              className={cn(
                "group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-blue-50 text-blue-600 font-medium shadow-sm" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <div className="flex items-center gap-3">
                <span className={cn("transition-colors", isActive ? "text-[#79cbf2]" : "text-gray-400 group-hover:text-gray-600")}>
                  {getIcon(p)}
                </span>
                <span>{formatLabel(p)}</span>
              </div>
              
              {isActive && <ChevronRight size={16} className="text-[#79cbf2]" />}
            </Link>
          );
        })}
      </nav>

      {/* 3. User Profile / Footer Area */}
      <div className="p-4 border-t border-gray-300">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold border-2 border-white shadow-sm">
            {session?.user?.username?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {session?.user?.username ?? "Guest User"}
            </p>
            <p className="text-xs text-gray-500 truncate capitalize flex items-center gap-1">
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: BRAND_COLOR }}></span>
              {role?.toLowerCase() ?? "No Role"}
            </p>
          </div>
          <LogOut size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
        </div>
      </div>
    </aside>
  );
}