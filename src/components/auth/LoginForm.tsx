"use client";

import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();

  const images = ["/images/medical_4.png", "/images/medical_3.png"];
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [imageError, setImageError] = useState(false);

  const [imgIndex, setImgIndex] = useState(0);
  const [imgFading, setImgFading] = useState(false);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [glowOn, setGlowOn] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Tên đăng nhập hoặc mật khẩu không chính xác");
      } else {
        router.push("/");
      }
    } catch {
      setError("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // bật trạng thái fade-out
      setImgFading(true);

      // sau 300ms đổi ảnh rồi fade-in lại
      const t = setTimeout(() => {
        setImgIndex((prev) => (prev + 1) % images.length);
        setImgFading(false);
      }, 300);

      return () => clearTimeout(t);
    }, 2500); // mỗi 2.5s đổi 1 lần

    return () => clearInterval(interval);
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="relative overflow-hidden flex items-center justify-center min-h-screen bg-success-800"
      onMouseMove={handleMove}
      onMouseEnter={() => setGlowOn(true)}
      onMouseLeave={() => setGlowOn(false)}
    >
      {/* Glow layer (background spotlight) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-200"
        style={{
          opacity: glowOn ? 1 : 0,
          background: `radial-gradient(180px circle at ${mouse.x}px ${mouse.y}px,
      rgba(84, 166, 255, 0.18) 0%,
      rgba(84, 166, 255, 0.10) 28%,
      rgba(84, 166, 255, 0.05) 50%,
      rgba(0, 0, 0, 0) 75%)`,
          filter: "blur(10px)",
          transform: "translateZ(0)",
        }}
      />
      <div className="relative z-10 grid w-full max-w-[1520px] bg-bg-white grid-cols-1 items-center gap-12 px-10 py-10 md:grid-cols-2 rounded-xl">
        {/* Form */}
        <div className="flex flex-col justify-center items-center gap-10 w-full max-w-[560px] min-h-[700px] animate-slideInLeft">
          <div className="p-6 flex items-center gap-5">
            <div className="w-30 h-30 rounded-lg flex items-center justify-center">
              <img
                src="/images/logo_bcare.svg"
                className="w-20 h-20"
                alt="BCARE"
              />
            </div>
            <span className="font-bold text-5xl text-success-700 tracking-widest">
              BCARE
            </span>
          </div>

          <form onSubmit={onSubmit} className="space-y-6 w-full">
            <div className="space-y-2">
              <label className="block text-secondary-600 text-lg">
                Tài khoản
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="w-full h-12 px-6 rounded-md border-2
                           text-secondary-600 placeholder:text-secondary-300
                           disabled:opacity-60 disabled:cursor-not-allowed
                           transition-all outline-none"
                placeholder="Nhập tài khoản..."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-secondary-600 text-sm font-medium">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full h-12 px-6 rounded-md border-2
                           text-secondary-600 placeholder:text-secondary-300
                           disabled:opacity-60 disabled:cursor-not-allowed
                           transition-all outline-none"
                  placeholder="Nhập mật khẩu..."
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400
                             hover:text-secondary-600 disabled:opacity-50 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-error-600 bg-error-100 border border-error-200 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-12 rounded-md text-white transition-all
                flex items-center justify-center gap-2 font-bold
                ${
                  loading
                    ? "bg-success-700 cursor-not-allowed"
                    : "bg-success-700 hover:bg-success-900 active:bg-success-900"
                }`}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                "Đăng nhập"
              )}
            </button>
          </form>
        </div>

        {/* Illustration */}
        <div className="md:flex items-center justify-center bg-gradient-to-br from-information-50 to-primary-50 min-h-[700px] rounded-3xl overflow-hidden animate-slideInRight relative">
          <img
            src={images[imgIndex]}
            width={700}
            height={700}
            alt="Medical Exploration"
            className={`object-contain drop-shadow-2xl transition-all duration-300 
              ${imgFading ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"}
            `}
            onError={() => setImageError(true)}
          />
          <div className="absolute top-1/4 left-8 w-2 h-2 bg-information-500 rounded-full animate-sparkle"></div>
          <div className="absolute bottom-1/4 right-12 w-3 h-3 bg-information-500 rounded-full animate-sparkle"></div>
          <div className="absolute top-1/2 right-8 w-2 h-2 bg-information-500 rounded-full animate-sparkle"></div>
        </div>
      </div>
    </div>
  );
}
