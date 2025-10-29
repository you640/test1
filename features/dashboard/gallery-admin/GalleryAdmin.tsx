
import React, { useState, useEffect } from 'react';
import { GalleryItem } from '../../../types';
import { salonDataService } from '../../../services/salonData';

const DashboardGalleryAdmin: React.FC = () => {
    const [items, setItems] = useState<GalleryItem[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            const data = await salonDataService.getGalleryItems();
            setItems(data);
        };
        fetchItems();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gold">Správa Galérie</h1>
                <button className="bg-gold text-brand-dark font-semibold py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors">
                    Nahrať Obrázok
                </button>
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map(item => (
                    <div key={item.id} className="group relative">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-64 object-cover rounded-lg" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                            <h3 className="text-white font-bold">{item.title}</h3>
                            <div className="flex space-x-2 mt-2">
                                <button className="text-sm text-blue-300 hover:underline">Upraviť</button>
                                <button className="text-sm text-red-400 hover:underline">Zmazať</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardGalleryAdmin;
