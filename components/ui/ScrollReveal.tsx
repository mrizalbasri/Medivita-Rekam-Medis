"use client";

import React, { useEffect, useRef, useState } from "react";

type RevealVariant = "up" | "fade" | "left" | "right" | "zoom";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: 0 | 100 | 200 | 300 | 400 | 500 | 700 | 1000;
  threshold?: number;
  once?: boolean;
  as?: React.ElementType;
}

const variantClasses: Record<RevealVariant, string> = {
  up: "reveal",
  fade: "reveal-fade",
  left: "reveal-left",
  right: "reveal-right",
  zoom: "reveal-zoom",
};

const delayClasses = {
  0: "",
  100: "delay-100",
  200: "delay-200",
  300: "delay-300",
  400: "delay-400",
  500: "delay-500",
  700: "delay-700",
  1000: "delay-1000",
};

export function ScrollReveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  threshold = 0.1,
  once = true,
  as: Component = "div",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  const baseClass = variantClasses[variant];
  const delayClass = delayClasses[delay] || "";
  const activeClass = isVisible ? "reveal-active" : "";

  return (
    <Component
      ref={ref}
      className={`${baseClass} ${delayClass} ${activeClass} ${className}`}
    >
      {children}
    </Component>
  );
}
