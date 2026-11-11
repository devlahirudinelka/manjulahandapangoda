"use client";

import { useState } from "react";
import { formatPrice, priceLists } from "@/lib/pricing";
import { whatsappLink } from "@/lib/site";

export function PricingTabs() {
  const [active, setActive] = useState(priceLists[0].id);
  const list = priceLists.find((l) => l.id === active) ?? priceLists[0];

  return (
    <div>
      <div
        role="group"
        aria-label="Choose a price list"
        className="flex flex-wrap justify-center gap-2"
      >
        {priceLists.map((l) => (
          <button
            key={l.id}
            type="button"
            aria-pressed={active === l.id}
            onClick={() => setActive(l.id)}
            className={`px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.24em] transition-colors ${
              active === l.id ? "bg-ink text-paper" : "text-stone hover:text-ink"
            }`}
          >
            {l.tab}
          </button>
        ))}
      </div>

      <div className="mt-16">
        <div className="text-center">
          <h2 className="display text-4xl sm:text-5xl">{list.title}</h2>
          <p className="mt-4 text-stone">{list.intro}</p>
        </div>

        <div className="mt-14 space-y-14">
          {list.groups.map((group) => (
            <table key={group.title} data-reveal className="w-full border-collapse">
              <caption className="eyebrow border-b border-ink pb-4 text-left">
                {group.title}
              </caption>
              <tbody>
                {group.items.map((item) => (
                  <tr key={item.label} className="border-b border-line">
                    <th scope="row" className="py-5 pr-4 text-left font-light">
                      {item.label}
                      {item.note ? (
                        <span className="ml-3 text-sm text-stone">{item.note}</span>
                      ) : null}
                    </th>
                    <td className="display py-5 text-right text-2xl tabular-nums lining-nums whitespace-nowrap">
                      {formatPrice(item.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>

        <div className="mt-16 border border-line bg-paper p-8 lg:p-10">
          <h3 className="eyebrow">Good to know</h3>
          <ul className="mt-6 space-y-4 leading-relaxed text-stone">
            {list.notes.map((note) => (
              <li key={note} className="flex gap-4">
                <span aria-hidden className="mt-3 h-px w-5 shrink-0 bg-gold" />
                {note}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 text-center">
          <a
            href={whatsappLink(
              `Hello! I'd like a quotation based on the ${list.title}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark"
          >
            Request a quotation
          </a>
        </div>
      </div>
    </div>
  );
}
