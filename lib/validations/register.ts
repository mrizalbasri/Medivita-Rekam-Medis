import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Nama wajib diisi")
    .min(2, "Nama minimal 2 karakter")
    .max(100),
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid")
    .transform((v) => v.toLowerCase().trim()),
  password: z
    .string()
    .min(1, "Password wajib diisi")
    .min(8, "Password minimal 8 karakter")
    .max(128),
  nik: z
    .string()
    .min(1, "NIK wajib diisi")
    .length(16, "NIK harus tepat 16 digit")
    .regex(/^\d+$/, "NIK hanya boleh berisi angka"),
  birthDate: z
    .string()
    .min(1, "Tanggal lahir wajib diisi"),
  gender: z
    .enum(["L", "P"], {
      message: "Pilih jenis kelamin",
    }),
  bloodType: z
    .string()
    .min(1, "Golongan darah wajib diisi"),
  allergies: z
    .string()
    .optional(),
  chronicConditions: z
    .string()
    .optional(),
  routineMedications: z
    .string()
    .optional(),
});

export type RegisterInput = z.input<typeof registerSchema>;

export function validateRegisterField(
  field: keyof RegisterInput,
  value: string
): string {
  const schema = registerSchema.shape[field];
  if (!schema) return "";
  const result = schema.safeParse(value);
  if (result.success) return "";
  const issues = (result.error as z.ZodError).issues;
  return issues[0]?.message ?? "Tidak valid";
}
