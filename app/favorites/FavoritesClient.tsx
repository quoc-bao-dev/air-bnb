'use client';

import Container from '../_components/Container';
import Heading from '../_components/Heading';
import ListingCard from '../_components/listings/ListingCard';
import { SafeListing, SafeUser } from '../types';

interface FavoritesClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}
const FavoritesClient: React.FC<FavoritesClientProps> = ({
    listings,
    currentUser,
}) => {
    return (
        <Container>
            <Heading
                title="Favorites"
                subtitle="List of places you have favorited"
            />

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {listings.map((listing) => (
                    <div key={listing.id} className="col-span-1 m-2">
                        <ListingCard currentUser={currentUser} data={listing} />
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default FavoritesClient;
