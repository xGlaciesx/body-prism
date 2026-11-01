"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import type { Claim, LensCard, LensId } from "@/lib/schema";
import { EvidenceBadge } from "@/components/evidence-badge";

type Tone = "structure" | "relationship" | "information";

type TabDef = { id: LensId; label: string; tone: Tone };

const tabs: TabDef[] = [
  { id: "structure", label: "结构之镜", tone: "structure" },
  { id: "relationship", label: "关系之镜", tone: "relationship" },
  { id: "information", label: "信息之镜", tone: "information" },
];

const toneActive: Record<Tone, string> = {
  structure: "border-structure text-structure",
  relationship: "border-relationship text-relationship",
  information: "border-information text-information",
};

function isLensId(value: string): value is LensId {
  return value === "structure" || value === "relationship" || value === "information";
}

type LensTabsProps = {
  lenses: {
    structure: LensCard;
    relationship: LensCard;
    information: LensCard;
  };
  claims: Claim[];
};

export function LensTabs({ lenses, claims }: LensTabsProps) {
  const [active, setActive] = useState<LensId>("structure");

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.replace("#", "");
      if (isLensId(hash)) setActive(hash);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const select = (id: LensId) => {
    setActive(id);
    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, "", `#${id}`);
    }
  };

  const onKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const dir = event.key === "ArrowRight" ? 1 : -1;
    select(tabs[(index + dir + tabs.length) % tabs.length].id);
  };

  const card = lenses[active];
  const activeClaims = claims.filter((c) => card.claimIds.includes(c.id));

  return (
    <section className="mt-8">
      <div
        role="tablist"
        aria-label="三种读法"
        className="flex gap-2 border-b border-line"
      >
        {tabs.map((tab, i) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(tab.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? toneActive[tab.tone]
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={`panel-${active}`}
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        aria-live="polite"
        className="mt-6"
      >
        <h3 className="font-serif text-2xl font-semibold">{card.title}</h3>
        <p className="mt-3 leading-relaxed text-ink/90">{card.body}</p>

        <ul className="mt-6 space-y-4">
          {activeClaims.map((claim) => (
            <li
              key={claim.id}
              className="rounded-xl border border-line bg-paper-2 p-5"
            >
              <EvidenceBadge level={claim.evidenceLevel} />
              <p className="mt-3 text-ink">{claim.text}</p>
              {claim.caveat ? (
                <p className="mt-2 text-sm text-muted">⚠ {claim.caveat}</p>
              ) : null}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted">
                <span>来源：</span>
                {claim.sourceIds.map((id) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="font-mono text-xs text-information hover:underline"
                  >
                    {id}
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}