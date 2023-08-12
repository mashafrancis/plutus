import { PrismaClient } from '@prisma/client';
import { fieldEncryptionExtension } from 'prisma-field-encryption';

const prismaClient = new PrismaClient();

export const prisma = prismaClient.$extends(fieldEncryptionExtension());
