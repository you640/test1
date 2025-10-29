
import React, { useState, useEffect, useCallback } from 'react';
import { SalonService, Stylist } from '../../types';
import { salonDataService } from '../../services/salonData';
import { geminiService } from '../../services/geminiService';
import { useAuth } from '../../context/AuthContext';

const Booking: React.FC = () => {
    const { currentUser } = useAuth();
    const [services, setServices] = useState<SalonService[]>([]);
    const [stylists, setStylists] = useState<Stylist[]>([]);
    const [selectedService, setSelectedService] = useState<SalonService | null>(null);
    const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [addonSuggestion, setAddonSuggestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            const data = await salonDataService.getServices();
            setServices(data);
        };
        fetchServices();
    }, []);

    const handleServiceSelect = async (serviceId: string) => {
        setIsLoading(true);
        setAddonSuggestion('');
        const service = services.find(s => s.id === serviceId);
        if (!service) return;
        
        setSelectedService(service);
        setSelectedStylist(null);
        
        const availableStylists = await salonDataService.getStylistsForService(serviceId);
        setStylists(availableStylists);
        
        const suggestion = await geminiService.getAddonServiceSuggestion(service, services);
        setAddonSuggestion(suggestion);
        setIsLoading(false);
    };

    const handleBooking = async () => {
        if (!currentUser || !selectedService || !selectedStylist || !selectedDate) {
            alert('Prosím, vyplňte všetky polia.');
            return;
        }

        const appointmentData = {
            userId: currentUser.uid,
            serviceId: selectedService.id,
            stylistId: selectedStylist.id,
            startTime: new Date(selectedDate),
            status: 'upcoming' as const,
        };
        
        await salonDataService.createAppointment(appointmentData);
        setIsConfirmed(true);
    };

    if (isConfirmed) {
        return (
            <div className="container mx-auto p-8 text-center">
                <h1 className="text-4xl font-serif text-gold mb-4">Rezervácia Potvrdená!</h1>
                <p className="text-lg text-brand-light/80 mb-8">Ďakujeme, tešíme sa na vašu návštevu.</p>
                <p>Termín: {new Date(selectedDate).toLocaleString('sk-SK')}</p>
                <p>Služba: {selectedService?.name}</p>
                <p>Stylista: {selectedStylist?.name}</p>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-4xl font-serif text-gold mb-8 text-center">Vytvoriť Rezerváciu</h1>
            <div className="max-w-2xl mx-auto bg-brand-secondary p-8 rounded-lg shadow-lg">
                <div className="space-y-6">
                    {/* Step 1: Service Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gold mb-2">1. Vyberte Službu</label>
                        <select
                            onChange={(e) => handleServiceSelect(e.target.value)}
                            className="w-full bg-brand-dark border border-gold/30 rounded-md p-2 text-brand-light focus:ring-gold focus:border-gold"
                            disabled={isLoading}
                        >
                            <option value="">-- Prosím, vyberte --</option>
                            {services.map(s => <option key={s.id} value={s.id}>{s.name} - {s.price}€</option>)}
                        </select>
                    </div>

                    {/* AI Suggestion */}
                    {isLoading && <p className="text-gold text-center animate-pulse">Hľadám návrhy...</p>}
                    {addonSuggestion && (
                        <div className="bg-gold/10 border-l-4 border-gold text-gold p-4 rounded-r-lg">
                            <p className="font-bold">Tip pre vás!</p>
                            <p>{addonSuggestion}</p>
                        </div>
                    )}

                    {/* Step 2: Stylist Selection */}
                    {selectedService && (
                        <div>
                            <label className="block text-sm font-medium text-gold mb-2">2. Vyberte Stylistu</label>
                            <select
                                onChange={(e) => setSelectedStylist(stylists.find(s => s.id === e.target.value) || null)}
                                className="w-full bg-brand-dark border border-gold/30 rounded-md p-2 text-brand-light focus:ring-gold focus:border-gold"
                            >
                                <option value="">-- Ktorýkoľvek dostupný --</option>
                                {stylists.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                    )}

                    {/* Step 3: Date & Time */}
                    {selectedStylist && (
                        <div>
                            <label className="block text-sm font-medium text-gold mb-2">3. Vyberte Dátum a Čas</label>
                            <input
                                type="datetime-local"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full bg-brand-dark border border-gold/30 rounded-md p-2 text-brand-light focus:ring-gold focus:border-gold"
                            />
                        </div>
                    )}
                </div>

                <div className="mt-8">
                    <button
                        onClick={handleBooking}
                        disabled={!selectedService || !selectedStylist || !selectedDate}
                        className="w-full bg-gold text-brand-dark font-bold py-3 px-4 rounded-md hover:bg-yellow-400 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        Potvrdiť Rezerváciu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Booking;
