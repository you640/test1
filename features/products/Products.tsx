
import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { salonDataService } from '../../services/salonData';
import { useCart } from '../../context/CartContext';

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await salonDataService.getProducts();
            setProducts(data);
        };
        fetchProducts();
    }, []);
    
    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-4xl font-serif text-gold mb-8 text-center">Exkluzívne Produkty</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map(product => (
                    <div key={product.id} className="bg-brand-secondary rounded-lg shadow-lg overflow-hidden text-center p-6 flex flex-col">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover mb-4 rounded" />
                        <div className="flex-grow">
                            <h2 className="text-xl font-bold text-brand-light">{product.name}</h2>
                            <p className="text-brand-light/70 my-2">{product.description}</p>
                        </div>
                        <div className="mt-4">
                            <p className="text-2xl font-semibold text-gold mb-4">{product.price.toFixed(2)} €</p>
                            <button 
                                onClick={() => addToCart(product)}
                                className="w-full bg-gold text-brand-dark font-bold py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors"
                            >
                                Pridať do košíka
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;