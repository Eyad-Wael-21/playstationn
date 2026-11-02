import heroRoom from "./assets/hero-room.jpg";
import roomVip from "./assets/room-vip.jpg";
import cafe from "./assets/cafe.jpg";
import football from "./assets/football.jpg";
import wrestling from "./assets/wrestling.jpg";
import controllers from "./assets/controllers.jpg";

// ====== بيانات المحل (عدّلها من هنا فقط) ======
export const SHOP_NAME = "PlayStation Lounge";
export const SHOP_NAME_AR = "بلايستيشن لاونج";

export const PHONE_DISPLAY = "01103789124";
export const PHONE_INTL = "201103789124"; // صيغة واتساب الدولية (مصر)

// ضع هنا رابط الموقع الحقيقي من خرائط جوجل (Share > Copy link)
export const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=PlayStation+Lounge";

export const WORKING_HOURS = [
  { days: "السبت - الخميس", time: "12:00 ظهرًا - 2:00 صباحًا" },
  { days: "الجمعة", time: "2:00 ظهرًا - 3:00 صباحًا" },
];

export const WA_BASE = `https://wa.me/${PHONE_INTL}`;

export const ROOMS = [
  { id: "1", name: "الغرفة 1", tag: "الأكثر طلبًا", players: "حتى 4 لاعبين", img: roomVip },
  { id: "2", name: "الغرفة 2", tag: "VIP", players: "حتى 6 لاعبين", img: heroRoom },
  { id: "3", name: "الغرفة 3", tag: "عائلية", players: "حتى 4 لاعبين", img: roomVip },
  { id: "4", name: "الغرفة 4", tag: "جروب", players: "حتى 8 لاعبين", img: heroRoom },
];

export const GAMES = [
  { name: "EA SPORTS FC 27", desc: "أحدث نسخة من كرة القدم، تحدّى أصحابك أونلاين وأوفلاين.", img: football },
  { name: "WWE 2K", desc: "مصارعة حرة بأقوى النجوم، جولات حماسية لا تنتهي.", img: wrestling },
  { name: "أذرع DualSense", desc: "أذرع بلايستيشن أصلية بحالة ممتازة ومعقّمة لكل غرفة.", img: controllers },
];

export const IMAGES = { heroRoom, roomVip, cafe, football, wrestling, controllers };
