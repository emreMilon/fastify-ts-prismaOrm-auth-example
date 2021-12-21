import { PrismaClient, Prisma } from "@prisma/client";

import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    userId: "18659",
    firstName: "John",
    lastName: "Doe",
    position: "Leiter",
    email: "john@milon.com",
    password: "12345678",
  },
  {
    userId: "26578",
    firstName: "Jane",
    lastName: "Doe",
    position: "Vertrieber",
    email: "hane@milon.com",
    password: "12345678",
  },
  {
    userId: "98547",
    firstName: "Max",
    lastName: "Mustermann",
    position: "Vertrieber",
    email: "max@milon.com",
    password: "12345678",
  },
];

const customerData: Prisma.CustomerCreateInput[] = [
  {
    id: "15654",
    customerName: "Forum H4",
    address: "Moos 54 , Augsburg Germany",
    telephone: "12356789",
    zip: 85055,
  },
  {
    id: "15656",
    customerName: "XXX Therapie",
    address: "Martin luther Straße 96, München Germany",
    telephone: "12356789",
    zip: 81850,
  },
  {
    id: "15698",
    customerName: "YYY Sport",
    address: "UnterWeg 45, Regensburg Germany",
    telephone: "12356789",
    zip: 96325,
  },
];

// const forecastData: Prisma.ForecastCreateInput[] = [
//   {
//     userId: "98547",
//     customerId: "15656",
//     price: 75630,
//   },
//   {
//     userId: "26578",
//     customerId: "15654",
//     price: 68500,
//   },
//   {
//     userId: "98547",
//     customerId: "15698",
//     price: 75630,
//   },
// ];

async function user() {
  console.log("Start seeding user...");
  for (let u of userData) {
    const hashedPassword = await bcrypt.hash(u.password, 12);
    await prisma.user.create({
      data: {
        userId: u.userId,
        firstName: u.firstName,
        lastName: u.lastName,
        position: u.position,
        email: u.email,
        password: hashedPassword,
      },
    });
  }
  console.log("Seeding user finished.");
}

async function customer() {
  console.log("Start seeding customer...");
  for (let c of customerData) {
    await prisma.customer.create({
      data: {
        id: c.id,
        customerName: c.customerName,
        address: c.address,
        telephone: c.telephone,
        zip: c.zip,
      },
    });
  }
  console.log("Seeding customer finished.");
}

// async function forecast() {
//   console.log("Start seeding forecast...");
//   for (let f of forecastData) {
//     await prisma.forecast.create({
//       data: {
//         userId: f.userId,
//         customerId: f.customerId,
//         price: f.price
//       },
//     });
//   }
//   console.log("Seeding forecast finished.");
//}

user()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  customer()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  // forecast()
  // .catch((e) => {
  //   console.error(e);
  //   process.exit(1);
  // })
  // .finally(async () => {
  //   await prisma.$disconnect();
  // });
