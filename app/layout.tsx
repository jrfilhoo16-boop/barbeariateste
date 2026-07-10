import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "BarberPro",
  description: "Premium booking system for barbershops"
};

const tailwindConfig = `
  tailwind.config = {
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          "on-primary-fixed": "#241a00",
          "surface-container-highest": "#323536",
          "surface-bright": "#373a3b",
          "on-tertiary-fixed-variant": "#474747",
          "on-primary": "#3c2f00",
          "primary-fixed": "#ffe088",
          "surface": "#111415",
          "on-error-container": "#ffdad6",
          "on-secondary": "#303031",
          "on-secondary-fixed": "#1b1b1c",
          "surface-variant": "#323536",
          "inverse-primary": "#735c00",
          "tertiary": "#cecece",
          "surface-container": "#1d2021",
          "primary-container": "#d4af37",
          "on-background": "#e1e3e4",
          "inverse-surface": "#e1e3e4",
          "error-container": "#93000a",
          "primary": "#f2ca50",
          "surface-container-lowest": "#0c0f10",
          "secondary-fixed": "#e5e2e3",
          "surface-tint": "#e9c349",
          "on-error": "#690005",
          "inverse-on-surface": "#2e3132",
          "surface-dim": "#111415",
          "tertiary-container": "#b3b3b3",
          "primary-fixed-dim": "#e9c349",
          "surface-container-high": "#282a2b",
          "background": "#111415",
          "outline": "#99907c",
          "on-secondary-fixed-variant": "#474647",
          "on-tertiary-container": "#454545",
          "on-primary-container": "#554300",
          "on-surface": "#e1e3e4",
          "on-surface-variant": "#d0c5af",
          "on-primary-fixed-variant": "#574500",
          "on-tertiary": "#303030",
          "secondary-fixed-dim": "#c8c6c7",
          "tertiary-fixed": "#e2e2e2",
          "on-secondary-container": "#bab8b9",
          "outline-variant": "#4d4635",
          "surface-container-low": "#191c1d",
          "secondary-container": "#49494a",
          "error": "#ffb4ab",
          "tertiary-fixed-dim": "#c6c6c6",
          "on-tertiary-fixed": "#1b1b1b",
          "secondary": "#c8c6c7"
        },
        borderRadius: {
          DEFAULT: "0.25rem",
          lg: "0.5rem",
          xl: "0.75rem",
          full: "9999px"
        },
        spacing: {
          base: "8px",
          gutter: "24px",
          "margin-desktop": "40px",
          "sidebar-width": "280px",
          "container-max": "1440px"
        },
        fontFamily: {
          "label-sm": ["Geist"],
          "body-md": ["Poppins"],
          "display-lg": ["Poppins"],
          "body-lg": ["Poppins"],
          "label-md": ["Geist"],
          "headline-md": ["Poppins"],
          "headline-lg": ["Poppins"]
        },
        fontSize: {
          "label-sm": ["12px", { lineHeight: "1", fontWeight: "500" }],
          "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
          "display-lg": ["48px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
          "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
          "label-md": ["14px", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "500" }],
          "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "500" }],
          "headline-lg": ["32px", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "600" }]
        }
      }
    }
  };
`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <Script id="tailwind-config" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: tailwindConfig }} />
        <Script src="https://cdn.tailwindcss.com?plugins=forms,container-queries" strategy="beforeInteractive" />
      </head>
      <body>{children}</body>
    </html>
  );
}
