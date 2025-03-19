'use client';

import { useRouter } from 'next/navigation';
import Container from '../_components/Container';
import Heading from '../_components/Heading';
import { SafeReservation, SafeUser } from '../types';
import { useCallback, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingCard from '../_components/listings/ListingCard';

interface ReservationsClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser,
}) => {
    const router = useRouter();
    const [deleteingId, setDeletingId] = useState('');

    const onCancel = useCallback(
        (id: string) => {
            setDeletingId(id);
            axios
                .delete(`/api/reservations/${id}`)
                .then(() => {
                    toast.success('Reservation cancelled');
                    router.refresh();
                })
                .catch((error) => {
                    toast.error(error?.response?.data?.error);
                })
                .finally(() => {
                    setDeletingId('');
                });
        },
        [router]
    );
    return (
        <Container>
            <Heading
                title="Reservations"
                subtitle="Bookings on your properties"
            />
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                {reservations.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deleteingId === reservation.id}
                        actionLabel="Cancel guest reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
};

export default ReservationsClient;
