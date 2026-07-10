import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

export type ScreenSlug =
  | "landing"
  | "agendamento"
  | "barbeiros"
  | "cadastro"
  | "confirmacao"
  | "cliente"
  | "login"
  | "admin";

export type ScreenMeta = {
  slug: ScreenSlug;
  title: string;
  description: string;
  folder: string;
};

export type ParsedScreen = ScreenMeta & {
  bodyClassName: string;
  html: string;
  scripts: string[];
  styles: string[];
};

export const screens: ScreenMeta[] = [
  {
    slug: "landing",
    title: "Landing Page",
    description: "Página comercial premium do BarberPro",
    folder: "landing_page_premium_barber_saas"
  },
  {
    slug: "agendamento",
    title: "Agendamento",
    description: "Fluxo de reserva com barbeiro, serviço, data e confirmação",
    folder: "agendamento_barber_saas"
  },
  {
    slug: "barbeiros",
    title: "Lista de Barbeiros",
    description: "Catálogo de profissionais disponíveis",
    folder: "lista_de_barbeiros_barber_saas"
  },
  {
    slug: "cadastro",
    title: "Cadastro de Cliente",
    description: "Tela de criação de conta para clientes",
    folder: "cadastro_de_cliente_barber_saas"
  },
  {
    slug: "confirmacao",
    title: "Confirmação",
    description: "Resumo final de agendamento confirmado",
    folder: "confirma_o_de_agendamento_barber_saas"
  },
  {
    slug: "cliente",
    title: "Dashboard do Cliente",
    description: "Área logada com próximos horários e histórico",
    folder: "dashboard_do_cliente_barber_saas"
  },
  {
    slug: "login",
    title: "Login",
    description: "Entrada na plataforma",
    folder: "login_barber_saas"
  },
  {
    slug: "admin",
    title: "Painel Administrativo",
    description: "Dashboard operacional da barbearia",
    folder: "painel_administrativo_barber_saas"
  }
];

export function getScreenMeta(slug: string) {
  return screens.find((screen) => screen.slug === slug);
}

export const getScreen = cache((slug: string): ParsedScreen | null => {
  const meta = getScreenMeta(slug);

  if (!meta) {
    return null;
  }

  const htmlPath = path.join(process.cwd(), meta.folder, "code.html");
  const source = fs.readFileSync(htmlPath, "utf8");
  const bodyClassName = source.match(/<body[^>]*class=["']([^"']*)["']/i)?.[1] ?? "";
  const body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? source;

  const styles = Array.from(source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi), (match) => match[1]);
  const scripts = Array.from(body.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi), (match) => normalizeLegacyScript(match[1]));
  const html = body.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");

  return {
    ...meta,
    bodyClassName,
    html,
    scripts,
    styles
  };
});

function normalizeLegacyScript(script: string) {
  return script
    .replace(/\blet\s+currentStep\s*=\s*1\s*;/, "window.currentStep = 1;")
    .replace(/\bcurrentStep\s*=\s*step\s*;/g, "window.currentStep = step;")
    .replace(/\bfunction\s+nextStep\s*\(/, "window.nextStep = function nextStep(")
    .replace(/\bfunction\s+updateStepperUI\s*\(/, "window.updateStepperUI = function updateStepperUI(");
}
