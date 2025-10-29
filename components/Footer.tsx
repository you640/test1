
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-secondary border-t border-gold/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <h3 className="text-xl font-serif text-gold mb-4">PAPI Hair Design</h3>
                        <p className="text-brand-light/70">Štúdio, kde sa umenie stretáva s vlasmi. Poskytujeme prémiové služby v srdci mesta.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-brand-light mb-4">Rýchle Odkazy</h3>
                        <ul className="space-y-2">
                            <li><NavLink to="/booking" className="text-brand-light/70 hover:text-gold transition-colors">Rezervácia</NavLink></li>
                            <li><NavLink to="/services" className="text-brand-light/70 hover:text-gold transition-colors">Služby</NavLink></li>
                            <li><NavLink to="/contact" className="text-brand-light/70 hover:text-gold transition-colors">Kontakt</NavLink></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-brand-light mb-4">Sledujte Nás</h3>
                        <div className="flex justify-center md:justify-start space-x-4">
                            {/* Placeholder for social icons */}
                            <a href="#" className="text-brand-light/70 hover:text-gold transition-colors">Facebook</a>
                            <a href="#" className="text-brand-light/70 hover:text-gold transition-colors">Instagram</a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gold/10 text-center text-brand-light/50">
                    <p>&copy; {new Date().getFullYear()} PAPI Hair Design Studio. Všetky práva vyhradené.</p>
                </div>
            </div>
        </footer>
    );
};
