"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

type Screen = { img: string; title: string; desc: string };

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function normalizeWheelDelta(e: WheelEvent) {
  let dy = e.deltaY;
  // 0: pixel, 1: line, 2: page
  if (e.deltaMode === 1) dy *= 16;
  if (e.deltaMode === 2) dy *= window.innerHeight;
  return dy;
}

export default function ScrollStorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  const targetRef = useRef(0);
  const currentRef = useRef(0);

  const rafRef = useRef<number | null>(null);

  const [active, setActive] = useState(false);
  const activeRef = useRef(false);

  const lastSetRef = useRef(0);

  const visitedRef = useRef<Set<number>>(new Set([0]));

  const screens: Screen[] = useMemo(
    () => [
      {
        img: "/images/tiepdon.png",
        title: "Tiếp nhận bệnh nhân",
        desc: "Thông tin bệnh nhân được đồng bộ nhanh chóng và chính xác. Giao diện trực quan giúp nhân viên tiếp đón làm việc hiệu quả, giảm thời gian chờ đợi cho bệnh nhân.",
      },
      {
        img: "/images/chidinhcls.png",
        title: "Chỉ định cận lâm sàng",
        desc: "Bác sĩ chỉ định các dịch vụ xét nghiệm, chẩn đoán hình ảnh trực tiếp trên hệ thống. Kết quả tự động đồng bộ về hồ sơ bệnh án điện tử, tiết kiệm thời gian và giảm sai sót.",
      },
      {
        img: "/images/usingAi.png",
        title: "AI hỗ trợ chẩn đoán",
        desc: "Công nghệ trí tuệ nhân tạo phân tích hình ảnh y khoa, đưa ra gợi ý chẩn đoán. Bác sĩ vẫn là người đưa ra quyết định cuối cùng dựa trên kinh nghiệm lâm sàng.",
      },
      {
        img: "/images/annotation.png",
        title: "Đánh dấu và lưu trữ",
        desc: "Hệ thống tự động gán nhãn, phân loại dữ liệu y khoa. Xây dựng cơ sở dữ liệu chuẩn hóa, hỗ trợ nghiên cứu và đào tạo trong tương lai.",
      },
    ],
    []
  );

  const max = screens.length - 1;

  useEffect(() => {
    screens.forEach((s) => {
      const img = new Image();
      img.src = s.img;
    });
  }, [screens]);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const r = el.getBoundingClientRect();
      const isActive = r.top <= 0 && r.bottom >= window.innerHeight;

      activeRef.current = isActive;
      setActive(isActive);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ticker: lerp current
  const startTicker = () => {
    if (rafRef.current != null) return;

    const tick = () => {
      const cur = currentRef.current;
      const target = targetRef.current;

      const next = lerp(cur, target, 0.10);
      currentRef.current = next;

      if (Math.abs(next - lastSetRef.current) > 0.001) {
        lastSetRef.current = next;
        setProgress(next);
      }

      if (Math.abs(target - next) < 0.001) {
        currentRef.current = target;
        lastSetRef.current = target;
        setProgress(target);
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const i = Math.floor(progress);
  const t = progress - i;

  useEffect(() => {
    visitedRef.current.add(i);
  }, [i]);

  useEffect(() => {
    // TUNING
    const STEP_THRESHOLD = 260; 
    const HOLD_MS = 600;      
    const SNAP_IDLE_MS = 200;  
    const FORCE_BREAK = 900;    

    // Exit control
    const EXIT_THRESHOLD = 320; 
    const EXIT_SNAP_EPS = 0.02; 

    const wheelAccumRef = { current: 0 };
    const lockUntilRef = { current: 0 };
    const exitAccumRef = { current: 0 };

    let snapTimer: number | null = null;

    const scrollExit = (dir: 1 | -1) => {
      const el = sectionRef.current;
      if (!el) return;

      const r = el.getBoundingClientRect();

      const by =
        dir === 1
          ? r.bottom - window.innerHeight + 2 
          : -(Math.abs(r.top) + 2);           

      window.scrollBy({ top: by, behavior: "smooth" });
    };

    const onWheel = (e: WheelEvent) => {
      if (!activeRef.current) return;

      const dy = normalizeWheelDelta(e);
      const now = performance.now();

      e.preventDefault();

      const viewedAll = visitedRef.current.size >= screens.length;

      const roundedTarget = Math.round(targetRef.current);
      const atTop = roundedTarget <= 0 && Math.abs(currentRef.current - 0) < EXIT_SNAP_EPS;
      const atBottom =
        roundedTarget >= max && Math.abs(currentRef.current - max) < EXIT_SNAP_EPS;

      if (atBottom && dy > 0) {
        if (now < lockUntilRef.current) {
          if (Math.abs(dy) < FORCE_BREAK) return;
          lockUntilRef.current = 0;
        }

        if (!viewedAll) {
          // chưa xem hết => không cho thoát xuống
          exitAccumRef.current = 0;
          return;
        }

        exitAccumRef.current += dy;
        if (exitAccumRef.current >= EXIT_THRESHOLD) {
          exitAccumRef.current = 0;
          wheelAccumRef.current = 0;
          scrollExit(1);
        }
        return;
      }

      // Thoát lên: phải ở slide đầu + cuộn thêm (EXIT_THRESHOLD)
      if (atTop && dy < 0) {
        if (now < lockUntilRef.current) {
          if (Math.abs(dy) < FORCE_BREAK) return;
          lockUntilRef.current = 0;
        }

        exitAccumRef.current += Math.abs(dy);
        if (exitAccumRef.current >= EXIT_THRESHOLD) {
          exitAccumRef.current = 0;
          wheelAccumRef.current = 0;
          scrollExit(-1);
        }
        return;
      }

      // không ở biên theo hướng thoát => reset exit accum
      exitAccumRef.current = 0;

      // ====== 2) Hold để đọc (trong section) ======
      if (now < lockUntilRef.current) {
        if (Math.abs(dy) < FORCE_BREAK) return;
        lockUntilRef.current = 0;
      }

      // ====== 3) Step: tích luỹ wheel, đủ ngưỡng thì nhảy 1 slide ======
      wheelAccumRef.current += dy;

      if (Math.abs(wheelAccumRef.current) >= STEP_THRESHOLD) {
        const dir = wheelAccumRef.current > 0 ? 1 : -1;
        wheelAccumRef.current = 0;

        const base = Math.round(targetRef.current);
        const nextSlide = clamp(base + dir, 0, max);

        targetRef.current = nextSlide;
        lockUntilRef.current = now + HOLD_MS;

        startTicker();
      }

      // ====== 4) Snap khi ngừng cuộn ======
      if (snapTimer) window.clearTimeout(snapTimer);
      snapTimer = window.setTimeout(() => {
        wheelAccumRef.current = 0;
        targetRef.current = clamp(Math.round(targetRef.current), 0, max);
        startTicker();
      }, SNAP_IDLE_MS);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel as any);
      if (snapTimer) window.clearTimeout(snapTimer);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [max, screens.length]);

  const cur = screens[i];
  const nxt = screens[Math.min(i + 1, max)];

  const curOpacity = 1 - t;
  const nxtOpacity = t;

  const curTextOpacity = 1 - Math.pow(t, 0.8);
  const nxtTextOpacity = Math.pow(t, 1.2);

  return (
    <section
      ref={sectionRef as any}
      id="cach-thuc"
      className="relative h-[220vh] bg-gradient-to-br from-slate-50 to-slate-100 overscroll-contain"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full">
          {/* LEFT: 3/4 - Images */}
          <div className="relative w-3/4 p-8 md:p-12 lg:p-16 bg-white">
            <div className="relative h-full w-full overflow-hidden rounded-lg shadow-2xl">
              <motion.img
                src={cur.img}
                alt={cur.title}
                className="absolute inset-0 h-full w-full object-contain bg-slate-100"
                style={{ opacity: curOpacity }}
              />
              <motion.img
                src={nxt.img}
                alt={nxt.title}
                className="absolute inset-0 h-full w-full object-contain bg-slate-100"
                style={{ opacity: nxtOpacity }}
              />
            </div>
          </div>

          {/* RIGHT: 1/4 - Text */}
          <div className="relative w-1/4 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex items-center justify-center p-6 lg:p-8">
            <div className="relative max-w-sm w-full">
              <div className="relative min-h-[220px]">
                {/* Current text */}
                <motion.div style={{ opacity: curTextOpacity }} className="absolute inset-0">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span className="text-xs font-medium text-white/80">
                      {i + 1} / {screens.length}
                    </span>
                  </div>

                  <h2 className="text-xl lg:text-2xl font-bold text-white mb-3 leading-tight">
                    {cur.title}
                  </h2>

                  <p className="text-sm lg:text-base text-white/85 leading-relaxed">
                    {cur.desc}
                  </p>
                </motion.div>

                {/* Next text overlay */}
                {i < max && (
                  <motion.div style={{ opacity: nxtTextOpacity }} className="absolute inset-0">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span className="text-xs font-medium text-white/80">
                        {i + 2} / {screens.length}
                      </span>
                    </div>

                    <h2 className="text-xl lg:text-2xl font-bold text-white mb-3 leading-tight transition ease-linear">
                      {nxt.title}
                    </h2>

                    <p className="text-sm lg:text-base text-white/85 leading-relaxed transition ease-linear">
                      {nxt.desc}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
