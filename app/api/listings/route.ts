import { NextResponse } from 'next/server';
import prisma from '@/app/_libs/prismadb';
import getCurrentUser from '@/app/_actions/getCurrentUser';

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return NextResponse.error();
    }
    const body = await request.json();
    const { title, description, category, roomCount, bathroomCount, guestCount, location, imageSrc } = body;
    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });
    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            imageSrc,
            userId: currentUser.id,
            price: parseInt(body.price, 10),
        },
    });
    return NextResponse.json(listing);
}
