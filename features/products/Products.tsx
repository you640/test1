
import React, { useState, useEffect } from 'react';
import { Product, WpService } from '../../types';
import { useCart } from '../../context/CartContext';

type GroupedServices = {
    [key: string]: WpService[];
};

const Pricelist: React.FC = () => {
    const [groupedServices, setGroupedServices] = useState<GroupedServices>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://api.gruppa.cloud/wp-json/gruppa/services/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: WpService[] = await response.json();

                // Make filtering more robust: check for title and that price is a number (not null/undefined)
                const filteredData = data.filter(service => 
                    service.post_title && typeof service.post_price === 'number'
                );

                const grouped = filteredData.reduce<GroupedServices>((acc, service) => {
                    const category = service.post_category || 'Nezaradené';
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(service);
                    return acc;
                }, {});

                setGroupedServices(grouped);
            } catch (e) {
                console.error("Failed to fetch services:", e);
                setError('Nepodarilo sa načítať cenník. Skúste to prosím neskôr.');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);
    
    const handleAddToCart = (service: WpService) => {
        const product: Product = {
            id: parseInt(service._ID, 10),
            name: service.post_title,
            price: service.post_price, // No parseFloat needed, it's already a number
            description: service.post_desc || 'Popis nie je k dispozícii.',
            imageUrl: `https://picsum.photos/seed/${service._ID}/400/400`, // Placeholder image
        };
        addToCart(product);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gold"></div>
            </div>
        );
    }
    
    if (error) {
         return <div className="text-center p-8 text-red-400">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-4xl font-serif text-gold mb-8 text-center">Cenník Služieb</h1>
            
            <div className="max-w-4xl mx-auto space-y-12">
                {Object.keys(groupedServices).length === 0 && !loading && (
                    <p className="text-center text-brand-light/80">Momentálne nie sú k dispozícii žiadne služby.</p>
                )}
                {Object.entries(groupedServices).map(([category, services]) => (
                    <div key={category}>
                        <h2 className="text-3xl font-serif text-gold/90 mb-6 border-b-2 border-gold/20 pb-2">{category}</h2>
                        <div className="space-y-4">
                            {services.map(service => (
                                <div key={service._ID} className="bg-brand-secondary p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-brand-light">{service.post_title}</h3>
                                        {service.post_desc && <p className="text-brand-light/70 mt-1" dangerouslySetInnerHTML={{ __html: service.post_desc }}></p>}
                                    </div>
                                    <div className="text-left sm:text-right w-full sm:w-auto mt-2 sm:mt-0">
                                        <div className="text-lg font-semibold text-gold whitespace-nowrap">{service.post_price.toFixed(2)} €</div>
                                        {service.post_duration && <div className="text-sm text-brand-light/60">{service.post_duration} min</div>}
                                        <button 
                                            onClick={() => handleAddToCart(service)}
                                            className="mt-2 bg-gold/90 text-brand-dark text-sm font-bold py-1 px-3 rounded-md hover:bg-gold transition-colors w-full sm:w-auto"
                                        >
                                            Do košíka
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pricelist;