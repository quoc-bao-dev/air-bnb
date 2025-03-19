import getCurrentUser from '../_actions/getCurrentUser';
import getReservations from '../_actions/getReservations';
import ClientOnly from '../_components/ClientOnly';
import EmptyState from '../_components/EmptyState';
import TripsClient from './TripsClient';

const TripsPage = async () => {
    const currentUser = (await getCurrentUser()) as any;

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please login" />
            </ClientOnly>
        );
    }

    const reservations = (await getReservations({
        userId: currentUser.id,
    })) as any;

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No trips found"
                    subtitle="Looks like you havent reserved any trips"
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <TripsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
};

export default TripsPage;
