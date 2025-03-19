import prisma from 'prisma';

const conectToDataBase = async () => {
    await prisma.$connect();
    console.log('database connected');
};
