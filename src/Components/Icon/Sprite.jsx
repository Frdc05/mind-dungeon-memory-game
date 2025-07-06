import React, { useEffect, useState } from 'react';

export default function Sprite({ charIndex = 0, scale = 2, animate = false }) {
    const [frame, setFrame] = useState(1); // frame tengah sebagai idle
    const spriteWidth = 48;
    const spriteHeight = 64;

    // Looping frame: 0 → 1 → 2 → 1 → 0
    useEffect(() => {
        if (!animate) return;
        const sequence = [0, 1, 2, 1]; 
        let index = 0;
        const interval = setInterval(() => {
            setFrame(sequence[index]);
            index = (index + 1) % sequence.length;
        }, 300);
        return () => clearInterval(interval);
    }, [animate]);

    const col = frame;       
    const row = 0;  // baris idle menghadap ke bawah

    // Hitung koordinat karakter dalam sprite sheet 4 kolom × 2 baris
    const charX = charIndex % 4;
    const charY = Math.floor(charIndex / 4);

    const offsetX = (charX * 3 + col) * spriteWidth;
    const offsetY = (charY * 4 + row) * spriteHeight;

    // Total ukuran background penuh (8 kolom × 48, 8 baris × 64)
    const sheetWidth = 576;
    const sheetHeight = 512;

    return (
        <div
            style={{
                width: `${spriteWidth * scale}px`,
                height: `${spriteHeight * scale}px`,
                backgroundImage: "url('/Character/NostalgiaMZ/RMVX/Color/Characters/Actor1.png')",
                backgroundPosition: `-${offsetX * scale}px -${offsetY * scale}px`,
                backgroundSize: `${sheetWidth * scale}px ${sheetHeight * scale}px`,
                imageRendering: 'pixelated',
                backgroundRepeat: 'no-repeat'
            }}
        />
    );
}
