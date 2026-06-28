import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateGender() {
  const user = await prisma.user.findUnique({
    where: { email: "pasien@medivita.id" },
    include: { pasien: true },
  });

  if (user && user.pasien) {
    await prisma.pasien.update({
      where: { id: user.pasien.id },
      data: { gender: "P" },
    });
    console.log("Berhasil memperbarui gender pasien@medivita.id (sarah) menjadi 'P' (Perempuan)!");
  } else {
    console.log("Pengguna tidak ditemukan.");
  }
}

updateGender()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
