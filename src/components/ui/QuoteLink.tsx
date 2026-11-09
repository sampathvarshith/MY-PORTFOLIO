"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import type { EnquiryServiceId } from "@/content/services";
import { buttonClass } from "./Button";

export const SELECT_SERVICE_EVENT = "vt:select-service";

/**
 * "Request a Quote" / "Discuss This Service" link. Scrolls to the enquiry form and preselects
 * the service; works from any page via `/?service=<id>#contact`.
 */
export function QuoteLink({
  service,
  children,
  variant = "outline",
  className = "",
  plain = false,
}: {
  service?: EnquiryServiceId;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  plain?: boolean;
}) {
  const pathname = usePathname();
  const href = service ? `/?service=${service}#contact` : "/#contact";

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/" || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const target = document.getElementById("contact");
    if (!target) return;
    e.preventDefault();
    window.history.replaceState(null, "", href);
    if (service) window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: service }));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <Link href={href} onClick={onClick} className={plain ? className : buttonClass(variant, className)}>
      {children}
    </Link>
  );
}
