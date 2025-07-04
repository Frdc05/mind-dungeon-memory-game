import { useEffect, useState } from 'react';
import LightBulb from '../Icon/LightBulb';
import InfoCircle from '../Icon/InfoCircle';

export default function Toast({ message, type = 'info', duration = 3000, onClose }) {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const startFade = setTimeout(() => setIsClosing(true), duration - 500); // Start fade out
        const autoRemove = setTimeout(() => onClose(), duration); // Auto close

        return () => {
        clearTimeout(startFade);
        clearTimeout(autoRemove);
        };
    }, [duration, onClose]);

    // Manual close handler
    const handleManualClose = () => {
        setIsClosing(true);
        setTimeout(() => onClose(), 500); // Wait fade out before remove
    };

    return (
        <div
            className={`
                fixed top-6 right-6 z-50 max-w-xs w-full
                bg-yellow-100/90 border border-yellow-400
                text-[#5c3a28] font-pixel shadow-xl
                rounded-lg px-4 py-3 flex items-start gap-3
                ${isClosing ? 'animate-fade-out' : 'animate-bounce-in'}
            `}
            role="alert"
        >
            {/* Icon */}
            <div className="flex-shrink-0 mt-1">
                <InfoCircle w={32} h={32} className='text-yellow-700' />
            </div>

            {/* Message */}
            <div className="text-sm leading-snug">
                <p className="font-bold text-[#5c3a28]">Oops!</p>
                <p>{message}</p>
            </div>

            {/* Close Button */}
            <button
                onClick={handleManualClose}
                className="ml-auto text-yellow-800 hover:text-red-500 transition-all"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

        </div>
    );
}
