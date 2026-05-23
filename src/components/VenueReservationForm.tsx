"use client";

import { FormEvent, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { siteConfig } from "@/lib/config";
import { getMinReservationDate, getMaxReservationDate } from "@/lib/utils";

interface VenueReservationFormProps {
  dict: Dictionary;
}

export function VenueReservationForm({ dict }: VenueReservationFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      phone: form.get("phone"),
      email: form.get("email"),
      guests: Number(form.get("guests")),
      date: form.get("date"),
      time: form.get("time"),
      event_type: form.get("event_type"),
      notes: form.get("notes") || undefined,
    };

    try {
      const res = await fetch("/api/reservations/venue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card border-green-200 bg-green-50 text-center">
        <p className="text-lg font-semibold text-green-800">{dict.reserveVenue.success}</p>
        <button type="button" className="btn-secondary mt-4" onClick={() => setStatus("idle")}>
          OK
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <p className="text-sm text-forest-600">{dict.reserveVenue.priceNote}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">{dict.reserveVenue.name} *</label>
          <input name="name" required className="input-field" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{dict.reserveVenue.phone} *</label>
          <input name="phone" type="tel" required className="input-field" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{dict.reserveVenue.email} *</label>
          <input name="email" type="email" required className="input-field" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{dict.reserveVenue.guests} *</label>
          <input
            name="guests"
            type="number"
            min={1}
            max={siteConfig.maxVenueGuests}
            required
            className="input-field"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{dict.reserveVenue.date} *</label>
          <input
            name="date"
            type="date"
            required
            min={getMinReservationDate()}
            max={getMaxReservationDate()}
            className="input-field"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{dict.reserveVenue.time} *</label>
          <input name="time" type="time" required min="10:00" max="23:59" className="input-field" />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">{dict.reserveVenue.eventType} *</label>
        <select name="event_type" required className="input-field">
          <option value="birthday">{dict.reserveVenue.eventBirthday}</option>
          <option value="meeting">{dict.reserveVenue.eventMeeting}</option>
          <option value="work">{dict.reserveVenue.eventWork}</option>
          <option value="other">{dict.reserveVenue.eventOther}</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">{dict.reserveVenue.notes}</label>
        <textarea name="notes" rows={3} className="input-field" />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{dict.reserveVenue.error}</p>
      )}

      <button type="submit" disabled={status === "loading"} className="btn-primary w-full sm:w-auto">
        {status === "loading" ? "..." : dict.reserveVenue.submit}
      </button>
    </form>
  );
}
