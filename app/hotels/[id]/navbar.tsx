// TODO: Clean up
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const items = [
    { id: "overview", label: "Tổng quan" },
    { id: "available-rooms", label: "Phòng" },
    { id: "location", label: "Vị trí" },
    { id: "facilities", label: "Tiện ích" },
    { id: "policy", label: "Chính sách" },
    { id: "review", label: "Đánh giá" },
  ];

  const [active, setActive] = useState<string>(() =>
    typeof window !== "undefined" && window.location.hash ? window.location.hash.slice(1) : "overview"
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleHash = () =>
      setActive(window.location.hash ? window.location.hash.slice(1) : "overview");
    window.addEventListener("hashchange", handleHash);

    const sectionIds = items.map((i) => i.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) {
      // no sections on the page: keep hash handling only
      handleHash();
      return () => window.removeEventListener("hashchange", handleHash);
    }

    // Use midpoint logic: mark the section whose top is above (<=) half the viewport height,
    // choosing the one closest to the midpoint from above; if none, choose the closest to midpoint.
    const observer = new IntersectionObserver(
      () => {
        if (typeof window === "undefined") return;
        const mid = window.innerHeight / 2;
        const candidates = sections.map((s) => ({ el: s, top: s.getBoundingClientRect().top }));

        // Pick sections whose top is above or equal to midpoint
        const aboveMid = candidates.filter((c) => c.top <= mid);
        if (aboveMid.length > 0) {
          // choose the one closest to mid from above (largest top)
          aboveMid.sort((a, b) => b.top - a.top);
          setActive(aboveMid[0].el.id);
          return;
        }

        // If none are above mid, pick the section closest to mid (either below or above)
        candidates.sort((a, b) => Math.abs(a.top - mid) - Math.abs(b.top - mid));
        setActive(candidates[0].el.id);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((s) => observer.observe(s));

    // initial selection based on midpoint
    {
      const mid = window.innerHeight / 2;
      const candidates = sections.map((s) => ({ el: s, top: s.getBoundingClientRect().top }));
      const aboveMid = candidates.filter((c) => c.top <= mid);
      if (aboveMid.length > 0) {
        aboveMid.sort((a, b) => b.top - a.top);
        setActive(aboveMid[0].el.id);
      } else {
        candidates.sort((a, b) => Math.abs(a.top - mid) - Math.abs(b.top - mid));
        setActive(candidates[0].el.id);
      }
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", handleHash);
    };
    // items are static here; join id list to satisfy exhaustive-deps behavior if needed
  }, [items.map((i) => i.id).join(",")]);

  return (
    <nav className="content">
      <ul className="flex space-x-3 font-bold text-sm">
        {items.map((it) => (
          <li key={it.id} className="px-4 pt-4">
            <a
              href={`#${it.id}`}
              className={cn(
                "pb-2 border-b-2 hover:text-primary hover:border-primary",
                active === it.id
                  ? "text-primary border-primary"
                  : "text-gray-600 border-transparent"
              )}
              aria-current={active === it.id ? "page" : undefined}
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}