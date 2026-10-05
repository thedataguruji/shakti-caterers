import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const products = [
  {
    slug: "pure-ghee-mohanthal",
    name: "Pure Ghee Mohanthal",
    shortDescription:
      "Our signature Pure Ghee Mohanthal, slow-roasted and infused with jaifal and javanti.",
    description: `Our signature Pure Ghee Mohanthal is made with premium chana flour, Amul ghee, milk and sulphur-free sugar. Traditionally slow-roasted to bring out its rich, nutty flavour, it is delicately infused with jaifal and javanti for an authentic aroma. Finished with pista and badam katri, it combines classic mithai craftsmanship with an elegant look and a delightful crunch.`,
    ratePerKg: 900,
    isSugarFree: false,
    sortOrder: 1,
  },
  {
    slug: "kaju-katli",
    name: "Kaju Katli",
    shortDescription:
      "Made with 65% premium-grade kaju, finished with a delicate layer of Jain varakh.",
    description: `Made with 65% premium-grade kaju, carefully selected directly from trusted manufacturers, our Kaju Katli reflects our focus on purity and quality. The kaju is gently washed to remove dust and enhance its natural whiteness, then freshly ground and roasted with our perfectly balanced chasni. Finished with a delicate layer of Jain varakh, our Kaju Katli is smooth, rich and naturally indulgent — with the authentic taste of premium kaju in every bite.`,
    ratePerKg: 1200,
    isSugarFree: false,
    sortOrder: 2,
  },
  {
    slug: "khajur-bites",
    name: "Khajur Bites",
    shortDescription:
      "100% sugar-free, made with finely ground khajur roasted in pure ghee.",
    description: `Naturally sweet and 100% sugar-free, our Khajur Bites are made with finely ground khajur, gently roasted in pure ghee to deepen its rich flavour. Badam and kaju are separately roasted in pure ghee, then blended with the khajur to create a naturally indulgent, nutty bite. Finished with pista katri for an elegant touch, these bites are wholesome, refined and completely free from added sugar.`,
    ratePerKg: 700,
    isSugarFree: true,
    sortOrder: 3,
  },
  {
    slug: "anjeer-dry-fruit-balls",
    name: "Anjeer Dry Fruit Balls",
    shortDescription:
      "Sugar-free anjeer balls with roasted badam and kaju, garnished with khas khas.",
    description: `Made with fine-quality anjeer, our Anjeer Dry Fruit Balls are prepared by grinding and gently roasting the anjeer in pure ghee to bring out its natural richness. Roasted badam and kaju are then blended in, creating a deliciously nutty and naturally sweet bite. Finished with a delicate garnish of khas khas, these are completely sugar-free and have become a favourite among our customers.`,
    ratePerKg: 750,
    isSugarFree: true,
    sortOrder: 4,
  },
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  const adminEmail = process.env.ADMIN_EMAIL || "admin@shakticaterers.example";
  const adminPassword = process.env.ADMIN_PASSWORD || "ChangeMe@12345";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash, name: "Shakti Caterers Admin" },
    create: { email: adminEmail, passwordHash, name: "Shakti Caterers Admin" },
  });

  const settings: Record<string, string> = {
    tax_percent: "5",
    discount_percent: "0",
    contact_email: "orders@shakticaterers.example",
    contact_phone: "+91 98765 43210",
    contact_address: "Vadodara, Gujarat, India",
    site_name: "Shakti Caterers",
  };

  for (const [key, value] of Object.entries(settings)) {
    await prisma.appSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  console.log("Seed complete.");
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
