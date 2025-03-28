// src/components/layout/MobileLayout.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Home, BookOpen, Search, BarChart3, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileLayoutProps {
  children: React.ReactNode;
  activeTab?: "home" | "learning" | "search" | "statistics" | "menu";
  // Use the primary light blue background by default
  bodyClassName?: string;
}

const navItems = [
  { href: "/", label: "Home", icon: Home, key: "home" },
  { href: "/learning", label: "Learning", icon: BookOpen, key: "learning" },
  { href: "/search", label: "Search", icon: Search, key: "search" },
  {
    href: "/statistics",
    label: "Statistics",
    icon: BarChart3,
    key: "statistics",
  },
  { href: "/menu", label: "Menu", icon: Menu, key: "menu" },
] as const;

export default function MobileLayout({
  children,
  activeTab = "home",
  // Default to the light blue background from the design system
  bodyClassName = "bg-primary-light-bg",
}: MobileLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Apply background to main content area */}
      <main className={cn("flex-1 pb-16", bodyClassName)}>{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t border-gray-200 shadow-[0_-1px_4px_rgba(0,0,0,0.06)]">
        <div className="grid h-full grid-cols-5">
          {navItems.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center transition-colors duration-150 ease-in-out group",
                  // Use primary color for active, muted for inactive
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon
                  size={24}
                  // Make active icon slightly bolder or filled if possible
                  strokeWidth={isActive ? 2.5 : 2}
                  className={cn(isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")}
                />
                {/* Ensure text color also changes */}
                <span className={cn(
                    "mt-1 text-[10px] font-medium",
                     isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )}
                >
                    {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
