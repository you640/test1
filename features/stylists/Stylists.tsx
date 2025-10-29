
import React, { useState, useEffect } from 'react';
import { Stylist } from '../../types';
import { salonDataService } from '../../services/salonData';

const Stylists: React.FC = () => {
    const [stylists, setStylists] = useState<Stylist[]>([]);

    useEffect(() => {
        const fetchStylists = async () => {
            const data = await salonDataService.getStylists();
            setStylists(data);
        };
        fetchStylists();
    }, []);
    
    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-4xl font-serif text-gold mb-8 text-center">Náš Tím Talentov</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
                {stylists.map(stylist => (
                    <div key={stylist.id} className="bg-brand-secondary rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-6 text-center">
                        <img src={stylist.imageUrl} alt={stylist.name} className="w-40 h-40 rounded-full object-cover border-4 border-gold/50 mb-4" />
                        <h2 className="text-2xl font-bold text-gold">{stylist.name}</h2>
                        <h3 className="text-md font-semibold text-brand-light/80 mb-2">{stylist.title}</h3>
                        <p className="text-brand-light/70 mb-4">{stylist.description}</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {stylist.skills.map(skill => (
                                <span key={skill} className="bg-brand-dark px-3 py-1 text-sm rounded-full text-gold">{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stylists;
