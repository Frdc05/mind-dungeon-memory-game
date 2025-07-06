export default function CardFront() {
    return (
        <div className="card-face card-front w-full h-full flex items-center justify-center overflow-hidden">
            <div
                className="w-full h-full bg-center bg-contain bg-no-repeat"
                style={{
                    backgroundImage: "url('/Card/Back/CardGame1/Card_Back.png')",
                    imageRendering: 'pixelated'
                }}
            />
        </div>
    );
}
