
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { salonDataService } from '../../services/salonData';
import { Appointment, SalonService, Stylist } from '../../types';

interface PopulatedAppointment extends Appointment {
    serviceName: string;
    stylistName: string;
}

const MyAppointments: React.FC = () => {
    const { currentUser } = useAuth();
    const [appointments, setAppointments] = useState<PopulatedAppointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            if (!currentUser) return;
            setLoading(true);
            const [userAppointments, services, stylists] = await Promise.all([
                salonDataService.getUserAppointments(currentUser.uid),
                salonDataService.getServices(),
                salonDataService.getStylists()
            ]);
            
            const populated = userAppointments.map(appt => ({
                ...appt,
                serviceName: services.find(s => s.id === appt.serviceId)?.name || 'Neznáma služba',
                stylistName: stylists.find(s => s.id === appt.stylistId)?.name || 'Neznámy stylista',
            }));

            setAppointments(populated);
            setLoading(false);
        };

        fetchAppointments();
    }, [currentUser]);

    const handleCancel = async (appointmentId: string) => {
        if (window.confirm('Naozaj si prajete zrušiť tento termín?')) {
            await salonDataService.cancelAppointment(appointmentId);
            setAppointments(prev => prev.map(a => a.id === appointmentId ? { ...a, status: 'cancelled' } : a));
        }
    };

    if (loading) {
        return <div className="text-center p-8 text-gold">Načítavam vaše termíny...</div>;
    }

    if (!currentUser) {
        return <div className="text-center p-8 text-brand-light">Prosím, prihláste sa, aby ste videli svoje termíny.</div>;
    }
    
    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-4xl font-serif text-gold mb-8 text-center">Moje Termíny</h1>
            {appointments.length === 0 ? (
                <p className="text-center text-brand-light/80">Zatiaľ nemáte žiadne rezervácie.</p>
            ) : (
                <div className="max-w-4xl mx-auto space-y-4">
                    {appointments.map(appt => (
                        <div key={appt.id} className="bg-brand-secondary p-6 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div>
                                <p className="text-xl font-bold text-brand-light">{appt.serviceName}</p>
                                <p className="text-brand-light/80">Stylista: {appt.stylistName}</p>
                                <p className="text-brand-light/80">Dátum: {new Date(appt.startTime).toLocaleString('sk-SK')}</p>
                            </div>
                            <div className="mt-4 md:mt-0 flex items-center space-x-4">
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                    appt.status === 'upcoming' ? 'bg-blue-500/20 text-blue-300' : 
                                    appt.status === 'completed' ? 'bg-green-500/20 text-green-300' : 
                                    'bg-red-500/20 text-red-300'
                                }`}>
                                    {appt.status === 'upcoming' ? 'Nadchádzajúci' : appt.status === 'completed' ? 'Ukončený' : 'Zrušený'}
                                </span>
                                {appt.status === 'upcoming' && (
                                    <button 
                                        onClick={() => handleCancel(appt.id)}
                                        className="bg-red-600/80 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                                    >
                                        Zrušiť
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyAppointments;
