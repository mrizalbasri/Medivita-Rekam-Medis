import { z } from "zod";

/**
 * Skema validasi login — dipakai di CLIENT dan SERVER (single source of truth).
 * Server menggunakan ini di /api/auth/login/route.ts
 * Client menggunakan ini di LoginForm.tsx
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

/** Validasi satu field — kembalikan pesan error atau string kosong jika valid */
export function validateLoginField(
  field: keyof LoginInput,
  value: string,
): string {
  const result = loginSchema.shape[field].safeParse(value);
  if (result.success) return "";
  return result.error.errors[0]?.message ?? "Tidak valid";
}
