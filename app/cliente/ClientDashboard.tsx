"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Booking,
  bookingStorageKey,
  findBookingParts,
  formatCurrency,
  formatDate
} from "@/src/lib/booking-data";

export function ClientDashboard() {
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(bookingStorageKey);
    setBooking(stored ? JSON.parse(stored) : null);
  }, []);

  const { barber, service } = useMemo(() => findBookingParts(booking), [booking]);

  function cancelBooking() {
    window.localStorage.removeItem(bookingStorageKey);
    setBooking(null);
  }

  return (
    <main className="min-h-screen bg-background text-on-surface">
      <aside className="fixed left-0 top-0 hidden h-full w-sidebar-width flex-col border-r border-outline-variant/10 bg-surface-container-low py-8 md:flex">
        <div className="mb-10 px-8">
          <Link href="/" className="font-headline-md text-headline-md font-bold text-primary">
            BarberPro
          </Link>
          <p className="mt-1 font-label-sm text-label-sm text-on-surface-variant">Area do cliente</p>
        </div>
        <nav className="flex-1 space-y-2">
          <Link className="flex items-center gap-4 border-l-2 border-primary bg-primary/5 px-6 py-3 text-primary" href="/cliente">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label-md text-label-md">Dashboard</span>
          </Link>
          <Link className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:text-primary" href="/agendamento">
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="font-label-md text-label-md">Novo agendamento</span>
          </Link>
          <Link className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:text-primary" href="/landing">
            <span className="material-symbols-outlined">storefront</span>
            <span className="font-label-md text-label-md">Servicos</span>
          </Link>
        </nav>
      </aside>

      <section className="min-h-screen md:ml-sidebar-width">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-outline-variant/10 bg-surface/90 px-4 backdrop-blur-md md:px-margin-desktop">
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-white">Minha agenda</h1>
            <p className="hidden text-label-sm text-on-surface-variant sm:block">Acompanhe seus horarios e historico.</p>
          </div>
          <Link href="/agendamento" className="rounded-lg bg-primary px-5 py-3 font-bold text-on-primary-fixed">
            Agendar
          </Link>
        </header>

        <div className="mx-auto max-w-container-max px-4 py-8 md:px-margin-desktop">
          <section className="mb-8">
            <h2 className="font-headline-lg text-headline-lg text-white">Ola, {booking?.customerName || "cliente"}!</h2>
            <p className="mt-2 text-on-surface-variant">
              {booking ? "Seu proximo atendimento esta organizado abaixo." : "Voce ainda nao tem um horario confirmado."}
            </p>
          </section>

          {booking && barber && service ? (
            <div className="grid gap-gutter lg:grid-cols-12">
              <article className="rounded-xl border border-primary/30 bg-surface-container-low p-6 lg:col-span-8">
                <span className="mb-4 inline-flex rounded-full bg-primary/15 px-3 py-1 font-label-sm text-label-sm uppercase tracking-widest text-primary">
                  Confirmado
                </span>
                <h3 className="font-headline-lg text-headline-lg text-white">{service.name}</h3>
                <p className="mt-2 text-on-surface-variant">{service.description}</p>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <Detail icon="calendar_today" label="Data" value={formatDate(booking.date)} />
                  <Detail icon="schedule" label="Horario" value={booking.time} />
                  <Detail icon="badge" label="Barbeiro" value={barber.name} />
                  <Detail icon="payments" label="Valor" value={formatCurrency(service.price)} />
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/agendamento"
                    className="rounded-lg bg-primary px-6 py-3 text-center font-bold text-on-primary-fixed"
                  >
                    Remarcar
                  </Link>
                  <button
                    type="button"
                    onClick={cancelBooking}
                    className="rounded-lg border border-outline-variant/30 px-6 py-3 text-on-surface-variant transition hover:border-error hover:text-error"
                  >
                    Cancelar horario
                  </button>
                </div>
              </article>

              <aside className="rounded-xl border border-outline-variant/20 bg-surface-container-low p-6 lg:col-span-4">
                <h3 className="font-headline-md text-headline-md text-white">Contato da reserva</h3>
                <div className="mt-5 space-y-4">
                  <Detail icon="person" label="Nome" value={booking.customerName} />
                  <Detail icon="call" label="Telefone" value={booking.customerPhone} />
                  {booking.notes && <Detail icon="notes" label="Observacoes" value={booking.notes} />}
                </div>
              </aside>
            </div>
          ) : (
            <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low p-8 text-center">
              <span className="material-symbols-outlined mb-4 text-6xl text-primary">event_available</span>
              <h3 className="font-headline-lg text-headline-lg text-white">Agende em poucos passos</h3>
              <p className="mx-auto mt-3 max-w-xl text-on-surface-variant">
                Escolha o barbeiro, servico, data e horario. Depois o resumo aparece aqui automaticamente.
              </p>
              <Link
                href="/agendamento"
                className="mt-6 inline-flex rounded-lg bg-primary px-6 py-3 font-bold text-on-primary-fixed"
              >
                Criar agendamento
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Detail({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-outline-variant/20 bg-surface p-4">
      <span className="material-symbols-outlined text-primary">{icon}</span>
      <span>
        <span className="block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
          {label}
        </span>
        <strong className="mt-1 block text-on-surface">{value}</strong>
      </span>
    </div>
  );
}
