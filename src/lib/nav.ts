import { BookOpen, Layers, Sun, User, type LucideIcon } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Heute", icon: Sun },
  { href: "/vocab", label: "Vokabeln", icon: Layers },
  { href: "/grammar", label: "Grammatik", icon: BookOpen },
  { href: "/profile", label: "Profil", icon: User },
];
