import { useEffect, useRef, useState, type ReactNode } from "react";
import { QRCodeSVG } from "qrcode.react";
import Logo from "./components/Logo";
import Booking, { WhatsIcon } from "./components/Booking";
import {
  GAMES,
  IMAGES,
  MAP_URL,
  PHONE_DISPLAY,
  PHONE_INTL,
  ROOMS,
  SHOP_NAME,
  WA_BASE,
  WORKING_HOURS,
} from "./config";

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("show");
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function Heading({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <span className="text-sm font-bold tracking-widest text-cyan-300">{kicker}</span>
      <h2 className="mt-2 text-3xl font-black sm:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-white/60">{sub}</p>}
    </Reveal>
  );
}

const NAV = [
  { href: "#rooms", label: "الغرف" },
  { href: "#games", label: "الألعاب" },
  { href: "#cafe", label: "الكوفي" },
  { href: "#booking", label: "الحجز" },
  { href: "#contact", label: "تواصل معنا" },
];

const FEATURES = [
  { icon: "❄️", title: "غرف مكيفة", text: "تكييف قوي في كل غرفة لراحة تامة طوال اللعب." },
  { icon: "🖥️", title: "شاشات كبيرة", text: "شاشات ضخمة بدقة عالية لتجربة سينمائية." },
  { icon: "🎧", title: "سماعات DJ", text: "سماعات احترافية بصوت محيطي ينقلك داخل اللعبة." },
  { icon: "🎮", title: "أحدث الألعاب", text: "مكتبة ألعاب تتجدد باستمرار مع أحدث الإصدارات." },
];

