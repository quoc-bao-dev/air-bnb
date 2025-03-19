import getListingById from '@/app/_actions/getListingById';
import ClientOnly from '@/app/_components/ClientOnly';
import EmptyState from '@/app/_components/EmptyState';
import ListingClient from './ListingClient';
import getCurrentUser from '@/app/_actions/getCurrentUser';
import getReservation from '@/app/_actions/getReservations';

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = (await getListingById(params)) as any;
    const reservations = (await getReservation(params)) as any;
    const currentUser = (await getCurrentUser()) as any;

    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }
    return (
        <ClientOnly>
            <ListingClient
                listing={listing}
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
};

export default ListingPage;
