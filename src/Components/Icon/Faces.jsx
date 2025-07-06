export default function Sprite({ x = 0, y = 0, scale = 1, bgWidth = 384 , bgLength = 192 }) {
    const faceSize = 96;

    return (
        <div
            className="image-pixelated"
            style={{
                width: `${faceSize * scale}px`,
                height: `${faceSize * scale}px`,
                backgroundImage: "url('/Character/NostalgiaMZ/RMVX/Color/Faces/Actor1RMMZ.png')",
                backgroundPosition: `-${x * faceSize}px -${y * faceSize}px`,
                backgroundSize: `${bgWidth}px ${bgLength}px`,
                imageRendering: 'pixelated',
                backgroundRepeat: 'no-repeat',
            }}
        />
    );
}
