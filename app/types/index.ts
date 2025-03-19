import { Listing, Reservation, User } from '@prisma/client';

export type SafeListing = Omit<Listing, 'createdAt' | 'updatedAt'> & {
    createdAt: string | Date;
    updatedAt: string | Date;
};
export type SafeUser = Omit<
    User,
    'hashedPassword' | 'emailVerified' | 'careteAt' | 'updatedAt'
> & {
    createdAt: string | Date;
    updatedAt: string | Date;
    emailVerified: string | null;
};

export type SafeReservation = Omit<
    Reservation,
    'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
    createdAt: string | Date;
    startDate: string | Date;
    endDate: string | Date;
    listing: SafeListing;
};
