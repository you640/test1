import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const navLinks = [
    { to: '/', text: 'Domov' },
    { to: '/booking', text: 'Rezervácia' },
    { to: '/gallery', text: 'Galéria' },
    { to: '/stylists', text: 'Stylisti' },
    { to: '/pricelist', text: 'Cenník' },
    { to: '/virtual-try-on', text: 'Virtuálny Stylista' },
    { to: '/contact', text: 'Kontakt' },
];

export const ClientHeader: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartItems } = useCart();
    const cartItemCount = cartItems.length;

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `block py-2 px-3 rounded transition-colors duration-300 ${isActive ? 'text-gold' : 'text-brand-light hover:bg-brand-secondary hover:text-gold'}`;

    return (
        <header className="bg-brand-secondary/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-black/20">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <NavLink to="/" className="text-2xl font-bold font-serif tracking-tight whitespace-nowrap">
                            <span className="text-gold">PAPI HAIR </span>
                            <span className="text-brand-light">DESIGN</span>
                        </NavLink>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map(link => (
                                <NavLink key={link.to} to={link.to} className={linkClass}>
                                    {link.text}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                    
                    <div className="hidden md:flex items-center">
                        <NavLink to="/my-appointments" className="text-brand-light hover:text-gold transition-colors duration-300">Moje Termíny</NavLink>
                        
                        <NavLink to="/pricelist" className="relative text-brand-light hover:text-gold transition-colors duration-300 ml-6 mr-6" aria-label={`Nákupný košík, ${cartItemCount} položiek`}>
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                             {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                    {cartItemCount}
                                </span>
                             )}
                        </NavLink>

                        <NavLink to="/dashboard" className="bg-gold text-brand-dark font-semibold py-2 px-4 rounded-full hover:bg-yellow-400 transition-all duration-300">
                           Admin
                        </NavLink>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} type="button" className="bg-brand-secondary inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navLinks.map(link => (
                        <NavLink key={link.to} to={link.to} className={linkClass} onClick={() => setIsMenuOpen(false)}>
                            {link.text}
                        </NavLink>
                    ))}
                    <NavLink to="/my-appointments" className={linkClass} onClick={() => setIsMenuOpen(false)}>Moje Termíny</NavLink>
                     <NavLink to="/pricelist" className={linkClass} onClick={() => setIsMenuOpen(false)}>Nákupný Košík ({cartItemCount})</NavLink>
                    <NavLink to="/dashboard" className="block py-2 px-3 rounded text-center bg-gold text-brand-dark font-semibold mt-2" onClick={() => setIsMenuOpen(false)}>
                        Admin
                    </NavLink>
                </div>
            </div>
        </header>
    );
};