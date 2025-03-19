import prisma from '@/app/_libs/prismadb';

export interface IListingsParams {
    userId?: string;
    listingId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}
export default async function getListings(params: IListingsParams) {
    try {
        const {
            userId,
            listingId,
            guestCount,
            roomCount,
            bathroomCount,
            startDate,
            endDate,
            locationValue,
            category,
        } = params;

        let query: any = {};
        if (userId) {
            query.userId = userId;
        }

        if (listingId) {
            query.id = listingId;
        }

        if (category) {
            query.category = category;
        }

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount,
            };
        }

        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount,
            };
        }

        if (guestCount) {
            query.guestCount = {
                gte: +guestCount,
            };
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: new Date(startDate) },
                                startDate: { lte: new Date(startDate) },
                            },
                            {
                                startDate: { lte: new Date(endDate) },
                                endDate: { gte: new Date(endDate) },
                            },
                        ],
                    },
                },
            };
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc',
            },
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));
        return safeListings;
    } catch (error: any) {
        throw new Error(error);
    }
}
