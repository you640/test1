
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ClientHeader } from './ClientHeader';
import { Footer } from './Footer';

export const ClientLayout: React.FC = () => {
    return (
        <div className="bg-brand-dark text-brand-light min-h-screen flex flex-col antialiased">
            <ClientHeader />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
