import { SHOP_NAME } from "../config";

// لو وضعت ملف باسم logo.png أو logo.jpg أو logo.svg داخل src/assets سيظهر تلقائيًا هنا
const found = import.meta.glob("../assets/logo.{png,jpg,jpeg,svg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const logoSrc = Object.values(found)[0];

export default function Logo({ size = 44 }: { size?: number }) {
  if (logoSrc) {
    return (
      <img
        src={logoSrc}
        alt={SHOP_NAME}
        style={{ height: size }}
        className="w-auto object-contain"
      />
    );
  }
  return (
    <div className="flex items-center gap-3" dir="ltr">
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="48" y2="48">
            <stop stopColor="#22d3ee" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="44" height="44" rx="12" stroke="url(#lg)" strokeWidth="3" />
        <path d="M18 12v24l8 2V16c3 1 5 2.500 5 6s-2 4.500-5 5v4c7 .5 10-3 10-9s-4-9-10-10l-8-2z" fill="url(#lg)" />
      </svg>
      <span className="text-lg font-black tracking-wide text-white">
        {SHOP_NAME.split(" ")[0]}
        <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
          {" "}
          {SHOP_NAME.split(" ").slice(1).join(" ")}
        </span>
      </span>
    </div>
  );
}
