
import React, { useState, useEffect } from 'react';
import { Appointment, UserProfile } from '../../../types';
import { salonDataService } from '../../../services/salonData';

const DashboardOverview: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [clients, setClients] = useState<UserProfile[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const [appts, clnts] = await Promise.all([
                salonDataService.getAppointments(),
                salonDataService.getUsers()
            ]);
            setAppointments(appts.filter(a => a.status === 'upcoming'));
            setClients(clnts.filter(c => !c.isAdmin));
        };
        fetchData();
    }, []);

    const upcomingAppointments = appointments.length;
    const totalClients = clients.length;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gold mb-6">Prehľad</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-brand-secondary p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg text-brand-light/70 mb-2">Nadchádzajúce Termíny</h2>
                    <p className="text-4xl font-bold text-gold">{upcomingAppointments}</p>
                </div>
                <div className="bg-brand-secondary p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg text-brand-light/70 mb-2">Celkový Počet Klientov</h2>
                    <p className="text-4xl font-bold text-gold">{totalClients}</p>
                </div>
                <div className="bg-brand-secondary p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg text-brand-light/70 mb-2">Dnešné Tržby (Placeholder)</h2>
                    <p className="text-4xl font-bold text-gold">€ 350</p>
                </div>
                <div className="bg-brand-secondary p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg text-brand-light/70 mb-2">Nové Rezervácie Dnes</h2>
                    <p className="text-4xl font-bold text-gold">5</p>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gold mb-4">Najbližšie Termíny</h2>
                <div className="bg-brand-secondary p-4 rounded-lg shadow-lg">
                     {appointments.slice(0, 5).map(appt => (
                         <div key={appt.id} className="border-b border-gold/20 last:border-b-0 p-3">
                            <p className="text-brand-light">{clients.find(c => c.uid === appt.userId)?.name || 'Neznámy klient'}</p>
                            <p className="text-sm text-brand-light/70">{new Date(appt.startTime).toLocaleString('sk-SK')}</p>
                         </div>
                     ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
