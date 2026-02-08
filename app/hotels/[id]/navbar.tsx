// TODO: Clean up
"use client";

import { useEffect, useState } from "react";

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

    // IntersectionObserver picks the most visible section; rootMargin biases selection toward center of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActive(visible[0].target.id);
          return;
        }

        // If nothing intersects (e.g., between sections), pick the section whose top is closest to viewport top
        let closest = sections[0];
        let min = Math.abs(sections[0].getBoundingClientRect().top);
        for (let i = 1; i < sections.length; i++) {
          const t = Math.abs(sections[i].getBoundingClientRect().top);
          if (t < min) {
            min = t;
            closest = sections[i];
          }
        }
        setActive(closest.id);
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px", // treats a section as "visible" when roughly centered
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((s) => observer.observe(s));

    // initial selection based on current scroll position
    {
      let closest = sections[0];
      let min = Math.abs(sections[0].getBoundingClientRect().top);
      for (let i = 1; i < sections.length; i++) {
        const t = Math.abs(sections[i].getBoundingClientRect().top);
        if (t < min) {
          min = t;
          closest = sections[i];
        }
      }
      setActive(closest.id);
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
              className={`transition-colors ${
                active === it.id ? "underline decoration-blue-500 underline-offset-4" : ""
              }`}
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