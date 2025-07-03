import React from 'react';

export default function CardBack({ image }) {
    return (
        <div className="card-face card-back w-full h-full flex items-center justify-center overflow-hidden">
            <div
                className="w-full h-full bg-contain bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/Card/Back/Coin.png')",
                    imageRendering: 'pixelated'
                }}
            />
        </div>
    );
}
