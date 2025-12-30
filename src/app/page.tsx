"use client";

import { useRouter } from "next/navigation";
import { SquareButton } from "@/components/ui/square";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Globe,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import ScrollStorySection from "@/components/landing-page/ScrollStorySection";

function FeatureCard({ title, desc, Icon, iconWrap }: any) {
  return (
    <div
      className="
        rounded-2xl bg-white p-6 text-left
        border border-gray-100
        shadow-[0_6px_22px_rgba(0,0,0,0.06)]
        hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]
        transition
      "
    >
      <div
        className={`
          mb-4 inline-flex h-10 w-10 items-center justify-center
          rounded-xl ring-1 ring-black/5 ${iconWrap}
        `}
      >
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="text-[15px] font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
    </div>
  );
}

export default function Home() {
  const router = useRouter();

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides = ["/images/thuoc1.png", "/images/thuoc2.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Quản lý phòng khám dễ dàng",
      desc: "Đặt lịch khám nhanh chóng, quản lý hồ sơ bệnh án điện tử trực quan.",
      Icon: Globe,
      iconWrap: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Chỉ định cận lâm sàng nhanh chóng",
      desc: "Chỉ định xét nghiệm, X-quang, siêu âm... trực tiếp trên hệ thống, kết quả tự động đồng bộ.",
      Icon: MapPinned,
      iconWrap: "bg-blue-50 text-blue-600",
    },
    {
      title: "AI hỗ trợ phân tích kết quả",
      desc: "AI nhận diện bất thường, gợi ý kết quả giúp bác sĩ chẩn đoán nhanh và chính xác hơn.",
      Icon: Sparkles,
      iconWrap: "bg-purple-50 text-purple-600",
    },
    {
      title: "Gán nhãn dữ liệu thông min",
      desc: "Hệ thống gán nhãn cận lâm sàng, hỗ trợ xây dựng cơ sở dữ liệu y khoa.",
      Icon: ShieldCheck,
      iconWrap: "bg-pink-50 text-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-bg-white flex flex-col items-center">
      {/* Header */}

      <header className="w-full bg-white shadow-sm py-4 px-4 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/images/logo_bcare.svg"
              className="w-8 h-8 mr-3"
              alt="BCARE"
            />
            <span className="font-bold text-xl text-success-700 tracking-widest">
              BCARE
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-10">
            <a
              href="#gioi-thieu"
              className="text-gray-700 hover:text-primary-600 font-bold transition-colors"
            >
              Giới thiệu
            </a>
            <a
              href="#tinh-nang"
              className="text-gray-700 hover:text-primary-600 font-bold transition-colors"
            >
              Tính năng
            </a>
            <a
              href="#cach-thuc"
              className="text-gray-700 hover:text-primary-600 text-base font-bold transition-colors"
            >
              Cách thức hoạt động
            </a>
          </nav>

          <div>
            <SquareButton
              onClick={() => router.push("/login")}
              className="border-none text-black hover:text-primary-400 font-bold transition"
            >
              Đăng nhập
            </SquareButton>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-20 w-full">
        {/* Banner */}
        <section
          id="gioi-thieu"
          className="relative w-full h-screen max-h-[600px] flex items-center justify-center overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat ease-in-out duration-1000"
            style={{
              backgroundImage: `url('${slides[currentSlide]}')`,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <p
              className="text-3xl md:text-5xl font-semibold mb-2 drop-shadow-2xl 
                        bg-gradient-to-r from-primary-500 via-primary-500 to-primary-600
                        bg-clip-text text-transparent"
            >
              Phòng khám thông minh
            </p>
            <p className="text-3xl md:text-5xl text-white mb-8 drop-shadow-lg font-semibold">
              AI dẫn dắt tương lai
            </p>
            <p className="text-sm md:text-lg-2 text-white mb-12 drop-shadow-md max-w-4xl mx-auto">
              Chỉ định cận lâm sàng tức thì • Phân tích kết quả tự động
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/#tinh-nang"
                className="rounded-xl border-2 border-white text-white px-9 py-4 text-lg font-semibold hover:bg-white hover:text-primary-600"
              >
                Khám phá
              </a>
            </div>
          </div>
        </section>
        {/* Main features */}
        <section id="tinh-nang" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            {/* Tiêu đề chính với gradient */}
            <div className="flex flex-row w-full justify-center items-center gap-3">
              <p className="text-4xl md:text-5xl font-bold mb-6 text-black">
                Tính năng
              </p>
              <p className="text-4xl md:text-5xl font-bold mb-6 text-primary-600">
                nổi bật
              </p>
            </div>

            {/* Mô tả phụ */}
            <p className="text-sm md:text-base text-secondary-400 mb-16 max-w-4xl mx-auto">
              Nền tảng hỗ trợ toàn diện giúp phòng khám vận hành hiệu quả, chính
              xác và hiện đại hơn với công nghệ AI
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {features.map((f) => (
                <FeatureCard
                  key={f.title}
                  title={f.title}
                  desc={f.desc}
                  Icon={f.Icon}
                  iconWrap={f.iconWrap}
                />
              ))}
            </div>
          </div>
        </section>
        {/* Cách thức hoạt động */}
        <section id="cach-thuc" className="py-20 bg-gray-50">
          <ScrollStorySection />
          {/* Nội dung */}
        </section>
        {/* Footer */}
        <footer className="w-full bg-white border-t border-gray-200 py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Phần trái: Logo + Tên thương hiệu */}
            <div className="flex flex-col">
              <div className="flex items-center mb-6">
                <span className="font-bold text-2xl text-success-700 tracking-widest">
                  BCARE
                </span>
              </div>
            </div>

            {/* Cột 1: Navigation Links */}
            <div className="flex flex-col space-y-3">
              <h4 className="font-semibold text-gray-900 mb-4">Điều hướng</h4>
              <a
                href="#gioi-thieu"
                className="text-gray-600 font-bold hover:text-primary-600 transition-colors"
              >
                Giới thiệu
              </a>
              <a
                href="#tinh-nang"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Tính năng
              </a>
              <a
                href="#cach-thuc"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Cách thức hoạt động
              </a>
            </div>

            {/* Cột 2: Thông tin hỗ trợ */}
            <div className="flex flex-col space-y-3">
              <h4 className="font-semibold text-gray-900 mb-4">Hỗ trợ</h4>
              <span className="text-gray-600">Hỗ trợ 24/7</span>
              <span className="text-gray-600">Câu hỏi thường gặp</span>
              <span className="text-gray-600">Chính sách bảo mật</span>
              <span className="text-gray-600">Điều khoản sử dụng</span>
            </div>

            {/* Cột 3: Liên hệ */}
            <div className="flex flex-col space-y-3">
              <h4 className="font-semibold text-gray-900 mb-4">Liên hệ</h4>
              <span className="text-gray-600">
                UIT, khu phố 6, phường Linh Trung, Quận Thủ Đức, Tp. Hồ Chí Minh
              </span>
              <span className="text-gray-600">+84 859 160 779</span>
              <span className="text-gray-600">support@bcare.vn</span>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} BCARE. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
