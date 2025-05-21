import React from 'react';

const WordImage = ({ palabra, imagen, sonido, sonidoPalabra }) => {
  const playSound = () => {
    const audio = new Audio(sonidoPalabra); // Play the word sound
    audio.play();
  };

  return (
    <div className="flex flex-col items-center m-4">
      <img
        src={imagen}
        alt={palabra}
        className="w-32 h-32 rounded-xl shadow-md cursor-pointer"
        onClick={playSound}
      />
      <p className="mt-2 text-xl font-semibold text-gray-800">{palabra}</p>
    </div>
  );
};

export default WordImage;