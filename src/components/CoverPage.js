import React from 'react';


const CoverPage = ({ onStart }) => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white p-8 bg-cover bg-center"
      style={{ backgroundImage: `url(/image/p1.png)` }}// Ejemplo de imagen de fondo
    >
      <h1 className="text-7xl md:text-9xl font-black text-yellow-300 animate-bounce">
        ¡Aprende Fonemas desde cero!
      </h1>
      <p className="mt-6 text-3xl md:text-4xl font-semibold text-white text-center">
        Una aventura divertida para descubrir las letras y sus sonidos.
      </p>
      <button
        onClick={onStart}
        className="mt-12 px-10 py-5 bg-green-500 text-white text-3xl font-bold rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110 animate-pulse"
      >
        ¡Empezar!
      </button>
      <div className="mt-12 text-center text-xl text-white">
        <p>Diseñado para pequeños exploradores de 5 años.</p>
      </div>
    </div>
  );
};

export default CoverPage;