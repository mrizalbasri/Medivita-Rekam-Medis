"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PatientPrimaryNav } from "./PatientPrimaryNav";
import { PatientAccountMenu } from "./PatientAccountMenu";
import * as Icons from "@/components/ui/icons";

interface PatientHeaderProps {
  name?: string | null;
  email?: string | null;
  profilePicture?: string | null;
  onNotificationClick?: () => void;
  onLogout?: () => Promise<void> | void;
}

export function PatientHeader({
  name,
  email,
  profilePicture,
  onNotificationClick,
  onLogout,
}: PatientHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3.5 md:px-10">
        {/* Logo */}
        <Link href="/pasien/dashboard" className="flex items-center gap-2">
          <div className="relative h-9 w-14 flex-shrink-0 overflow-hidden">
            <Image
              src="/logo.webp"
              alt="Medivita Logo"
              fill
              sizes="56px"
              className="object-cover object-left"
              priority
            />
          </div>
          <span className="h-6 w-[1px] bg-line/80" aria-hidden />
          <div className="flex flex-col leading-tight mt-0.5">
            <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-ink-soft">
              Rekam Medis
            </span>
            <span className="text-[13px] font-bold tracking-tight text-primary-dark">
              Jalan
            </span>
          </div>
        </Link>

        {/* Navigation Links (visible on md+) */}
        <PatientPrimaryNav />

        {/* Controls */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <button
            onClick={onNotificationClick}
            type="button"
            aria-label="Notification"
            className="relative rounded-full p-2 text-ink-soft hover:bg-primary-soft hover:text-primary transition-all cursor-pointer"
          >
            <Icons.BellIcon className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-alert"></span>
          </button>

          <PatientAccountMenu
            name={name}
            email={email}
            profilePicture={profilePicture}
            onLogout={onLogout}
          />
        </div>
      </div>
    </header>
  );
}
