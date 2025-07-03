import React, { useState } from 'react';

const characters = [
    { id: 'ch1', name: 'Pixel Wizard', avatar: '/avatars/wizard.png' },
    { id: 'ch2', name: 'Robo Ninja', avatar: '/avatars/ninja.png' },
    { id: 'ch3', name: 'Voxel Knight', avatar: '/avatars/knight.png' },
    { id: 'ch4', name: 'Space Cat', avatar: '/avatars/cat.png' }
];

const CharacterSelect = ({ onSelect }) => {
    const [index, setIndex] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);

    const current = characters[index];

    const handlePrev = () => {
        const newIndex = (index - 1 + characters.length) % characters.length;
        setIndex(newIndex);
        onSelect(characters[newIndex]);
    };

    const handleNext = () => {
        const newIndex = (index + 1) % characters.length;
        setIndex(newIndex);
        onSelect(characters[newIndex]);
    };

    const handlePickFromModal = (char, idx) => {
        setIndex(idx);
        setModalOpen(false);
        onSelect(char);
    };

    return (
        <div className="text-center font-pixel">
            <div className="flex items-center gap-4">
                <button onClick={handlePrev} className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-full">
                ⬅
                </button>

                <div
                className="cursor-pointer border-4 border-blue-500 p-4 rounded-xl shadow-md bg-white transition duration-300 hover:scale-105"
                onClick={() => setModalOpen(true)}
                >
                    <img src={current.avatar} alt={current.name} className="w-16 h-16 mx-auto mb-2" />
                </div>

                <button onClick={handleNext} className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-full">
                ➡
                </button>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 backdrop-blur-[5px] z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
                        <h3 className="text-lg font-bold mb-4 text-center">Select Character</h3>
                        <div className="grid grid-cols-2 gap-4">
                        {characters.map((char, idx) => (
                            <button
                            key={char.id}
                            onClick={() => handlePickFromModal(char, idx)}
                            className={`border rounded-xl p-3 transition-all ${
                                idx === index ? 'border-blue-500 scale-105 bg-blue-50' : 'border-gray-300 hover:bg-gray-100'
                            }`}
                            >
                            <img src={char.avatar} alt={char.name} className="w-16 h-16 mx-auto mb-1" />
                            <p className="text-sm">{char.name}</p>
                            </button>
                        ))}
                        </div>
                        <button
                        onClick={() => setModalOpen(false)}
                        className="mt-6 bg-red-500 text-white px-4 py-2 rounded-full w-full hover:bg-red-600"
                        >
                        Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CharacterSelect;
