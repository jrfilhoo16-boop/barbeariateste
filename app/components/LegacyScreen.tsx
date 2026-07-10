"use client";

import { useEffect } from "react";

type LegacyScreenProps = {
  bodyClassName: string;
  html: string;
  scripts: string[];
  styles: string[];
};

export function LegacyScreen({ bodyClassName, html, scripts, styles }: LegacyScreenProps) {
  useEffect(() => {
    const previousClassName = document.body.className;
    document.body.className = bodyClassName;

    scripts.forEach((script) => {
      window.setTimeout(() => {
        try {
          new Function(script)();
        } catch (error) {
          console.error("Legacy screen script failed", error);
        }
      }, 0);
    });

    return () => {
      document.body.className = previousClassName;
    };
  }, [bodyClassName, scripts]);

  return (
    <>
      {styles.map((style, index) => (
        <style key={index} dangerouslySetInnerHTML={{ __html: style }} />
      ))}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
