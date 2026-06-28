import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkDb() {
  const users = await prisma.user.findMany({
    include: {
      pasien: true,
    },
  });
  console.log("=== USERS IN DATABASE ===");
  console.log(JSON.stringify(users, null, 2));
}

checkDb()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
