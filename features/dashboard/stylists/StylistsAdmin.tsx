import React, { useState, useEffect } from 'react';
import { Stylist } from '../../../types';
import { salonDataService } from '../../../services/salonData';
import { Modal } from '../../../components/Modal';

const StylistForm: React.FC<{ stylist?: Stylist | null, onSave: () => void, onCancel: () => void }> = ({ stylist, onSave, onCancel }) => (
    <form onSubmit={(e) => { e.preventDefault(); onSave(); }} className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gold mb-1">Meno</label>
            <input type="text" defaultValue={stylist?.name} className="w-full bg-brand-dark border border-gold/30 rounded-md p-2 text-brand-light focus:ring-gold focus:border-gold" />
        </div>
        <div>
            <label className="block text-sm font-medium text-gold mb-1">Titul</label>
            <input type="text" defaultValue={stylist?.title} className="w-full bg-brand-dark border border-gold/30 rounded-md p-2 text-brand-light focus:ring-gold focus:border-gold" />
        </div>
        <div>
            <label className="block text-sm font-medium text-gold mb-1">Popis</label>
            <textarea rows={3} defaultValue={stylist?.description} className="w-full bg-brand-dark border border-gold/30 rounded-md p-2 text-brand-light focus:ring-gold focus:border-gold" />
        </div>
        <div className="flex justify-end space-x-2 pt-4">
            <button type="button" onClick={onCancel} className="bg-brand-secondary text-brand-light font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">Zrušiť</button>
            <button type="submit" className="bg-gold text-brand-dark font-semibold py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors">Uložiť</button>
        </div>
    </form>
);


const DashboardStylists: React.FC = () => {
    const [stylists, setStylists] = useState<Stylist[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);

    useEffect(() => {
        const fetchStylists = async () => {
            const data = await salonDataService.getStylists();
            setStylists(data);
        };
        fetchStylists();
    }, []);

    const handleEditClick = (stylist: Stylist) => {
        setSelectedStylist(stylist);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (stylistId: string) => {
        if (window.confirm('Naozaj si prajete zmazať tohto stylistu?')) {
            console.log('Deleting stylist:', stylistId);
            setStylists(prev => prev.filter(s => s.id !== stylistId));
        }
    };

    const closeModal = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setSelectedStylist(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gold">Správa Stylistov</h1>
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-gold text-brand-dark font-semibold py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors">
                    Pridať Stylistu
                </button>
            </div>
            <div className="bg-brand-secondary shadow-lg rounded-lg overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-brand-dark/50">
                        <tr>
                            <th className="p-4 text-gold">Meno</th>
                            <th className="p-4 text-gold">Titul</th>
                            <th className="p-4 text-gold">Akcie</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stylists.map(stylist => (
                            <tr key={stylist.id} className="border-b border-gold/20 last:border-0 hover:bg-brand-dark/30">
                                <td className="p-4 text-brand-light">{stylist.name}</td>
                                <td className="p-4 text-brand-light/80">{stylist.title}</td>
                                <td className="p-4 space-x-2">
                                    <button onClick={() => handleEditClick(stylist)} className="text-blue-400 hover:underline">Upraviť</button>
                                    <button onClick={() => handleDeleteClick(stylist.id)} className="text-red-400 hover:underline">Zmazať</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={isAddModalOpen} onClose={closeModal} title="Pridať Nového Stylistu">
                 <StylistForm onSave={closeModal} onCancel={closeModal} />
            </Modal>
            
            <Modal isOpen={isEditModalOpen} onClose={closeModal} title="Upraviť Stylistu">
                 <StylistForm stylist={selectedStylist} onSave={closeModal} onCancel={closeModal} />
            </Modal>
        </div>
    );
};

export default DashboardStylists;