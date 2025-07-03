import React, { useState } from 'react';

const QuizModal = ({ isOpen, question, onSubmitAnswer, onClose }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      onSubmitAnswer(selectedAnswer); 
      setSelectedAnswer(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 font-pixel">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full text-black">
        <h2 className="text-xl font-bold mb-4 text-center text-purple-700">🧠 Answer the Question!</h2>
        
        <p className="mb-4 text-lg">{question.text}</p>

        <div className="flex flex-col gap-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 border rounded-md hover:bg-purple-100 ${
                selectedAnswer === idx ? 'bg-purple-200 border-purple-500' : 'border-gray-300'
              }`}
              onClick={() => setSelectedAnswer(idx)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 underline">Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
