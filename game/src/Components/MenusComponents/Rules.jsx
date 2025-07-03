export default function Rules() {
    return (
        <div className="flex flex-col items-center justify-center h-full p-4">
            <h1 className="text-2xl font-bold mb-4">Game Rules</h1>
            <p className="text-lg text-gray-700 mb-2">1. Match pairs of cards to score points.</p>
            <p className="text-lg text-gray-700 mb-2">2. Each level has a different grid size and number of pairs.</p>
            <p className="text-lg text-gray-700 mb-2">3. Use hints wisely to find pairs faster.</p>
            <p className="text-lg text-gray-700 mb-2">4. Complete levels to unlock new challenges.</p>
            <button
                onClick={() => window.location.reload()}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Back to Game
            </button>
        </div>
    );
}