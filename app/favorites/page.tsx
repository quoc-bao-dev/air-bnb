import getCurrentUser from '../_actions/getCurrentUser';
import { getFavoriteListings } from '../_actions/getFavoriteListings';
import ClientOnly from '../_components/ClientOnly';
import EmptyState from '../_components/EmptyState';
import FavoritesClient from './FavoritesClient';

const FavoritesPage = async () => {
    const listings = (await getFavoriteListings()) as any;
    const currentUser = (await getCurrentUser()) as any;

    if (listings!.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No favorites found"
                    subtitle="Looks like you have no favorite listings"
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <FavoritesClient listings={listings} currentUser={currentUser} />
        </ClientOnly>
    );
};

export default FavoritesPage;
