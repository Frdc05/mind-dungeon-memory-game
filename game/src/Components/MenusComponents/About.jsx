export default function About() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">About This Game</h1>
            <p className="text-lg text-gray-700 mb-6">
                This game is a fun and engaging way to test your memory and improve your cognitive skills.
                Developed with love, it offers a unique blend of challenge and entertainment.
            </p>
            <button
                onClick={() => window.location.reload()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md"
            >
                Play Again
            </button>
        </div>
    );
}