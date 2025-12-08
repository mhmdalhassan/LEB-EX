import bcrypt from "bcryptjs";
import prisma from "../src/lib/db.js";

async function updateSuperAdmin() {
  const oldEmail = "admin@lebex.com"; // your current seeded email
  const newName = "Mohammad Al Hassan";
  const newEmail = "mhmd.6hs@gmail.com";
  const newPassword = "78910585HS";

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const user = await prisma.user.update({
    where: { email: oldEmail },
    data: {
      name: newName,
      email: newEmail,
      password: hashedPassword,
    },
  });

  console.log("Super Admin updated successfully:", user);
}

updateSuperAdmin()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
