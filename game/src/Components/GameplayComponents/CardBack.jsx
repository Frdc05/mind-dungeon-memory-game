export default function CardBack({ image, point }) {
    return (
        <div className="card-face card-back w-full h-full flex items-center justify-center overflow-hidden">
            <div
                className="w-full h-full bg-center bg-contain bg-no-repeat"
                style={{
                    backgroundImage: "url('/Card/Back/CardGame1/Card.png')",
                    imageRendering: 'pixelated'
                }}
            />
            {/* Optional decorative image; move it outside if it overlaps layout */}
            <img
                src={image}
                alt="Card Back Icon"
                className="absolute w-12 h-12 object-contain pointer-events-none bg-transparent"
                style={{ imageRendering: 'pixelated', top: '20%', zIndex: 10 }}
            />

            <p className="absolute z-10 font-bold text-lg translate-y-5 text-yellow-300 text-shadow-lg text-center font-jersey">+{point}</p>
        </div>
    );
}
