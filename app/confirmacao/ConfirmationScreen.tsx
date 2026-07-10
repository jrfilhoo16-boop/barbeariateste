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

export function ConfirmationScreen() {
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(bookingStorageKey);
    setBooking(stored ? JSON.parse(stored) : null);
  }, []);

  const { barber, service } = useMemo(() => findBookingParts(booking), [booking]);

  if (!booking || !barber || !service) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4 text-on-surface">
        <div className="max-w-lg rounded-xl border border-outline-variant/20 bg-surface-container-low p-8 text-center">
          <span className="material-symbols-outlined mb-4 text-5xl text-primary">event_busy</span>
          <h1 className="font-headline-lg text-headline-lg text-white">Nenhum agendamento encontrado</h1>
          <p className="mt-3 text-on-surface-variant">Faca uma reserva para visualizar a confirmacao.</p>
          <Link
            href="/agendamento"
            className="mt-6 inline-flex rounded-lg bg-primary px-6 py-3 font-bold text-on-primary-fixed"
          >
            Agendar agora
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-on-surface md:px-margin-desktop">
      <section className="mx-auto max-w-3xl rounded-xl border border-outline-variant/20 bg-surface-container-low p-6 md:p-10">
        <div className="mb-8 text-center">
          <span className="material-symbols-outlined mb-4 text-6xl text-primary">check_circle</span>
          <h1 className="font-display-lg text-headline-lg text-white md:text-display-lg">Agendamento confirmado</h1>
          <p className="mt-3 text-on-surface-variant">
            Tudo certo, {booking.customerName}. Seu horario foi salvo neste navegador.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard icon="content_cut" label="Servico" value={service.name} detail={service.description} />
          <InfoCard icon="badge" label="Profissional" value={barber.name} detail={barber.role} />
          <InfoCard icon="calendar_today" label="Data" value={formatDate(booking.date)} detail="Chegue 10 minutos antes" />
          <InfoCard icon="schedule" label="Horario" value={booking.time} detail={`${service.duration} minutos`} />
        </div>

        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-label-sm text-label-sm uppercase tracking-widest text-primary">Total</p>
              <strong className="font-headline-lg text-headline-lg text-primary">{formatCurrency(service.price)}</strong>
            </div>
            <div className="text-on-surface-variant md:text-right">
              <p>Contato: {booking.customerPhone}</p>
              {booking.notes && <p>Obs: {booking.notes}</p>}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/cliente"
            className="rounded-lg bg-primary px-6 py-3 text-center font-bold text-on-primary-fixed transition hover:opacity-90"
          >
            Ver minha agenda
          </Link>
          <Link
            href="/agendamento"
            className="rounded-lg border border-outline-variant/30 px-6 py-3 text-center text-on-surface transition hover:border-primary hover:text-primary"
          >
            Novo agendamento
          </Link>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ icon, label, value, detail }: { icon: string; label: string; value: string; detail: string }) {
  return (
    <div className="rounded-xl border border-outline-variant/20 bg-surface p-5">
      <div className="mb-4 flex items-center gap-3 text-primary">
        <span className="material-symbols-outlined">{icon}</span>
        <span className="font-label-sm text-label-sm uppercase tracking-widest">{label}</span>
      </div>
      <strong className="block font-headline-md text-headline-md text-white">{value}</strong>
      <p className="mt-2 text-on-surface-variant">{detail}</p>
    </div>
  );
}
