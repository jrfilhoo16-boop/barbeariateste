import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegacyScreen } from "@/app/components/LegacyScreen";
import { getScreen, screens } from "@/src/lib/screens";

type ScreenPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return screens.map((screen) => ({
    slug: screen.slug
  }));
}

export async function generateMetadata({ params }: ScreenPageProps): Promise<Metadata> {
  const { slug } = await params;
  const screen = getScreen(slug);

  if (!screen) {
    return {
      title: "Tela não encontrada | BarberPro"
    };
  }

  return {
    title: `${screen.title} | BarberPro`,
    description: screen.description
  };
}

export default async function ScreenPage({ params }: ScreenPageProps) {
  const { slug } = await params;
  const screen = getScreen(slug);

  if (!screen) {
    notFound();
  }

  return (
    <LegacyScreen
      bodyClassName={screen.bodyClassName}
      html={screen.html}
      scripts={screen.scripts}
      styles={screen.styles}
    />
  );
}
