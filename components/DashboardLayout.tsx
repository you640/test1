import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const sidebarLinks = [
    { to: '/dashboard/overview', text: 'Prehľad' },
    { to: '/dashboard/calendar', text: 'Kalendár' },
    { to: '/dashboard/clients', text: 'Klienti' },
    { to: '/dashboard/products', text: 'Produkty' },
    { to: '/dashboard/services', text: 'Služby' },
    { to: '/dashboard/stylists', text: 'Stylisti' },
    { to: '/dashboard/gallery-admin', text: 'Galéria' },
    { to: '/dashboard/content-ideas', text: 'AI Nápady' },
];

export const DashboardLayout: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center p-2 rounded-lg transition-colors duration-200 ${isActive ? 'bg-gold text-brand-dark' : 'text-brand-light hover:bg-brand-secondary'}`;

    return (
        <div className="flex h-screen bg-brand-dark text-brand-light overflow-hidden">
            {/* Sidebar */}
            <aside className={`absolute z-20 inset-y-0 left-0 w-64 bg-brand-secondary transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex-shrink-0`}>
                <div className="flex items-center justify-between h-20 px-4 border-b border-gold/20">
                    <span className="text-xl font-bold font-serif tracking-tight cursor-pointer" onClick={() => navigate('/')}>
                        <span className="text-gold">PAPI HAIR </span>
                        <span className="text-brand-light">DESIGN</span>
                    </span>
                    <button className="md:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <nav className="p-4 space-y-2">
                    {sidebarLinks.map(link => (
                        <NavLink key={link.to} to={link.to} className={linkClass}>
                           {link.text}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center p-4 bg-brand-secondary md:hidden">
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                    <span className="text-xl font-bold text-gold">Dashboard</span>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-brand-dark p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};