export default function App() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition ${
          scrolled || open ? "bg-[#07060f]/90 shadow-lg backdrop-blur-lg" : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <a href="#top">
            <Logo />
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-semibold text-white/70 transition hover:text-cyan-300">
                {n.label}
              </a>
            ))}
            <a
              href="#booking"
              className="rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-5 py-2 text-sm font-bold shadow-lg shadow-fuchsia-600/30 transition hover:scale-105"
            >
              احجز الآن
            </a>
          </nav>
          <button
            aria-label="القائمة"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setOpen(!open)}
          >
            <span className={`h-0.5 w-6 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-white transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
        {open && (
          <div className="flex flex-col gap-1 px-5 pb-5 md:hidden">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 font-semibold text-white/80 hover:bg-white/5">
                {n.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
        <img src={IMAGES.heroRoom} alt="غرفة بلايستيشن" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07060f] via-[#07060f]/70 to-[#07060f]/40" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#07060f]/90 via-[#07060f]/40 to-transparent" />
        <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-fuchsia-600/30 blur-[120px]" />
        <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-32">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1.5 text-sm font-bold text-cyan-200">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" /> مفتوح يوميًا · أحدث إصدارات PS5
            </span>
            <h1 className="mt-6 text-5xl font-black leading-[1.15] sm:text-7xl">
              عالمك في <span className="text-grad">اللعب</span>
              <br />
              يبدأ من هنا
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
              غرف واسعة مكيفة بشاشات ضخمة وسماعات DJ، أحدث الألعاب، وكوفي بار أنيق بانتظارك مع فريق لطيف يهتم بكل التفاصيل.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#booking"
                className="rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-8 py-4 text-lg font-black shadow-xl shadow-fuchsia-600/30 transition hover:scale-105"
              >
                احجز غرفتك
              </a>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-lg font-bold backdrop-blur transition hover:bg-white/10"
              >
                📍 موقعنا على الخريطة
              </a>
            </div>
            <div className="mt-12 grid max-w-md grid-cols-3 gap-4 text-center">
              {[
                [String(ROOMS.length), "غرف خاصة"],
                ["4K", "شاشات ضخمة"],
                ["FC 27", "أحدث الألعاب"],
              ].map(([n, l]) => (
                <div key={l} className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
                  <div className="text-2xl font-black text-cyan-300">{n}</div>
                  <div className="text-xs text-white/60">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative mx-auto max-w-7xl px-5 py-24">
        <Heading kicker="المميزات" title="كل ما تحتاجه لتجربة لعب مثالية" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title}>
              <div
                style={{ animationDelay: `${i * 80}ms` }}
                className="group h-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-7 transition hover:-translate-y-2 hover:border-cyan-400/50"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/30 to-fuchsia-600/30 text-3xl transition group-hover:scale-110">
                  {f.icon}
                </div>
                <h3 className="text-xl font-extrabold">{f.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/60">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ROOMS */}
      <section id="rooms" className="mx-auto max-w-7xl px-5 py-24">
        <Heading kicker="غرفنا" title="اختار غرفتك المفضلة" sub="كل غرفة واسعة ومجهزة بالكامل: مكيف، شاشة كبيرة، سماعات DJ وأذرع أصلية." />
        <div className="grid gap-6 md:grid-cols-2">
          {ROOMS.map((r) => (
            <Reveal key={r.id}>
              <div className="group relative overflow-hidden rounded-3xl border border-white/10">
                <img src={r.img} alt={r.name} className="h-72 w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07060f] via-[#07060f]/30 to-transparent" />
                <span className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-4 py-1 text-xs font-black">
                  {r.tag}
                </span>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <div>
                    <h3 className="text-2xl font-black">{r.name}</h3>
                    <p className="mt-1 text-sm text-white/70">👥 {r.players} · ❄️ مكيف · 🎧 DJ</p>
                  </div>
                  <a
                    href="#booking"
                    className="rounded-xl bg-white px-5 py-2.5 text-sm font-black text-black transition hover:scale-105"
                  >
                    احجز
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GAMES */}
      <section id="games" className="relative overflow-hidden py-24">
        <div className="absolute left-1/2 top-0 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-fuchsia-700/20 blur-[130px]" />
        <div className="relative mx-auto max-w-7xl px-5">
          <Heading kicker="الألعاب" title="أقوى الألعاب بانتظارك" sub="من ملاعب الكرة إلى حلبات المصارعة، عندنا اللي يناسب كل لاعب." />
          <div className="grid gap-6 md:grid-cols-3">
            {GAMES.map((g) => (
              <Reveal key={g.name}>
                <div className="group h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition hover:border-fuchsia-500/60">
                  <div className="overflow-hidden">
                    <img src={g.img} alt={g.name} className="h-56 w-full object-cover transition duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-black" dir="auto">{g.name}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/60">{g.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CAFE */}
      <section id="cafe" className="mx-auto max-w-7xl px-5 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-cyan-500/40 to-fuchsia-600/40 blur-2xl" />
              <img src={IMAGES.cafe} alt="كوفي بار" className="relative h-[28rem] w-full rounded-[2rem] border border-white/10 object-cover" />
              <div className="animate-float absolute -bottom-6 left-6 rounded-2xl border border-white/10 bg-[#0d0b1a]/90 px-5 py-3 backdrop-blur">
                <div className="text-xs text-white/50">ستاف لطيف ☕</div>
                <div className="font-black text-cyan-300">خدمة بابتسامة</div>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <span className="text-sm font-bold tracking-widest text-cyan-300">الكوفي بار</span>
            <h2 className="mt-2 text-3xl font-black sm:text-5xl">استمتع بالقهوة <span className="text-grad">وأنت تلعب</span></h2>
            <p className="mt-5 text-lg leading-8 text-white/65">
              كوفي بار أنيق بمشروبات ساخنة وباردة وسناكس طازجة، يقدمها فريق لطيف يوصّل طلبك لحد غرفتك بدون ما تقطع اللعب.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3 text-sm font-semibold">
              {["قهوة مختصة", "مشروبات باردة", "سناكس وحلويات", "توصيل للغرفة"].map((t) => (
                <li key={t} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="text-cyan-300">✔</span> {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="relative mx-auto max-w-7xl px-5 py-24">
        <Heading kicker="الحجز" title="احجز غرفتك في ثواني" sub="اختار الغرفة واليوم والمواعيد، وهنفتحلك الواتساب برسالة جاهزة." />
        <Reveal>
          <Booking />
        </Reveal>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-7xl px-5 py-24">
        <Heading kicker="تواصل معنا" title="يسعدنا خدمتك" />
        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-8">
              <div className="mb-5 text-4xl">📞</div>
              <h3 className="text-xl font-black">رقم التواصل</h3>
              <a href={`tel:+${PHONE_INTL}`} dir="ltr" className="mt-3 block text-3xl font-black text-cyan-300">
                {PHONE_DISPLAY}
              </a>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={WA_BASE}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 font-black text-black transition hover:scale-[1.03]"
                >
                  <WhatsIcon className="h-5 w-5" /> واتساب
                </a>
                <a
                  href={`tel:+${PHONE_INTL}`}
                  className="rounded-xl border border-white/15 py-3 text-center font-bold transition hover:bg-white/10"
                >
                  اتصل الآن
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-8">
              <div className="mb-5 text-4xl">⏰</div>
              <h3 className="text-xl font-black">مواعيد العمل</h3>
              <ul className="mt-4 space-y-4">
                {WORKING_HOURS.map((w) => (
                  <li key={w.days} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm text-white/50">{w.days}</div>
                    <div className="mt-1 font-black text-cyan-300">{w.time}</div>
                  </li>
                ))}
              </ul>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 py-3 font-black transition hover:scale-[1.03]"
              >
                📍 افتح الموقع على الخريطة
              </a>
            </div>
          </Reveal>

          <Reveal>
            <div className="flex h-full flex-col items-center rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center">
              <h3 className="text-xl font-black">امسح الكود وكلمنا واتساب</h3>
              <p className="mt-1 text-sm text-white/50">يفتح المحادثة مباشرة</p>
              <div className="mt-6 rounded-3xl bg-white p-4 shadow-2xl shadow-cyan-500/20">
                <QRCodeSVG
                  value={`${WA_BASE}?text=${encodeURIComponent("السلام عليكم، أريد الاستفسار عن الحجز 🎮")}`}
                  size={190}
                  level="M"
                  fgColor="#0b0818"
                />
              </div>
              <a
                href={WA_BASE}
                target="_blank"
                rel="noreferrer"
                className="mt-6 text-sm font-bold text-[#25D366] underline-offset-4 hover:underline"
              >
                أو اضغط هنا لفتح واتساب
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 sm:flex-row">
          <Logo size={36} />
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} {SHOP_NAME}. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={WA_BASE}
        target="_blank"
        rel="noreferrer"
        aria-label="واتساب"
        className="pulse-ring fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-black shadow-xl transition hover:scale-110"
      >
        <WhatsIcon className="h-8 w-8" />
      </a>
    </div>
  );
}
