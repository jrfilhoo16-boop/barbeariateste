import Link from "next/link";
import { screens } from "@/src/lib/screens";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111415] px-6 py-10 text-[#e1e3e4] md:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col gap-3 border-b border-[#4d4635]/30 pb-8">
          <span className="font-[Geist] text-sm font-medium uppercase tracking-[0.18em] text-[#f2ca50]">
            BarberPro Next.js
          </span>
          <h1 className="font-[Poppins] text-4xl font-semibold">Sistema de agendamento premium</h1>
          <p className="max-w-2xl font-[Poppins] text-base leading-7 text-[#d0c5af]">
            As telas estáticas foram organizadas como rotas de uma aplicação Next.js, mantendo o visual original e
            preparando o projeto para evoluir com componentes, dados reais e autenticação.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {screens.map((screen) => (
            <Link
              key={screen.slug}
              href={`/${screen.slug}`}
              className="rounded-xl border border-[#4d4635]/30 bg-[#191c1d] p-6 transition hover:border-[#f2ca50]/60 hover:bg-[#1d2021]"
            >
              <h2 className="mb-2 font-[Poppins] text-xl font-semibold text-white">{screen.title}</h2>
              <p className="font-[Poppins] text-sm leading-6 text-[#d0c5af]">{screen.description}</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
