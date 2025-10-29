
import React, { useState } from 'react';
import { ContentIdea } from '../../../types';
import { geminiService } from '../../../services/geminiService';

const DashboardContentIdeas: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [ideas, setIdeas] = useState<ContentIdea[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!topic) return;
        setLoading(true);
        setError(null);
        setIdeas([]);
        try {
            const result = await geminiService.generateContentIdeas(topic);
            setIdeas(result);
        } catch (e) {
            setError('Nepodarilo sa vygenerovať nápady. Skúste to prosím znova.');
            console.error(e);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div>
            <h1 className="text-3xl font-bold text-gold mb-2">Generátor Nápadov na Obsah</h1>
            <p className="text-brand-light/70 mb-6">Zadajte tému a nechajte AI, aby vám vytvorila nápady na príspevky pre sociálne siete.</p>

            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Napr. letné trendy vo farbení"
                    className="flex-grow bg-brand-secondary border border-gold/30 rounded-md p-3 text-brand-light focus:ring-gold focus:border-gold"
                />
                <button
                    onClick={handleGenerate}
                    disabled={loading || !topic}
                    className="bg-gold text-brand-dark font-bold py-3 px-6 rounded-md hover:bg-yellow-400 transition-colors disabled:bg-gray-500"
                >
                    {loading ? 'Generujem...' : 'Vygenerovať'}
                </button>
            </div>

            {error && <p className="text-red-400 text-center">{error}</p>}

            <div className="space-y-4">
                {ideas.map((idea, index) => (
                    <div key={index} className="bg-brand-secondary p-4 rounded-lg shadow-lg">
                        <div className="flex justify-between items-start">
                           <h2 className="text-xl font-bold text-gold">{idea.title}</h2>
                           <span className="bg-brand-dark text-gold text-sm font-semibold px-2 py-1 rounded">{idea.platform}</span>
                        </div>
                        <p className="text-brand-light/80 my-2">{idea.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {idea.hashtags.map(tag => <span key={tag} className="text-sm text-blue-300">#{tag}</span>)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardContentIdeas;
