import React from 'react';
import ClientOnly from '../_components/ClientOnly';
import getCurrentUser from '../_actions/getCurrentUser';
import EmptyState from '../_components/EmptyState';
import getReservation from '../_actions/getReservations';
import ReservationsClient from './ReservationsClient';

const Reservations = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please login" />
            </ClientOnly>
        );
    }

    const reservations = (await getReservation({
        authorId: currentUser.id,
    })) as any;

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No reservations found"
                    subtitle="Looks like you havent reserved any trips"
                />
            </ClientOnly>
        );
    }
    return (
        <ClientOnly>
            <ReservationsClient reservations={reservations} />
        </ClientOnly>
    );
};
export default Reservations;
