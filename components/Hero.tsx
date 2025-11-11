import React, { useEffect, useRef } from 'react';
import { PhdButton } from './PhdButton';

declare const gsap: any;
declare const ScrollTrigger: any;

export const Hero: React.FC = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.8, // Increased scrub for a more "liquid" feel
                },
            });

            tl.to(backgroundRef.current, {
                yPercent: -30, 
                ease: 'none',
                force3D: true, 
            }, 0); 
            
            tl.to(contentRef.current, {
                yPercent: -50, 
                opacity: 0,
                ease: 'power1.in',
                force3D: true, 
            }, 0);

            return () => {
                if (tl.scrollTrigger) {
                    tl.scrollTrigger.kill();
                }
                tl.kill();
            };
        }
    }, []);

    return (
        <section ref={heroRef} className="relative h-screen overflow-hidden">
            <div
                ref={backgroundRef}
                className="absolute w-full h-[150%] top-[-25%] left-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/assets/phd.webp')",
                    willChange: 'transform', 
                }}
            />
            {/* Added a gradient overlay for a more "liquid gold mist" feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-transparent"></div>
            
            <div 
                ref={contentRef} 
                className="relative z-10 h-full flex items-center justify-center text-center p-4"
                style={{ willChange: 'transform, opacity' }}
            >
                <div>
                    <h1 className="text-4xl md:text-6xl font-serif mb-4 animate-fade-in-down tracking-tight">
                        <span className="text-gold">PAPI HAIR </span>
                        <span className="text-brand-light">DESIGN</span>
                    </h1>
                    <p className="text-sm md:text-base text-brand-light uppercase tracking-widest mb-8 max-w-2xl mx-auto animate-fade-in-up">
                        HAIR SALON & BARBER
                    </p>
                    <PhdButton to="/booking">
                        Rezervovať Termín
                    </PhdButton>
                </div>
            </div>
        </section>
    );
};