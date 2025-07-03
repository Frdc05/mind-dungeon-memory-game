import React from 'react';
import Question from '../Icon/Question';

export default function CardFront() {
    return (
        <div className="card-face card-front w-full h-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/Card/Front.png')" }}>
        </div>
    );
};

