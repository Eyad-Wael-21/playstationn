import { useMemo, useState } from "react";
import { PHONE_DISPLAY, PHONE_INTL, ROOMS, WA_BASE } from "../config";

const DAYS = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

function fmtTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "م" : "ص";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2, "0")} ${suffix}`;
}

function fmtDate(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  const dt = new Date(y, m - 1, day);
  return `${DAYS[dt.getDay()]} ${day}/${m}/${y}`;
}

function duration(from: string, to: string) {
  const [h1, m1] = from.split(":").map(Number);
  const [h2, m2] = to.split(":").map(Number);
  let mins = h2 * 60 + m2 - (h1 * 60 + m1);
  if (mins <= 0) mins += 24 * 60;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h ? `${h} ساعة` : ""}${h && m ? " و" : ""}${m ? `${m} دقيقة` : ""}`;
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-cyan-400 focus:bg-white/10";

export default function Booking() {
  const today = new Date().toISOString().slice(0, 10);
  const [name, setName] = useState("");
  const [room, setRoom] = useState(ROOMS[0].name);
  const [date, setDate] = useState(today);
  const [from, setFrom] = useState("16:00");
  const [to, setTo] = useState("18:00");
  const [players, setPlayers] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const message = useMemo(() => {
    const lines = [
      "السلام عليكم 👋",
      "أرغب في حجز غرفة بلايستيشن 🎮",
      "",
      `👤 الاسم: ${name || "-"}`,
      `🚪 الغرفة: ${room}`,
      `📅 اليوم: ${date ? fmtDate(date) : "-"}`,
      `⏰ من الساعة: ${fmtTime(from)}`,
      `⏰ إلى الساعة: ${fmtTime(to)}`,
      `⌛ المدة: ${duration(from, to)}`,
    ];
    if (players) lines.push(`👥 عدد اللاعبين: ${players}`);
    if (notes) lines.push(`📝 ملاحظات: ${notes}`);
    lines.push("", "برجاء تأكيد الحجز، شكرًا ✨");
    return lines.join("\n");
  }, [name, room, date, from, to, players, notes]);

  const waWebUrl = `${WA_BASE}?text=${encodeURIComponent(message)}`;
  const waAppUrl = `whatsapp://send?phone=${PHONE_INTL}&text=${encodeURIComponent(message)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      const t = document.createElement("textarea");
      t.value = message;
      document.body.appendChild(t);
      t.select();
      try {
        document.execCommand("copy");
      } catch {
        /* ignore */
      }
      t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("من فضلك اكتب اسمك");
    if (!date) return setError("اختر اليوم");
    if (from === to) return setError("وقت البداية والنهاية متطابقان");
    setError("");
    setSent(true);
    copy(); // نسخة احتياطية من الرسالة

    let inFrame = false;
    try {
      inFrame = window.self !== window.top;
    } catch {
      inFrame = true;
    }

    if (!inFrame) {
      window.location.href = waWebUrl;
      return;
    }
    // داخل إطار (معاينة): نفتح في الصفحة الرئيسية بدل نافذة منبثقة لتفادي حظر واتساب
    try {
      (window.top as Window).location.href = waWebUrl;
    } catch {
      window.location.href = waAppUrl;
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <form
        onSubmit={submit}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:p-8 lg:col-span-3"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-2 block text-sm text-white/70">الاسم</span>
            <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="اكتب اسمك" />
          </label>

          <div className="sm:col-span-2">
            <span className="mb-2 block text-sm text-white/70">اختر الغرفة</span>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {ROOMS.map((r) => (
                <button
                  type="button"
                  key={r.id}
                  onClick={() => setRoom(r.name)}
                  className={`rounded-xl border px-3 py-3 text-sm font-bold transition ${
                    room === r.name
                      ? "border-transparent bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-600/30"
                      : "border-white/10 bg-white/5 text-white/70 hover:border-cyan-400/50"
                  }`}
                >
                  {r.name}
                </button>
              ))}
            </div>
          </div>

          <label className="block sm:col-span-2">
            <span className="mb-2 block text-sm text-white/70">اليوم</span>
            <input type="date" min={today} className={inputCls + " [color-scheme:dark]"} value={date} onChange={(e) => setDate(e.target.value)} />
            {date && <span className="mt-1 block text-xs text-cyan-300">{fmtDate(date)}</span>}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-white/70">من الساعة</span>
            <input type="time" className={inputCls + " [color-scheme:dark]"} value={from} onChange={(e) => setFrom(e.target.value)} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-white/70">إلى الساعة</span>
            <input type="time" className={inputCls + " [color-scheme:dark]"} value={to} onChange={(e) => setTo(e.target.value)} />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-white/70">عدد اللاعبين (اختياري)</span>
            <input type="number" min={1} max={12} className={inputCls} value={players} onChange={(e) => setPlayers(e.target.value)} placeholder="مثال: 4" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-white/70">ملاحظات (اختياري)</span>
            <input className={inputCls} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="اللعبة المطلوبة..." />
          </label>
        </div>

        {error && <p className="mt-4 text-sm text-rose-400">{error}</p>}

        <button
          type="submit"
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 text-lg font-black text-black shadow-lg shadow-green-500/30 transition hover:scale-[1.02] hover:bg-[#2be072] active:scale-95"
        >
          <WhatsIcon /> احجز الآن عبر واتساب
        </button>

        {sent && (
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
            <p className="mb-3 font-bold text-white/80">الرسالة اتنسخت تلقائيًا ✔ — لو واتساب ما اتفتحش، اختار:</p>
            <div className="flex flex-wrap gap-2">
              <a href={waWebUrl} target="_top" className="rounded-xl bg-[#25D366] px-4 py-2 font-black text-black">
                فتح واتساب
              </a>
              <a href={waAppUrl} className="rounded-xl border border-white/20 px-4 py-2 font-bold hover:bg-white/10">
                فتح تطبيق واتساب
              </a>
              <button type="button" onClick={copy} className="rounded-xl border border-white/20 px-4 py-2 font-bold hover:bg-white/10">
                {copied ? "تم النسخ ✔" : "نسخ الرسالة"}
              </button>
            </div>
            <p className="mt-3 text-xs text-white/50">
              بعد النسخ ابعتها يدويًا على الرقم <span dir="ltr" className="font-bold text-cyan-300">{PHONE_DISPLAY}</span>
            </p>
          </div>
        )}
      </form>

      <div className="lg:col-span-2">
        <div className="sticky top-24 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6">
          <p className="mb-3 text-sm font-bold text-cyan-300">معاينة رسالة الواتساب</p>
          <div className="rounded-2xl rounded-tr-sm bg-[#005c4b] p-4 text-sm leading-7 text-white whitespace-pre-line shadow-xl">
            {message}
          </div>
          <p className="mt-4 text-xs text-white/50">
            سيتم فتح واتساب برسالة جاهزة تحتوي على اسم الغرفة واليوم والمدة، فقط اضغط إرسال.
          </p>
        </div>
      </div>
    </div>
  );
}

export function WhatsIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor">
      <path d="M16 3C9 3 3.400 8.600 3.400 15.500c0 2.400.7 4.700 1.900 6.600L3 29l7.100-2.200c1.800 1 3.800 1.500 5.900 1.500 7 0 12.600-5.600 12.600-12.500S23 3 16 3zm0 22.500c-1.900 0-3.700-.5-5.300-1.500l-.4-.2-4.200 1.300 1.400-4-.3-.4a10 10 0 0 1-1.600-5.400C5.600 10 10.300 5.500 16 5.500S26.400 10 26.400 15.600 21.700 25.500 16 25.500zm5.700-7.400c-.3-.2-1.800-.9-2.100-1s-.5-.2-.7.200-.8 1-1 1.200-.4.200-.7.100a8.200 8.200 0 0 1-4.100-3.600c-.3-.5.300-.5.900-1.600.1-.2 0-.4 0-.5l-1-2.300c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.100-.8.400s-1.100 1.100-1.100 2.600 1.100 3 1.300 3.200 2.200 3.400 5.400 4.700c2 .8 2.800.9 3.800.7.600-.1 1.800-.8 2.100-1.500s.3-1.300.2-1.500-.3-.2-.6-.4z" />
    </svg>
  );
}
