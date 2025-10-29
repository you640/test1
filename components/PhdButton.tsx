import React, { useRef, useState } from 'react';
import { Link, LinkProps } from 'react-router-dom';

declare const gsap: any;

interface RippleState {
    id: number;
    x: number;
    y: number;
}

// The Ripple component is responsible for a single ripple animation.
const Ripple: React.FC<{ x: number, y: number, onComplete: () => void }> = ({ x, y, onComplete }) => {
    const rippleRef = useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        if (!rippleRef.current || typeof gsap === 'undefined') return;

        // Animate the ripple scaling out and fading away.
        gsap.fromTo(rippleRef.current, {
            scale: 0,
            opacity: 0.7,
        }, {
            scale: 4, 
            opacity: 0,
            duration: 0.7,
            // Easing matches the premium curve from the creative brief for a luxury feel.
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)', 
            // onComplete callback to remove the ripple from the DOM after animation.
            onComplete: onComplete, 
        });
    }, [onComplete]);

    return (
        <span
            ref={rippleRef}
            className="ripple-effect"
            style={{ left: `${x}px`, top: `${y}px` }}
        />
    );
};

interface PhdButtonProps extends Omit<LinkProps, 'to'> {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const PhdButton: React.FC<PhdButtonProps> = ({ to, children, className = '', ...props }) => {
    const [ripples, setRipples] = useState<RippleState[]>([]);
    const buttonRef = useRef<HTMLAnchorElement>(null);

    const handleMouseDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (typeof gsap === 'undefined' || !buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Create a new ripple at the exact point of user contact.
        const newRipple: RippleState = { id: Date.now(), x, y };
        setRipples(prevRipples => [...prevRipples, newRipple]);

        // --- 'Liquid Gold Glow' Effect ---
        // This animation creates a flash of light on click, enhancing the haptic feel.
        gsap.fromTo(buttonRef.current, 
            { 
                // Start from the default hover shadow to ensure a smooth transition.
                boxShadow: '0 4px 20px rgba(217, 197, 135, 0.25)' 
            }, 
            {
                // ENHANCEMENT: Softer, more widespread glow for a more premium look.
                boxShadow: '0 0 15px rgba(217, 197, 135, 0.7), 0 0 40px rgba(217, 197, 135, 0.4)',
                // ENHANCEMENT: Slightly longer duration for a less abrupt, more luxurious feel.
                duration: 0.3, 
                // yoyo and repeat create the flash effect: animates to the glow, then back to the start.
                yoyo: true, 
                repeat: 1, 
                ease: 'power2.out',
            }
        );
    };

    // Function to remove a ripple from state once its animation is complete.
    const removeRipple = (id: number) => {
        setRipples(prevRipples => prevRipples.filter(ripple => ripple.id !== id));
    };

    return (
        <Link
            to={to}
            ref={buttonRef}
            onMouseDown={handleMouseDown}
            className={`phd-button ${className}`}
            {...props}
        >
            <span className="relative z-10">{children}</span>
            {/* Render all active ripples */}
            {ripples.map(ripple => (
                <Ripple
                    key={ripple.id}
                    x={ripple.x}
                    y={ripple.y}
                    onComplete={() => removeRipple(ripple.id)}
                />
            ))}
        </Link>
    );
};
