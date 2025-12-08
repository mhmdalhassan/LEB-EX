import bcrypt from "bcryptjs";

async function run() {
  const plain = "78910585HS";
  const hash = await bcrypt.hash(plain, 10);
  console.log("New bcrypt hash:\n", hash);
}
run();
