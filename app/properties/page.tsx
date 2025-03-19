import getCurrentUser from '../_actions/getCurrentUser';
import getListings from '../_actions/getListings';
import ClientOnly from '../_components/ClientOnly';
import EmptyState from '../_components/EmptyState';
import PropertiesClient from './PropertieClient';

const PropertiesPage = async () => {
    const currentUser = (await getCurrentUser()) as any;

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please login" />
            </ClientOnly>
        );
    }

    const listings = (await getListings({ userId: currentUser.id })) as any;

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No properties found"
                    subtitle="Looks like you havent reserved any properties"
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <PropertiesClient listings={listings} currentUser={currentUser} />
        </ClientOnly>
    );
};

export default PropertiesPage;
