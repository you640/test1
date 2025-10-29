import React from 'react';

const Contact: React.FC = () => {
    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-4xl font-serif text-gold mb-8 text-center">Kontaktujte Nás</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {/* Contact Info & Map */}
                <div className="bg-brand-secondary p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gold mb-4">PAPI Hair Design</h2>
                    <div className="space-y-4 text-brand-light/80">
                        <p><strong>Adresa:</strong> Ulica Umenia 123, 811 01 Bratislava</p>
                        <p><strong>Telefón:</strong> <a href="tel:+421900123456" className="hover:text-gold">+421 900 123 456</a></p>
                        <p><strong>Email:</strong> <a href="mailto:info@papi.sk" className="hover:text-gold">info@papi.sk</a></p>
                        <div className="mt-4">
                            <h3 className="font-semibold text-brand-light mb-2">Otváracie Hodiny</h3>
                            <p>Pondelok - Piatok: 9:00 - 20:00</p>
                            <p>Sobota: 9:00 - 14:00</p>
                            <p>Nedeľa: Zatvorené</p>
                        </div>
                    </div>
                    {/* Real Google Map Embed */}
                    <div className="mt-6 h-64 bg-brand-dark rounded-md overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.4333981881284!2d17.10774931564875!3d48.14859697922365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c893b8f6e594b%3A0x4a5a5c5a5a5a5a5a!2sBratislava%2C%20Slovakia!5e0!3m2!1sen!2sus!4v1633023123456!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa lokality PAPI Hair Design Studio"
                        ></iframe>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-brand-secondary p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gold mb-4">Napíšte nám</h2>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gold mb-1">Meno</label>
                            <input type="text" id="name" className="w-full bg-brand-dark border border-gold/30 rounded-md p-2 text-brand-light focus:ring-gold focus:border-gold" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gold mb-1">Email</label>
                            <input type="email" id="email" className="w-full bg-brand-dark border border-gold/30 rounded-md p-2 text-brand-light focus:ring-gold focus:border-gold" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gold mb-1">Správa</label>
                            <textarea id="message" rows={4} className="w-full bg-brand-dark border border-gold/30 rounded-md p-2 text-brand-light focus:ring-gold focus:border-gold"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-gold text-brand-dark font-bold py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors">
                            Odoslať
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;