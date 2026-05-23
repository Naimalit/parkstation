"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type {
  Store,
  MenuItem,
  Table,
  TableReservation,
  VenueReservation,
  ReservationStatus,
} from "@/lib/store";

type Tab = "reservations" | "menu" | "tables" | "qr";

export default function AdminDashboard() {
  const router = useRouter();
  const [store, setStore] = useState<Store | null>(null);
  const [tab, setTab] = useState<Tab>("reservations");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/store");
    if (res.status === 401) {
      router.push("/admin");
      return;
    }
    setStore(await res.json());
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  async function save(updated: Store) {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/store", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (res.ok) {
      setStore(updated);
      setMessage("U ruajt!");
    } else {
      setMessage("Gabim gjatë ruajtjes");
    }
    setSaving(false);
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin");
  }

  if (!store) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <p>Duke u ngarkuar...</p>
      </div>
    );
  }

  function updateReservationStatus(
    type: "table" | "venue",
    id: string,
    status: ReservationStatus
  ) {
    if (!store) return;
    if (type === "table") {
      const tableReservations = store.tableReservations.map((r) =>
        r.id === id ? { ...r, status } : r
      );
      save({ ...store, tableReservations });
    } else {
      const venueReservations = store.venueReservations.map((r) =>
        r.id === id ? { ...r, status } : r
      );
      save({ ...store, venueReservations });
    }
  }

  function updateTableCapacity(id: number, capacity: 2 | 4 | 6) {
    if (!store) return;
    const tables = store.tables.map((t) =>
      t.id === id ? { ...t, capacity } : t
    );
    save({ ...store, tables });
  }

  function updateMenuItem(id: string, field: keyof MenuItem, value: unknown) {
    if (!store) return;
    const menuItems = store.menuItems.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setStore({ ...store, menuItems });
  }

  function saveMenu() {
    if (!store) return;
    save(store);
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-forest-100 bg-white">
        <div className="rainbow-bar" />
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="font-display text-xl font-bold text-forest-800">Admin Panel</h1>
            <p className="text-sm text-forest-600">Park Station @ Park Chair</p>
          </div>
          <button onClick={logout} className="btn-secondary text-sm">
            Dil
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6 flex flex-wrap gap-2">
          {(
            [
              ["reservations", "Rezervimet"],
              ["menu", "Menu"],
              ["tables", "Tavolinat"],
              ["qr", "QR Codes"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                tab === key
                  ? "bg-forest-700 text-white"
                  : "bg-white text-forest-700 hover:bg-forest-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {message && (
          <p className="mb-4 rounded-lg bg-green-50 px-4 py-2 text-sm text-green-800">
            {message}
          </p>
        )}

        {tab === "reservations" && (
          <div className="space-y-8">
            <section>
              <h2 className="mb-4 text-lg font-bold">Rezervime Tavolinash</h2>
              {store.tableReservations.length === 0 ? (
                <p className="text-forest-600">Asnjë rezervim ende.</p>
              ) : (
                <div className="space-y-3">
                  {[...store.tableReservations].reverse().map((r) => (
                    <ReservationCard
                      key={r.id}
                      reservation={r}
                      table={store.tables.find((t) => t.id === r.table_id)}
                      onStatus={(s) => updateReservationStatus("table", r.id, s)}
                    />
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="mb-4 text-lg font-bold">Rezervime Lokale</h2>
              {store.venueReservations.length === 0 ? (
                <p className="text-forest-600">Asnjë rezervim ende.</p>
              ) : (
                <div className="space-y-3">
                  {[...store.venueReservations].reverse().map((r) => (
                    <VenueCard
                      key={r.id}
                      reservation={r}
                      onStatus={(s) => updateReservationStatus("venue", r.id, s)}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {tab === "menu" && (
          <div>
            <p className="mb-4 text-sm text-forest-600">
              Ndryshoni çmimet dhe emrat. Klikoni Ruaj pas ndryshimeve.
            </p>
            {store.categories
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((cat) => (
                <div key={cat.id} className="mb-8">
                  <h2 className="mb-3 font-bold text-forest-800">{cat.name_sq}</h2>
                  <div className="space-y-2">
                    {store.menuItems
                      .filter((i) => i.category_id === cat.id)
                      .map((item) => (
                        <div key={item.id} className="card flex flex-wrap items-center gap-3 !py-3">
                          <input
                            className="input-field flex-1 min-w-[120px]"
                            value={item.name_sq}
                            onChange={(e) => updateMenuItem(item.id, "name_sq", e.target.value)}
                          />
                          {!item.is_mixer && (
                            <>
                              <input
                                type="number"
                                className="input-field w-24"
                                value={item.price}
                                onChange={(e) =>
                                  updateMenuItem(item.id, "price", Number(e.target.value))
                                }
                              />
                              {item.price_large !== undefined && (
                                <input
                                  type="number"
                                  className="input-field w-24"
                                  placeholder="Madhe"
                                  value={item.price_large}
                                  onChange={(e) =>
                                    updateMenuItem(item.id, "price_large", Number(e.target.value))
                                  }
                                />
                              )}
                            </>
                          )}
                          <label className="flex items-center gap-1 text-sm">
                            <input
                              type="checkbox"
                              checked={item.active}
                              onChange={(e) =>
                                updateMenuItem(item.id, "active", e.target.checked)
                              }
                            />
                            Aktiv
                          </label>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            <button onClick={saveMenu} disabled={saving} className="btn-primary">
              {saving ? "Duke ruajtur..." : "Ruaj Menynë"}
            </button>
          </div>
        )}

        {tab === "tables" && (
          <div className="grid gap-3 sm:grid-cols-2">
            {store.tables.map((t) => (
              <div key={t.id} className="card flex items-center justify-between">
                <span className="font-semibold">Tavolina {t.number}</span>
                <select
                  value={t.capacity}
                  onChange={(e) =>
                    updateTableCapacity(t.id, Number(e.target.value) as 2 | 4 | 6)
                  }
                  className="input-field w-auto"
                >
                  <option value={2}>2 persona</option>
                  <option value={4}>4 persona</option>
                  <option value={6}>6 persona</option>
                </select>
              </div>
            ))}
          </div>
        )}

        {tab === "qr" && (
          <div className="card text-center">
            <h2 className="text-lg font-bold">QR Codes për Tavolina</h2>
            <p className="mt-2 text-sm text-forest-600">
              Shkarkoni dhe printoni QR codes për të 10 tavolinat. Vendosini në çdo tavolinë.
            </p>
            <a
              href="/api/admin/qr/print"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-6 inline-flex"
            >
              Hap & Printo QR Codes (PDF)
            </a>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
              {store.tables.map((t) => (
                <div key={t.id} className="rounded-xl border p-3">
                  <p className="text-sm font-medium">Tavolina {t.number}</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/api/admin/qr?table=${t.id}`}
                    alt={`QR ${t.number}`}
                    className="mx-auto mt-2"
                    width={120}
                    height={120}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ReservationStatus }) {
  const colors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
}

function ReservationCard({
  reservation: r,
  table,
  onStatus,
}: {
  reservation: TableReservation;
  table?: Table;
  onStatus: (s: ReservationStatus) => void;
}) {
  return (
    <div className="card !py-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-semibold">{r.name}</p>
          <p className="text-sm text-forest-600">
            Tavolina {table?.number ?? r.table_id} · {r.guests} persona · {r.date} {r.time}
          </p>
          <p className="text-sm">
            <a href={`tel:${r.phone}`} className="text-forest-700 hover:underline">
              {r.phone}
            </a>
            {" · "}
            {r.email}
          </p>
          {r.notes && <p className="mt-1 text-sm italic text-forest-500">{r.notes}</p>}
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={r.status} />
          {r.status === "pending" && (
            <>
              <button
                onClick={() => onStatus("confirmed")}
                className="rounded-lg bg-green-600 px-3 py-1 text-xs text-white"
              >
                Konfirmo
              </button>
              <button
                onClick={() => onStatus("cancelled")}
                className="rounded-lg bg-red-500 px-3 py-1 text-xs text-white"
              >
                Anulo
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function VenueCard({
  reservation: r,
  onStatus,
}: {
  reservation: VenueReservation;
  onStatus: (s: ReservationStatus) => void;
}) {
  return (
    <div className="card !py-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-semibold">{r.name}</p>
          <p className="text-sm text-forest-600">
            {r.event_type} · {r.guests} të ftuar · {r.date} {r.time}
          </p>
          <p className="text-sm">
            <a href={`tel:${r.phone}`} className="text-forest-700 hover:underline">
              {r.phone}
            </a>
            {" · "}
            {r.email}
          </p>
          {r.notes && <p className="mt-1 text-sm italic text-forest-500">{r.notes}</p>}
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={r.status} />
          {r.status === "pending" && (
            <>
              <button
                onClick={() => onStatus("confirmed")}
                className="rounded-lg bg-green-600 px-3 py-1 text-xs text-white"
              >
                Konfirmo
              </button>
              <button
                onClick={() => onStatus("cancelled")}
                className="rounded-lg bg-red-500 px-3 py-1 text-xs text-white"
              >
                Anulo
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
