import bcrypt from "bcryptjs";
import prisma from "../src/lib/db.js";

async function main() {
  const passwordHash = await bcrypt.hash("78910585HS", 10);

  const user = await prisma.user.upsert({
    where: { email: "mhmd.6hs@gmail.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "mhmd.6hs@gmail.com",
      password: passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  console.log("Super Admin created:", user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
