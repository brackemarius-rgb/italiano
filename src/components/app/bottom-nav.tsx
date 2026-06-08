"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/nav";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-card/95 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-[760px]">
        {NAV_ITEMS.map((it) => {
          const active =
            pathname === it.href || pathname.startsWith(it.href + "/");
          const Icon = it.icon;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] text-[11px] font-medium transition-colors",
                active ? "text-ink" : "text-ink-faint hover:text-ink-soft",
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
      </div>
    </nav>
  );
}
