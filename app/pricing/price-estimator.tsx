"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  defaultSelection,
  formatPrice,
  rates,
  type PriceItem,
} from "@/lib/pricing";
import { whatsappLink } from "@/lib/site";

type Selection = Record<string, number>;

export function PriceEstimator() {
  const [yearIndex, setYearIndex] = useState(0);
  const [selection, setSelection] = useState<Selection>(defaultSelection);
  const [barVisible, setBarVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const year = rates[yearIndex];
  const allItems = useMemo(() => year.groups.flatMap((g) => g.items), [year]);

  const lines = allItems
    .filter((item) => (selection[item.id] ?? 0) > 0)
    .map((item) => {
      const qty = selection[item.id];
      return { item, qty, total: item.price * qty };
    });
  const total = lines.reduce((sum, l) => sum + l.total, 0);

  const bridal = allItems.find((i) => i.id === "dressing-bridal");

  // Mobile: show a bottom bar with the total while the estimator is on screen
  // and the full summary card is not.
  useEffect(() => {
    const section = sectionRef.current;
    const summary = summaryRef.current;
    if (!section || !summary) return;
    let inSection = false;
    let summarySeen = false;
    const update = () => setBarVisible(inSection && !summarySeen);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === section) inSection = e.isIntersecting;
        if (e.target === summary) summarySeen = e.isIntersecting;
      }
      update();
    });
    io.observe(section);
    io.observe(summary);
    return () => io.disconnect();
  }, []);

  function toggle(item: PriceItem) {
    setSelection((s) => ({ ...s, [item.id]: s[item.id] ? 0 : 1 }));
  }

  function setQty(item: PriceItem, qty: number) {
    setSelection((s) => ({ ...s, [item.id]: Math.max(0, Math.min(20, qty)) }));
  }

  const message = [
    `Hello! I'd like a quotation based on your ${year.year} rates:`,
    "",
    ...lines.map(
      (l) =>
        `• ${l.item.label}${groupSuffix(l.item.id)}${l.qty > 1 ? ` × ${l.qty}` : ""}: ${formatPrice(l.total)}`,
    ),
    "",
    `Estimated total: ${formatPrice(total)}`,
    "Wedding date: ",
  ].join("\n");

  return (
    <div ref={sectionRef}>
      {/* Year switch */}
      <div className="flex flex-col items-center">
        <div
          role="radiogroup"
          aria-label="Rates for year"
          className="relative grid grid-cols-2 border border-line bg-paper p-1"
        >
          <span
            aria-hidden
            className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] bg-ink transition-transform duration-500 ease-[cubic-bezier(0.2,0.6,0.2,1)]"
            style={{ transform: `translateX(${yearIndex * 100}%)` }}
          />
          {rates.map((r, i) => (
            <button
              key={r.year}
              type="button"
              role="radio"
              aria-checked={i === yearIndex}
              onClick={() => setYearIndex(i)}
              className={`relative z-10 px-10 py-3 text-[0.72rem] uppercase tracking-[0.3em] transition-colors duration-500 ${
                i === yearIndex ? "text-paper" : "text-stone hover:text-ink"
              }`}
            >
              {r.year}
            </button>
          ))}
        </div>

        {bridal ? (
          <div className="mt-12 text-center">
            <p className="eyebrow">Bridal dressing · {year.year}</p>
            <p
              key={year.year}
              className="display rise mt-3 text-6xl tabular-nums lining-nums sm:text-7xl"
            >
              {formatPrice(bridal.price)}
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-20 grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Price menu */}
        <div className="space-y-16 lg:col-span-7">
          <p className="text-sm text-stone">
            Tick what you need to build an estimate. Use + and − for
            bridesmaids, flower girls and rental days.
          </p>
          {year.groups.map((group, gi) => (
            <section key={group.id} aria-labelledby={`group-${group.id}`}>
              <div className="flex items-baseline gap-5 border-b border-ink pb-4">
                <span className="display text-3xl text-gold">0{gi + 1}</span>
                <div>
                  <h2 id={`group-${group.id}`} className="display text-3xl">
                    {group.title}
                  </h2>
                  <p className="mt-1 text-sm text-stone">{group.description}</p>
                </div>
              </div>
              <ul>
                {group.items.map((item) => (
                  <PriceRow
                    key={item.id}
                    item={item}
                    qty={selection[item.id] ?? 0}
                    onToggle={() => toggle(item)}
                    onQty={(q) => setQty(item, q)}
                  />
                ))}
              </ul>
              {group.note ? (
                <p className="mt-4 text-sm text-stone">{group.note}</p>
              ) : null}
            </section>
          ))}
        </div>

        {/* Estimate */}
        <aside className="lg:col-span-5">
          <div
            ref={summaryRef}
            className="border border-line bg-paper p-8 lg:sticky lg:top-28 lg:p-10"
          >
            <div className="flex items-baseline justify-between">
              <h2 className="eyebrow">Your estimate</h2>
              <span className="text-xs tracking-[0.2em] text-stone">
                {year.year} RATES
              </span>
            </div>

            {lines.length ? (
              <ul className="mt-6 space-y-3 text-sm">
                {lines.map((l) => (
                  <li key={l.item.id} className="flex justify-between gap-4">
                    <span>
                      {l.item.label}
                      <span className="text-stone">{groupSuffix(l.item.id)}</span>
                      {l.qty > 1 ? (
                        <span className="text-stone"> × {l.qty}</span>
                      ) : null}
                    </span>
                    <span className="whitespace-nowrap tabular-nums lining-nums">
                      {formatPrice(l.total)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 text-sm text-stone">
                Nothing selected yet. Tick an item to begin.
              </p>
            )}

            <div className="mt-8 flex items-end justify-between border-t border-line pt-6">
              <span className="text-[0.7rem] uppercase tracking-[0.24em] text-stone">
                Estimated total
              </span>
              <span
                aria-live="polite"
                className="display text-4xl tabular-nums lining-nums"
              >
                {formatPrice(total)}
              </span>
            </div>

            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!lines.length}
              className={`btn btn-dark mt-8 w-full ${
                lines.length ? "" : "pointer-events-none opacity-40"
              }`}
            >
              Send estimate on WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setSelection({})}
              className="mt-4 w-full text-center text-xs uppercase tracking-[0.2em] text-stone hover:text-ink"
            >
              Clear selection
            </button>
            <p className="mt-6 text-xs leading-relaxed text-stone">
              An estimate from our published rates. The studio confirms your
              final quotation.
            </p>
          </div>
        </aside>
      </div>

      {/* Mobile total bar */}
      <div
        aria-hidden={!barVisible}
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-5 py-3 backdrop-blur-md transition-transform duration-500 lg:hidden ${
          barVisible && lines.length ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.62rem] uppercase tracking-[0.24em] text-stone">
              Estimate · {lines.length} item{lines.length === 1 ? "" : "s"}
            </p>
            <p className="display text-2xl tabular-nums lining-nums">{formatPrice(total)}</p>
          </div>
          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={barVisible ? 0 : -1}
            className="btn btn-dark !px-5 !py-3"
          >
            Send
          </a>
        </div>
      </div>
    </div>
  );
}

/** Adds context like "(bouquet)" so "Bridal" is unambiguous in the summary. */
function groupSuffix(id: string) {
  if (id.startsWith("dressing-")) return " dressing";
  if (id.startsWith("bouquet-")) return " bouquet";
  return "";
}

function PriceRow({
  item,
  qty,
  onToggle,
  onQty,
}: {
  item: PriceItem;
  qty: number;
  onToggle: () => void;
  onQty: (q: number) => void;
}) {
  const selected = qty > 0;
  return (
    <li
      className={`border-b border-line transition-colors duration-300 ${
        selected ? "bg-paper" : ""
      }`}
    >
      <div className="flex items-center gap-4 py-5 sm:px-3">
        <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-4">
          <input
            type="checkbox"
            checked={selected}
            onChange={onToggle}
            className="peer sr-only"
          />
          <span
            aria-hidden
            className="flex h-5 w-5 shrink-0 items-center justify-center border border-stone/50 transition-colors peer-checked:border-ink peer-checked:bg-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold"
          >
            <svg
              viewBox="0 0 12 10"
              className={`h-2.5 w-2.5 text-paper transition-opacity ${
                selected ? "opacity-100" : "opacity-0"
              }`}
            >
              <path
                d="M1 5l3.5 3.5L11 1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block">{item.label}</span>
            {item.unit ? (
              <span className="block text-xs text-stone">{item.unit}</span>
            ) : null}
          </span>
          <span
            aria-hidden
            className="mb-1.5 hidden flex-1 self-end border-b border-dotted border-stone/40 sm:block"
          />
        </label>
        <span className="display shrink-0 text-xl tabular-nums lining-nums sm:text-2xl">
          {formatPrice(item.price)}
        </span>
      </div>

      {item.countable && selected ? (
        <div className="flex items-center justify-end gap-3 pb-5 sm:px-3">
          <span className="text-xs text-stone">
            {item.countLabel ?? "quantity"}
          </span>
          <div className="flex items-center border border-line bg-ivory">
            <button
              type="button"
              aria-label={`Fewer ${item.countLabel ?? ""}`}
              onClick={() => onQty(qty - 1)}
              className="h-9 w-9 text-lg text-stone hover:text-ink"
            >
              −
            </button>
            <span
              aria-live="polite"
              aria-label={`${qty} ${item.countLabel ?? ""}`}
              className="w-8 text-center tabular-nums lining-nums"
            >
              {qty}
            </span>
            <button
              type="button"
              aria-label={`More ${item.countLabel ?? ""}`}
              onClick={() => onQty(qty + 1)}
              className="h-9 w-9 text-lg text-stone hover:text-ink"
            >
              +
            </button>
          </div>
        </div>
      ) : null}
    </li>
  );
}
