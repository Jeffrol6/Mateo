import React from 'react';

const LetterButton = ({ letra, onClick, completed }) => {
  return (
    <button
      onClick={() => onClick(letra)}
      className={`w-24 h-24 m-2 text-white text-5xl font-bold rounded-2xl flex items-center justify-center shadow-lg transition-colors ${
        completed ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
      }`}
    >
      {letra}
    </button>
  );
};

export default LetterButton;
