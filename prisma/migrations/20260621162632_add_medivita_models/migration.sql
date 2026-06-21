-- CreateTable
CREATE TABLE "Pasien" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "encryptedMedicalData" TEXT NOT NULL,
    "qrToken" TEXT NOT NULL,
    "kodeCadangan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pasien_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetugasFaskes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "licenseNo" TEXT NOT NULL,
    "faskesName" TEXT NOT NULL,
    "faskesType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PetugasFaskes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiwayatKunjungan" (
    "id" TEXT NOT NULL,
    "pasienId" TEXT NOT NULL,
    "petugasId" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "keluhan" TEXT NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "tindakan" TEXT,
    "resepObat" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RiwayatKunjungan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenAkses" (
    "id" TEXT NOT NULL,
    "pasienId" TEXT NOT NULL,
    "petugasId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "isRevoked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TokenAkses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogAkses" (
    "id" TEXT NOT NULL,
    "pasienId" TEXT NOT NULL,
    "petugasId" TEXT NOT NULL,
    "aksi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogAkses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pasien_userId_key" ON "Pasien"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Pasien_nik_key" ON "Pasien"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "Pasien_qrToken_key" ON "Pasien"("qrToken");

-- CreateIndex
CREATE UNIQUE INDEX "PetugasFaskes_userId_key" ON "PetugasFaskes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PetugasFaskes_licenseNo_key" ON "PetugasFaskes"("licenseNo");

-- CreateIndex
CREATE UNIQUE INDEX "TokenAkses_token_key" ON "TokenAkses"("token");

-- AddForeignKey
ALTER TABLE "Pasien" ADD CONSTRAINT "Pasien_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetugasFaskes" ADD CONSTRAINT "PetugasFaskes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiwayatKunjungan" ADD CONSTRAINT "RiwayatKunjungan_pasienId_fkey" FOREIGN KEY ("pasienId") REFERENCES "Pasien"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiwayatKunjungan" ADD CONSTRAINT "RiwayatKunjungan_petugasId_fkey" FOREIGN KEY ("petugasId") REFERENCES "PetugasFaskes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TokenAkses" ADD CONSTRAINT "TokenAkses_pasienId_fkey" FOREIGN KEY ("pasienId") REFERENCES "Pasien"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TokenAkses" ADD CONSTRAINT "TokenAkses_petugasId_fkey" FOREIGN KEY ("petugasId") REFERENCES "PetugasFaskes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogAkses" ADD CONSTRAINT "LogAkses_pasienId_fkey" FOREIGN KEY ("pasienId") REFERENCES "Pasien"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogAkses" ADD CONSTRAINT "LogAkses_petugasId_fkey" FOREIGN KEY ("petugasId") REFERENCES "PetugasFaskes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
