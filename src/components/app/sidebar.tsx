"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/nav";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-line bg-card px-4 py-7 lg:flex">
      <Link href="/dashboard" className="px-3">
        <span className="font-serif text-2xl italic text-ink">Italiano</span>
      </Link>

      <nav className="mt-8 flex flex-col gap-1">
        {NAV_ITEMS.map((it) => {
          const active =
            pathname === it.href || pathname.startsWith(it.href + "/");
          const Icon = it.icon;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-subtle text-ink"
                  : "text-ink-soft hover:bg-subtle/60 hover:text-ink",
              )}
            >
              <Icon
                className={cn("size-5", active && "text-brand")}
                strokeWidth={active ? 2.2 : 1.8}
              />
              {it.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
