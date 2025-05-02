import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new record
export async function getAdminPassword(username: string, password: string): Promise<boolean> {
    const admin =  await prisma.admin.findUnique({
        where: {
            id: username
        }
    });
    if (!admin){
        return false
    }

    return admin.passwordHash == password

}

