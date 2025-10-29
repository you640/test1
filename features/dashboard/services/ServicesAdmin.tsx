import React, { useState, useEffect } from 'react';
import { SalonService } from '../../../types';
import { salonDataService } from '../../../services/salonData';
import { Modal } from '../../../components/Modal';

const ServiceForm: React.FC<{ service?: SalonService | null, onSave: () => void, onCancel: () => void }> = ({ service, onSave, onCancel }) => (
    <form onSubmit={(e) => { e.preventDefault(); onSave(); }} className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gold mb-1">Názov Služby</label>
            <input type="text" defaultValue={service?.name} className="w-full bg-brand-dark border border-gold/30 rounded-md p-2 text-brand-light focus:ring-gold focus:border-gold" />
        </div>
        <div>
            <label className="block text-sm font-medium text-gold mb-1">Kategória</label>
             <select defaultValue={service?.category} className="w-full bg-brand-dark border border-gold/30 rounded-md p-2 text-brand-light focus:ring-gold focus:border-gold">
                <option>Dámske</option>
                <option>Pánske</option>
                <option>Farbenie</option>
                <option>Ostatné</option>
            </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gold mb-1">Trvanie (min)</label>
                <input type="number" defaultValue={service?.duration} className="w-full bg-brand-dark border border-gold/30 rounded-md p-2 text-brand-light focus:ring-gold focus:border-gold" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gold mb-1">Cena (€)</label>
                <input type="number" step="0.01" defaultValue={service?.price} className="w-full bg-brand-dark border border-gold/30 rounded-md p-2 text-brand-light focus:ring-gold focus:border-gold" />
            </div>
        </div>
        <div className="flex justify-end space-x-2 pt-4">
            <button type="button" onClick={onCancel} className="bg-brand-secondary text-brand-light font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">Zrušiť</button>
            <button type="submit" className="bg-gold text-brand-dark font-semibold py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors">Uložiť</button>
        </div>
    </form>
);


const DashboardServices: React.FC = () => {
    const [services, setServices] = useState<SalonService[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<SalonService | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            const data = await salonDataService.getServices();
            setServices(data);
        };
        fetchServices();
    }, []);

    const handleEditClick = (service: SalonService) => {
        setSelectedService(service);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (serviceId: string) => {
        if (window.confirm('Naozaj si prajete zmazať túto službu?')) {
            console.log('Deleting service:', serviceId);
            setServices(prev => prev.filter(s => s.id !== serviceId));
        }
    };

    const closeModal = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setSelectedService(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gold">Správa Služieb</h1>
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-gold text-brand-dark font-semibold py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors">
                    Pridať Službu
                </button>
            </div>
            <div className="bg-brand-secondary shadow-lg rounded-lg overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-brand-dark/50">
                        <tr>
                            <th className="p-4 text-gold">Názov</th>
                            <th className="p-4 text-gold">Kategória</th>
                            <th className="p-4 text-gold">Trvanie</th>
                            <th className="p-4 text-gold">Cena</th>
                            <th className="p-4 text-gold">Akcie</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(service => (
                            <tr key={service.id} className="border-b border-gold/20 last:border-0 hover:bg-brand-dark/30">
                                <td className="p-4 text-brand-light">{service.name}</td>
                                <td className="p-4 text-brand-light/80">{service.category}</td>
                                <td className="p-4 text-brand-light/80">{service.duration} min</td>
                                <td className="p-4 text-brand-light/80">{service.price.toFixed(2)} €</td>
                                <td className="p-4 space-x-2">
                                    <button onClick={() => handleEditClick(service)} className="text-blue-400 hover:underline">Upraviť</button>
                                    <button onClick={() => handleDeleteClick(service.id)} className="text-red-400 hover:underline">Zmazať</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <Modal isOpen={isAddModalOpen} onClose={closeModal} title="Pridať Novú Službu">
                 <ServiceForm onSave={closeModal} onCancel={closeModal} />
            </Modal>

            <Modal isOpen={isEditModalOpen} onClose={closeModal} title="Upraviť Službu">
                 <ServiceForm service={selectedService} onSave={closeModal} onCancel={closeModal} />
            </Modal>
        </div>
    );
};

export default DashboardServices;