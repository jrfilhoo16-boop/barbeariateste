"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Barber,
  Booking,
  Service,
  barbers,
  bookingStorageKey,
  dates,
  formatCurrency,
  formatDate,
  services,
  times
} from "@/src/lib/booking-data";

const steps = ["Barbeiro", "Servico", "Horario", "Dados"];

export function BookingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selectedBarber, setSelectedBarber] = useState<Barber>(barbers[0]);
  const [selectedService, setSelectedService] = useState<Service>(services[2]);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState("14:00");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const canConfirm = customerName.trim().length >= 3 && customerPhone.trim().length >= 8;
  const finishTime = useMemo(() => addMinutes(selectedTime, selectedService.duration), [selectedService, selectedTime]);

  function goNext() {
    setStep((current) => Math.min(current + 1, steps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setStep((current) => Math.max(current - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function confirmBooking() {
    if (!canConfirm) {
      setError("Informe seu nome e telefone para confirmar.");
      return;
    }

    const booking: Booking = {
      barberId: selectedBarber.id,
      serviceId: selectedService.id,
      date: selectedDate,
      time: selectedTime,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      notes: notes.trim(),
      createdAt: new Date().toISOString()
    };

    window.localStorage.setItem(bookingStorageKey, JSON.stringify(booking));
    router.push("/confirmacao");
  }

  return (
    <main className="min-h-screen bg-background text-on-surface font-body-md">
      <header className="sticky top-0 z-40 border-b border-outline-variant/20 bg-surface/90 backdrop-blur-md">
        <nav className="mx-auto flex h-20 max-w-container-max items-center justify-between px-4 md:px-margin-desktop">
          <Link href="/" className="font-headline-md text-headline-md font-bold text-primary">
            BarberPro
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            <Link href="/landing" className="text-on-surface-variant hover:text-primary">
              Inicio
            </Link>
            <Link href="/cliente" className="text-on-surface-variant hover:text-primary">
              Minha agenda
            </Link>
            <Link href="/login" className="text-on-surface-variant hover:text-primary">
              Entrar
            </Link>
          </div>
        </nav>
      </header>

      <div className="mx-auto grid max-w-container-max gap-gutter px-4 py-10 md:px-margin-desktop lg:grid-cols-12">
        <section className="lg:col-span-8">
          <div className="mb-6 rounded-xl border border-outline-variant/20 bg-surface-container-low p-4 md:p-6">
            <div className="grid grid-cols-4 gap-2">
              {steps.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setStep(index)}
                  className={`rounded-lg border px-2 py-3 text-center font-label-sm text-label-sm transition ${
                    step === index
                      ? "border-primary bg-primary text-on-primary-fixed"
                      : index < step
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-outline-variant/30 text-on-surface-variant"
                  }`}
                >
                  <span className="block text-[10px] opacity-80">Passo {index + 1}</span>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-outline-variant/20 bg-surface-container-low p-5 md:p-8">
            {step === 0 && (
              <div>
                <ScreenHeader title="Escolha o barbeiro" subtitle="Selecione quem vai cuidar do seu atendimento." />
                <div className="grid gap-4 md:grid-cols-3">
                  {barbers.map((barber) => (
                    <button
                      key={barber.id}
                      type="button"
                      onClick={() => {
                        setSelectedBarber(barber);
                        setStep(1);
                      }}
                      className={`overflow-hidden rounded-xl border bg-surface text-left transition hover:border-primary ${
                        selectedBarber.id === barber.id ? "border-primary" : "border-outline-variant/20"
                      }`}
                    >
                      <img src={barber.image} alt={barber.name} className="h-40 w-full object-cover" />
                      <div className="space-y-2 p-4">
                        <h3 className="font-headline-md text-headline-md text-white">{barber.name}</h3>
                        <p className="text-label-md text-on-surface-variant">
                          {barber.role} - {barber.experience}
                        </p>
                        <p className="flex items-center gap-1 text-primary">
                          <span className="material-symbols-outlined text-[18px]">star</span>
                          {barber.rating} ({barber.reviews} avaliacoes)
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <ScreenHeader title="Escolha o servico" subtitle="Os valores e duracoes atualizam o resumo automaticamente." />
                <div className="space-y-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => {
                        setSelectedService(service);
                        setStep(2);
                      }}
                      className={`flex w-full items-center justify-between gap-4 rounded-xl border p-4 text-left transition hover:border-primary ${
                        selectedService.id === service.id
                          ? "border-primary bg-primary/5"
                          : "border-outline-variant/20 bg-surface"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          {service.icon}
                        </span>
                        <span>
                          <strong className="block font-headline-md text-headline-md text-white">{service.name}</strong>
                          <span className="text-on-surface-variant">{service.description}</span>
                        </span>
                      </div>
                      <span className="text-right">
                        <strong className="block text-primary">{formatCurrency(service.price)}</strong>
                        <span className="text-label-sm text-on-surface-variant">{service.duration} min</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <ScreenHeader title="Data e horario" subtitle="Escolha um horario disponivel para concluir a reserva." />
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 font-label-md text-label-md uppercase tracking-widest text-primary">Datas</h3>
                    <div className="grid gap-3">
                      {dates.map((date) => (
                        <button
                          key={date}
                          type="button"
                          onClick={() => setSelectedDate(date)}
                          className={`rounded-lg border px-4 py-3 text-left transition ${
                            selectedDate === date
                              ? "border-primary bg-primary text-on-primary-fixed"
                              : "border-outline-variant/20 bg-surface hover:border-primary"
                          }`}
                        >
                          {formatDate(date)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 font-label-md text-label-md uppercase tracking-widest text-primary">Horarios</h3>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {times.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`rounded-lg border px-4 py-3 transition ${
                            selectedTime === time
                              ? "border-primary bg-primary text-on-primary-fixed"
                              : "border-outline-variant/20 bg-surface hover:border-primary hover:text-primary"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <ScreenHeader title="Seus dados" subtitle="Informe um contato para confirmar o agendamento." />
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Nome</span>
                    <input
                      value={customerName}
                      onChange={(event) => setCustomerName(event.target.value)}
                      className="h-12 w-full rounded-lg border border-outline-variant/30 bg-[#121213] px-4 text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Seu nome"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Telefone / WhatsApp</span>
                    <input
                      value={customerPhone}
                      onChange={(event) => setCustomerPhone(event.target.value)}
                      className="h-12 w-full rounded-lg border border-outline-variant/30 bg-[#121213] px-4 text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="(00) 00000-0000"
                    />
                  </label>
                  <label className="space-y-2 md:col-span-2">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Observacoes</span>
                    <textarea
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      className="min-h-28 w-full rounded-lg border border-outline-variant/30 bg-[#121213] px-4 py-3 text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Preferencia de corte, alergias, recados..."
                    />
                  </label>
                </div>
                {error && <p className="mt-4 rounded-lg border border-error/30 bg-error/10 p-3 text-error">{error}</p>}
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 border-t border-outline-variant/20 pt-6 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0}
                className="rounded-lg border border-outline-variant/30 px-6 py-3 text-on-surface-variant transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                Voltar
              </button>
              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="rounded-lg bg-primary px-8 py-3 font-bold text-on-primary-fixed transition hover:opacity-90 active:scale-95"
                >
                  Continuar
                </button>
              ) : (
                <button
                  type="button"
                  onClick={confirmBooking}
                  className="rounded-lg bg-primary px-8 py-3 font-bold text-on-primary-fixed transition hover:opacity-90 active:scale-95"
                >
                  Confirmar agendamento
                </button>
              )}
            </div>
          </div>
        </section>

        <aside className="lg:col-span-4">
          <div className="sticky top-28 rounded-xl border border-outline-variant/20 bg-surface-container-low p-6">
            <h2 className="mb-6 font-headline-md text-headline-md text-white">Resumo</h2>
            <div className="space-y-5">
              <SummaryLine label="Barbeiro" value={selectedBarber.name} />
              <SummaryLine label="Servico" value={selectedService.name} />
              <SummaryLine label="Data" value={formatDate(selectedDate)} />
              <SummaryLine label="Horario" value={`${selectedTime} - ${finishTime}`} />
              <SummaryLine label="Duracao" value={`${selectedService.duration} min`} />
            </div>
            <div className="mt-6 border-t border-outline-variant/20 pt-6">
              <div className="flex items-end justify-between">
                <span className="text-on-surface-variant">Total</span>
                <strong className="font-headline-lg text-headline-lg text-primary">
                  {formatCurrency(selectedService.price)}
                </strong>
              </div>
              <p className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3 text-label-sm text-primary">
                O pagamento pode ser feito diretamente na barbearia.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function ScreenHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h1 className="font-headline-lg text-headline-lg text-white">{title}</h1>
      <p className="mt-2 text-on-surface-variant">{subtitle}</p>
    </div>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-on-surface-variant">{label}</span>
      <strong className="text-right text-on-surface">{value}</strong>
    </div>
  );
}

function addMinutes(time: string, minutes: number) {
  const [hour, minute] = time.split(":").map(Number);
  const date = new Date(2026, 0, 1, hour, minute + minutes);
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
