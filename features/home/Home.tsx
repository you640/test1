import React from 'react';
import { Hero } from '../../components/Hero'; // Import the new Hero component

const Home: React.FC = () => {
    return (
        <div className="text-brand-light">
            {/* New Ultra Premium Parallax Hero Section */}
            <Hero />

            {/* About Section */}
            <section className="py-20 bg-brand-secondary">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-serif text-gold mb-4">Naše Štúdio</h2>
                    <p className="max-w-3xl mx-auto text-brand-light/80 leading-relaxed">
                        V PAPI Hair Design veríme, že každý účes je osobným vyjadrením. Náš tím talentovaných stylistov je tu, aby vám pomohol nájsť a zdokonaliť váš jedinečný štýl. Ponárame sa do najnovších trendov a techník, aby sme vám priniesli len to najlepšie.
                    </p>
                </div>
            </section>

            {/* Featured Services */}
            <section className="py-20 bg-brand-dark">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-serif text-gold mb-12 text-center">Vybrané Služby</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-brand-secondary p-8 rounded-lg text-center shadow-lg hover:shadow-gold/20 transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-brand-light mb-2">Moderné Strihy</h3>
                            <p className="text-brand-light/70">Precízne strihy pre dámy aj pánov, prispôsobené vašej osobnosti.</p>
                        </div>
                        <div className="bg-brand-secondary p-8 rounded-lg text-center shadow-lg hover:shadow-gold/20 transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-brand-light mb-2">Umelecké Farbenie</h3>
                            <p className="text-brand-light/70">Od jemnej balayage po odvážne farby, vytvoríme vám odtieň snov.</p>
                        </div>
                        <div className="bg-brand-secondary p-8 rounded-lg text-center shadow-lg hover:shadow-gold/20 transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-brand-light mb-2">Regeneračné Kúry</h3>
                            <p className="text-brand-light/70">Doprajte svojim vlasom hĺbkovú starostlivosť a vráťte im život.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
