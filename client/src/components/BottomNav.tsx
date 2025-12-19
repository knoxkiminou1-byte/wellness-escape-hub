import type React from "react";
import { Link, useLocation } from "wouter";
import { Home, Dumbbell, Flame, Calendar, CheckSquare, User } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const NAV: NavItem[] = [
  { href: "/app", label: "Home", icon: Home },
  { href: "/program", label: "Program", icon: Dumbbell },
  { href: "/work-it", label: "Progress", icon: Flame },
  { href: "/schedule", label: "Schedule", icon: Calendar },
  { href: "/habits", label: "Habits", icon: CheckSquare },
  { href: "/profile", label: "Account", icon: User },
];

export function BottomNav() {
  const [location] = useLocation();

  const isActive = (href: string) => {
    if (href === "/app") return location === "/app";
    if (href === "/work-it") return location.startsWith("/work-it");
    return location.startsWith(href);
  };

  return (
    <nav className="bottom-nav">
      <div className="mx-auto max-w-5xl px-2">
        <div className="grid grid-cols-6 py-2">
          {NAV.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`bottom-nav-item ${active ? "bottom-nav-item-active" : "bottom-nav-item-inactive"}`}
                aria-current={active ? "page" : undefined}
              >
                <Icon className={`h-5 w-5 ${active ? "text-primary" : ""}`} />
                <span className="leading-none text-[10px] sm:text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
