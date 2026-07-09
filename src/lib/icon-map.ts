import {
  BadgeCheck,
  BookOpen,
  Bot,
  Building2,
  CalendarCheck,
  CalendarDays,
  CalendarRange,
  ClipboardCheck,
  Cog,
  FileCheck,
  FileText,
  GraduationCap,
  History,
  Landmark,
  Library,
  Lightbulb,
  Map,
  MapPin,
  Megaphone,
  Microscope,
  MonitorPlay,
  MousePointerClick,
  School,
  ShieldCheck,
  Sparkles,
  Sprout,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Iconos disponibles para las listas editables del gestor (nombre Lucide en
 * kebab-case → componente). Si en el panel se escribe un nombre desconocido,
 * se usa Sparkles como comodín en vez de romper la página.
 */
export const ICONS: Record<string, LucideIcon> = {
  "badge-check": BadgeCheck,
  "book-open": BookOpen,
  bot: Bot,
  "building-2": Building2,
  "calendar-check": CalendarCheck,
  "calendar-days": CalendarDays,
  "calendar-range": CalendarRange,
  "clipboard-check": ClipboardCheck,
  cog: Cog,
  "file-check": FileCheck,
  "file-text": FileText,
  "graduation-cap": GraduationCap,
  history: History,
  landmark: Landmark,
  library: Library,
  lightbulb: Lightbulb,
  map: Map,
  "map-pin": MapPin,
  megaphone: Megaphone,
  microscope: Microscope,
  "monitor-play": MonitorPlay,
  "mouse-pointer-click": MousePointerClick,
  school: School,
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  sprout: Sprout,
  stethoscope: Stethoscope,
  users: Users,
};

export const ICON_NAMES = Object.keys(ICONS).sort();

export function iconFor(name: string | boolean | undefined): LucideIcon {
  if (typeof name === "string" && ICONS[name]) return ICONS[name];
  return Sparkles;
}
