import React from 'react';

export default function CardFront() {
    return (
        <div className="card-face card-front w-full h-full flex items-center justify-center overflow-hidden">
            <div
                className="w-full h-full bg-center bg-no-repeat bg-contain"
                style={{ backgroundImage: "url('/Card/Front.png')" }}
            />
        </div>
    );
}
