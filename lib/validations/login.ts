import { z } from "zod";

/**
 * Single source of truth untuk validasi login.
 * Dipakai di:
 *   - Client: components/auth/LoginForm.tsx
 *   - Server: app/api/auth/login/route.ts
 *
 * Catatan: project ini memakai Zod v4 — tidak ada `required_error`,
 * gunakan `.min(1, msg)` untuk tangkap string kosong.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid")
    .transform((v) => v.toLowerCase().trim()),
  password: z
    .string()
    .min(1, "Password wajib diisi")
    .min(8, "Password minimal 8 karakter"),
});

export type LoginInput = z.input<typeof loginSchema>;
export type LoginOutput = z.output<typeof loginSchema>;

/**
 * Validasi satu field saja — dipakai on-blur & on-change di form.
 * Mengembalikan pesan error, atau string kosong jika valid.
 * Zod v4: gunakan `.issues` bukan `.errors`.
 */
export function validateLoginField(
  field: keyof LoginInput,
  value: string,
): string {
  const result = loginSchema.shape[field].safeParse(value);
  if (result.success) return "";
  // Zod v4 menggunakan .issues
  const issues = (result.error as z.ZodError).issues;
  return issues[0]?.message ?? "Tidak valid";
}
