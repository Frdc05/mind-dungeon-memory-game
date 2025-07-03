import React from 'react';

export default function CardBack(image){
    return (
        <>
            <div className="card-face card-back w-full h-full bg-contain bg-center no-repeat" 
                style={{ backgroundImage: "url('/Card/Back/Coin.png')"}}>
            </div>
        </>
    )
};
