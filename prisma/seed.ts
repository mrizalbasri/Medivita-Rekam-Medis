import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Create User Pasien
  const userPasien = await prisma.user.upsert({
    where: { email: 'pasien@medivita.id' },
    update: {},
    create: {
      email: 'pasien@medivita.id',
      name: 'Budi Pasien',
      passwordHash: passwordHash,
      role: 'pasien',
      pasien: {
        create: {
          nik: '1234567890123456',
          birthDate: new Date('1990-01-01'),
          gender: 'L',
          encryptedMedicalData: 'encrypted_data_string_here',
          qrToken: 'sample_qr_token',
          kodeCadangan: '123456',
        },
      },
    },
  });

  // 2. Create User Petugas
  const userPetugas = await prisma.user.upsert({
    where: { email: 'petugas@medivita.id' },
    update: {},
    create: {
      email: 'petugas@medivita.id',
      name: 'Dr. Siti Petugas',
      passwordHash: passwordHash,
      role: 'petugas',
      petugas: {
        create: {
          licenseNo: 'STR-999999',
          faskesName: 'Puskesmas Pekan Baru',
          faskesType: 'PUSKESMAS',
        },
      },
    },
  });

  console.log({ userPasien, userPetugas });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.();
  });
