import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

import ClientOnly from './_components/ClientOnly';
import RegisterModal from './_components/modal/RegisterModal';
import Navbar from './_components/navbar/Navbar';
import ToasterProvider from './_providers/ToasterProvider';

import './globals.css';
import LoginModal from './_components/modal/LoginModal';
import getCurrentUser from './_actions/getCurrentUser';
import RentModal from './_components/modal/RentModal';
import SearchModal from './_components/modal/SearchModal';

const inter = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Airbnb',
    description: 'Airbnb clone',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const currentUser = await getCurrentUser();
    return (
        <html lang="en">
            <body className={inter.className}>
                <ClientOnly>
                    <ToasterProvider />
                    <SearchModal />
                    <RentModal />
                    <LoginModal />
                    <RegisterModal />
                    <Navbar currentUser={currentUser} />
                </ClientOnly>
                <div className="pb-20 pt-28">{children}</div>
            </body>
        </html>
    );
}
