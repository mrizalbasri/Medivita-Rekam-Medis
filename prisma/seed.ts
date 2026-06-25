import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { encrypt } from '../lib/encryption';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  const sampleMedicalData = {
    bloodType: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    chronicConditions: 'Hipertensi Ringan',
    routineMedications: ['Amlodipine 5mg (1x1)', 'Cetirizine 10mg (p.r.n)'],
  };
  const encryptedMedicalData = encrypt(JSON.stringify(sampleMedicalData));

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
          encryptedMedicalData: encryptedMedicalData,
          qrToken: 'sample_qr_token',
          kodeCadangan: '123456',
        },
      },
    },
    include: {
      pasien: true,
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
    include: {
      petugas: true,
    },
  });

  // 3. Create Active Access Token and Visit History if they don't exist
  if (userPasien.pasien && userPetugas.petugas) {
    const tokenExists = await prisma.tokenAkses.findFirst({
      where: {
        pasienId: userPasien.pasien.id,
        petugasId: userPetugas.petugas.id,
      },
    });

    if (!tokenExists) {
      await prisma.tokenAkses.create({
        data: {
          pasienId: userPasien.pasien.id,
          petugasId: userPetugas.petugas.id,
          token: 'demo_token_budi_siti',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Active for 7 days
        },
      });
    }

    const visitExists = await prisma.riwayatKunjungan.findFirst({
      where: {
        pasienId: userPasien.pasien.id,
        petugasId: userPetugas.petugas.id,
      },
    });

    if (!visitExists) {
      await prisma.riwayatKunjungan.create({
        data: {
          pasienId: userPasien.pasien.id,
          petugasId: userPetugas.petugas.id,
          keluhan: 'Demam tinggi selama 3 hari disertai batuk ringan',
          diagnosis: 'Influenza tipe A',
          tindakan: 'Pemeriksaan Umum',
          resepObat: 'Paracetamol 500mg, Oseltamivir 75mg',
          tanggal: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        },
      });
    }
  }

  console.log({ userPasien, userPetugas });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
