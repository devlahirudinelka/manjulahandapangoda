"use client";

import { useState } from "react";
import { site, whatsappLink } from "@/lib/site";

const styles = [
  "Kandyan Bridal",
  "Western Bridal",
  "Indian Bridal",
  "Bridal Hair & Makeup",
  "Homecoming / Engagement",
  "Occasion Dressing",
];

const field =
  "mt-2 w-full border-0 border-b border-line bg-transparent px-0 py-3 text-ink placeholder:text-stone/60 focus:border-ink focus:ring-0 focus:outline-none";
const label = "text-[0.68rem] uppercase tracking-[0.24em] text-stone";

/**
 * Builds a message from the form and opens WhatsApp (or email) with it,
 * so no server or email service is needed.
 */
export function EnquiryForm() {
  const [sent, setSent] = useState(false);

  function buildMessage(form: HTMLFormElement) {
    const data = new FormData(form);
    const lines = [
      "Hello Manjula! I'd like to make a bridal enquiry.",
      "",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Wedding date: ${data.get("date") || "Not set yet"}`,
      `Style: ${data.get("style")}`,
      `Venue / location: ${data.get("venue") || "-"}`,
    ];
    const note = String(data.get("message") || "").trim();
    if (note) lines.push("", note);
    return lines.join("\n");
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    window.open(whatsappLink(buildMessage(e.currentTarget)), "_blank", "noopener");
    setSent(true);
  }

  function sendEmail(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.form;
    if (!form || !form.reportValidity()) return;
    const body = encodeURIComponent(buildMessage(form));
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Bridal enquiry")}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2">
      <label className="block">
        <span className={label}>Your name</span>
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="block">
        <span className={label}>Phone</span>
        <input name="phone" type="tel" required autoComplete="tel" className={field} />
      </label>
      <label className="block">
        <span className={label}>Wedding date</span>
        <input name="date" type="date" className={field} />
      </label>
      <label className="block">
        <span className={label}>Style</span>
        <select name="style" className={field} defaultValue={styles[0]}>
          {styles.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>Venue or location</span>
        <input name="venue" className={field} />
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>Tell us about your day</span>
        <textarea
          name="message"
          rows={4}
          className={`${field} resize-none`}
          placeholder="Outfit, number of looks, bridesmaids, anything you have in mind"
        />
      </label>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-dark">
          Send on WhatsApp
        </button>
        <button type="button" onClick={sendEmail} className="btn btn-line">
          Send by email
        </button>
      </div>
      {sent ? (
        <p role="status" className="text-sm text-stone sm:col-span-2">
          Your message is ready to send. We’ll reply as soon as we can.
        </p>
      ) : null}
    </form>
  );
}
