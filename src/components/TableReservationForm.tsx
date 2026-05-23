"use client";

import { FormEvent, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import type { Table } from "@/lib/store";
import { getMinReservationDate, getMaxReservationDate } from "@/lib/utils";

interface TableReservationFormProps {
  dict: Dictionary;
  tables: Table[];
  defaultTableId?: number;
}

export function TableReservationForm({
  dict,
  tables,
  defaultTableId,
}: TableReservationFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [tableId, setTableId] = useState(defaultTableId?.toString() || "");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = new FormData(e.currentTarget);
    const payload = {
      table_id: Number(tableId || form.get("table_id")),
      name: form.get("name"),
      phone: form.get("phone"),
      email: form.get("email"),
      guests: Number(form.get("guests")),
      date: form.get("date"),
      time: form.get("time"),
      notes: form.get("notes") || undefined,
    };

    try {
      const res = await fetch("/api/reservations/table", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      (e.target as HTMLFormElement).reset();
      if (defaultTableId) setTableId(defaultTableId.toString());
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="card border-green-200 bg-green-50 text-center">
        <p className="text-lg font-semibold text-green-800">{dict.reserveTable.success}</p>
        <button
          type="button"
          className="btn-secondary mt-4"
          onClick={() => setStatus("idle")}
        >
          OK
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <p className="text-sm text-forest-600">{dict.reserveTable.rules}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">{dict.reserveTable.name} *</label>
          <input name="name" required className="input-field" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{dict.reserveTable.phone} *</label>
          <input name="phone" type="tel" required className="input-field" placeholder="07X XXX XXX" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{dict.reserveTable.email} *</label>
          <input name="email" type="email" required className="input-field" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{dict.reserveTable.guests} *</label>
          <input name="guests" type="number" min={1} max={6} required className="input-field" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">{dict.reserveTable.date} *</label>
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
          <label className="mb-1 block text-sm font-medium">{dict.reserveTable.time} *</label>
          <input name="time" type="time" required min="10:00" max="23:59" className="input-field" />
        </div>
      </div>

      {!defaultTableId && (
        <div>
          <label className="mb-1 block text-sm font-medium">{dict.reserveTable.table} *</label>
          <select
            name="table_id"
            required
            className="input-field"
            value={tableId}
            onChange={(e) => setTableId(e.target.value)}
          >
            <option value="">{dict.reserveTable.selectTable}</option>
            {tables.filter((t) => t.active).map((t) => (
              <option key={t.id} value={t.id}>
                Tavolina {t.number} ({t.capacity} persona)
              </option>
            ))}
          </select>
        </div>
      )}

      {defaultTableId && <input type="hidden" name="table_id" value={defaultTableId} />}

      <div>
        <label className="mb-1 block text-sm font-medium">{dict.reserveTable.notes}</label>
        <textarea name="notes" rows={3} className="input-field" />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{dict.reserveTable.error}</p>
      )}

      <button type="submit" disabled={status === "loading"} className="btn-primary w-full sm:w-auto">
        {status === "loading" ? "..." : dict.reserveTable.submit}
      </button>
    </form>
  );
}
