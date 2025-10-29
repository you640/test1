
import React, { useState, useEffect } from 'react';
import { UserProfile } from '../../../types';
import { salonDataService } from '../../../services/salonData';

const DashboardClients: React.FC = () => {
    const [clients, setClients] = useState<UserProfile[]>([]);

    useEffect(() => {
        const fetchClients = async () => {
            const users = await salonDataService.getUsers();
            setClients(users.filter(u => !u.isAdmin));
        };
        fetchClients();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gold mb-6">Správa Klientov</h1>
            <div className="bg-brand-secondary shadow-lg rounded-lg overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-brand-dark/50">
                        <tr>
                            <th className="p-4 text-gold">Meno</th>
                            <th className="p-4 text-gold">Email</th>
                            <th className="p-4 text-gold">Telefón</th>
                            <th className="p-4 text-gold">Vernostné body</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.uid} className="border-b border-gold/20 last:border-0 hover:bg-brand-dark/30">
                                <td className="p-4 text-brand-light">{client.name}</td>
                                <td className="p-4 text-brand-light/80">{client.email}</td>
                                <td className="p-4 text-brand-light/80">{client.phone || '-'}</td>
                                <td className="p-4 text-brand-light/80">{client.loyaltyPoints}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardClients;
