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
        password: "12345678"
    },
    {
        userId: "26578",
        firstName: "Jane",
        lastName: "Doe",
        position: "Vertrieber",
        email: "hane@milon.com",
        password: "12345678"
    },
    {
        userId: "98547",
        firstName: "Max",
        lastName: "Mustermann",
        position: "Leiter",
        email: "max@milon.com",
        password: "12345678"
    },
]

async function main() {
    console.log("Start seeding...");
    for (let u of userData) {
        const hashedPassword = await bcrypt.hash(u.password, 12);
        await prisma.user.create({
            data: {
                userId: u.userId,
                firstName: u.firstName,
                lastName: u.lastName,
                position: u.position,
                email: u.email,
                password: hashedPassword
            }
        })
    }
    console.log("Seeding finished.")
}


main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })