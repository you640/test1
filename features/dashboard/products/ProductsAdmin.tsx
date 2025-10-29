import React, { useState, useEffect } from 'react';
import { Product } from '../../../types';
import { salonDataService } from '../../../services/salonData';
import { Modal } from '../../../components/Modal';

const ProductForm: React.FC<{ product?: Product | null, onSave: () => void, onCancel: () => void }> = ({ product, onSave, onCancel }) => (
    <form onSubmit={(e) => { e.preventDefault(); onSave(); }} className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gold mb-1">Názov Produktu</label>
            <input type="text" defaultValue={product?.name} className="w-full bg-brand-dark border border-gold/30 rounded-md p-2 text-brand-light focus:ring-gold focus:border-gold" />
        </div>
        <div>
            <label className="block text-sm font-medium text-gold mb-1">Cena</label>
            <input type="number" step="0.01" defaultValue={product?.price} className="w-full bg-brand-dark border border-gold/30 rounded-md p-2 text-brand-light focus:ring-gold focus:border-gold" />
        </div>
         <div>
            <label className="block text-sm font-medium text-gold mb-1">Popis</label>
            <textarea rows={3} defaultValue={product?.description} className="w-full bg-brand-dark border border-gold/30 rounded-md p-2 text-brand-light focus:ring-gold focus:border-gold" />
        </div>
        <div className="flex justify-end space-x-2 pt-4">
            <button type="button" onClick={onCancel} className="bg-brand-secondary text-brand-light font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors">Zrušiť</button>
            <button type="submit" className="bg-gold text-brand-dark font-semibold py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors">Uložiť</button>
        </div>
    </form>
);


const DashboardProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await salonDataService.getProducts();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    const handleEditClick = (product: Product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (productId: number) => {
        if (window.confirm('Naozaj si prajete zmazať tento produkt?')) {
            // Placeholder for delete logic
            console.log('Deleting product:', productId);
            setProducts(prev => prev.filter(p => p.id !== productId));
        }
    };
    
    const closeModal = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setSelectedProduct(null);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gold">Správa Produktov</h1>
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-gold text-brand-dark font-semibold py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors">
                    Pridať Produkt
                </button>
            </div>
            <div className="bg-brand-secondary shadow-lg rounded-lg overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-brand-dark/50">
                        <tr>
                            <th className="p-4 text-gold">Názov</th>
                            <th className="p-4 text-gold">Cena</th>
                            <th className="p-4 text-gold">Akcie</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="border-b border-gold/20 last:border-0 hover:bg-brand-dark/30">
                                <td className="p-4 text-brand-light">{product.name}</td>
                                <td className="p-4 text-brand-light/80">{product.price.toFixed(2)} €</td>
                                <td className="p-4 space-x-2">
                                    <button onClick={() => handleEditClick(product)} className="text-blue-400 hover:underline">Upraviť</button>
                                    <button onClick={() => handleDeleteClick(product.id)} className="text-red-400 hover:underline">Zmazať</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <Modal isOpen={isAddModalOpen} onClose={closeModal} title="Pridať Nový Produkt">
                 <ProductForm onSave={closeModal} onCancel={closeModal} />
            </Modal>
            
            <Modal isOpen={isEditModalOpen} onClose={closeModal} title="Upraviť Produkt">
                 <ProductForm product={selectedProduct} onSave={closeModal} onCancel={closeModal} />
            </Modal>
        </div>
    );
};

export default DashboardProducts;