
import React, { useState, useEffect } from 'react';
import { GalleryItem } from '../../types';
import { salonDataService } from '../../services/salonData';

const Gallery: React.FC = () => {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('Všetko');

    useEffect(() => {
        const fetchData = async () => {
            const galleryItems = await salonDataService.getGalleryItems();
            setItems(galleryItems);
            setFilteredItems(galleryItems);
            const uniqueCategories = ['Všetko', ...new Set(galleryItems.map(item => item.category))];
            setCategories(uniqueCategories);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedCategory === 'Všetko') {
            setFilteredItems(items);
        } else {
            setFilteredItems(items.filter(item => item.category === selectedCategory));
        }
    }, [selectedCategory, items]);
    
    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-4xl font-serif text-gold mb-8 text-center">Galéria Našej Práce</h1>

            <div className="flex justify-center flex-wrap gap-2 mb-8">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full font-semibold transition-colors ${selectedCategory === category ? 'bg-gold text-brand-dark' : 'bg-brand-secondary text-brand-light hover:bg-gold/80 hover:text-brand-dark'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredItems.map(item => (
                    <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-lg">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4">
                            <h3 className="text-lg font-bold text-white">{item.title}</h3>
                            <p className="text-sm text-gold">{item.category}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
