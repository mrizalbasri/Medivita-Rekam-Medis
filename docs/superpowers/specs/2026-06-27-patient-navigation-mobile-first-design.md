# Patient Navigation Mobile-First Design

Date: 2026-06-27
Owner: Patient App
Status: Draft for Review

## 1) Context and Problem

Current patient pages have mixed navigation patterns (top nav + in-content sidebar), creating duplicated entry points and confusing flow, especially for mobile-first users.

Primary UX issue:
- Too many choices in one screen
- Inconsistent menu location between pages
- Settings mixed with primary tasks

## 2) Goals

1. Make navigation simple for mobile users.
2. Use one consistent IA across patient pages.
3. Keep primary actions reachable in one tap.
4. Move account/settings actions out of primary navigation.

## 3) Non-Goals

- Redesign visual brand system.
- Major backend/API changes.
- Refactor all page internals beyond navigation scope.

## 4) Information Architecture

### Primary navigation (main tasks)
- Beranda
- QR Saya
- Riwayat
- Log Akses

### Account menu (secondary tasks)
- Profil Medis
- Pengaturan Profil
- Pengaturan Privasi
- Logout

## 5) Device Navigation Strategy

### Mobile
- Bottom navigation with 4 primary items:
  - Beranda
  - QR Saya
  - Riwayat
  - Log Akses
- Account actions accessed via avatar menu or dedicated account sheet.

### Desktop
- Top navigation with same 4 primary items.
- Avatar dropdown contains account/secondary actions.

## 6) Page-Level Flow

### Beranda
- Purpose: quick overview and status.
- Content:
  - QR status summary (active/inactive)
  - 3 latest access logs
  - 2 latest visit records
- CTA: "Tampilkan QR"

### QR Saya
- Purpose: fast presentation for clinic scan.
- Content:
  - Large QR area
  - Actions: Perbesar, Unduh, Cetak
- Primary CTA: "Perbesar QR"

### Riwayat
- Purpose: review medical visit history.
- Content:
  - Reverse chronological list
  - Lightweight filters (optional)

### Log Akses
- Purpose: security transparency.
- Content:
  - Access log list + active status
  - Revoke action via modal confirmation (not alert/confirm browser)

### Account actions
- Available under avatar dropdown only.
- Not shown in primary nav.

## 7) Component Plan

- `components/pasien/PatientTopNav.tsx` (desktop primary nav)
- `components/pasien/PatientBottomNav.tsx` (mobile primary nav)
- `components/pasien/PatientAccountMenu.tsx` (avatar dropdown)

Integration:
- Included once in patient layout/page shell.
- Remove in-content navigation sidebars on patient pages that duplicate primary navigation.

## 8) Data and Behavior

- Keep existing data sources:
  - `/api/users/me`
  - `/api/pasien/logs`
  - `/api/pasien/[id]`
- Keep existing revoke endpoint:
  - `/api/akses/cabut`
- Replace browser `alert/confirm` with in-app toast and modal confirmations.

## 9) Error Handling

- If data fetch fails:
  - show fallback state in content cards
  - keep navigation available
- Revoke errors:
  - show error toast
  - do not mutate UI state optimistically beyond current operation

## 10) Accessibility

- Use semantic `button`/`Link` for all interactive items.
- Active nav state visible by color + weight + underline indicator.
- Touch target minimum 40px in mobile nav.

## 11) Testing and Validation

- Build validation: `npm run build`
- Manual checks:
  - Mobile viewport: bottom nav visible, top nav hidden.
  - Desktop viewport: top nav visible, bottom nav hidden.
  - No duplicate primary nav in content sections.
  - Account menu routes open correctly.
  - Revoke flow uses modal (no browser confirm).

## 12) Rollout Steps

1. Implement shared nav components.
2. Wire top/bottom nav visibility by breakpoint.
3. Move account actions to avatar dropdown.
4. Remove duplicate in-content nav sidebars.
5. Validate build and key manual flows.

## 13) Risks and Mitigations

- Risk: users who rely on sidebar muscle-memory.
  - Mitigation: keep labels familiar and consistent; maintain same route names.
- Risk: mobile crowding in bottom nav.
  - Mitigation: strict max of 4 items.

## 14) Open Decisions

- Final label language consistency (all Indonesian recommended):
  - Beranda, QR Saya, Riwayat, Log Akses
- QR action order in mobile sheet:
  - Perbesar first, then Unduh/Cetak
