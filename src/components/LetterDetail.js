import React, { useState, useEffect } from 'react';
import WordImage from './WordImage';
import { letras } from '../mock/letras';

const LetterDetail = ({ letraData, onBack, onComplete }) => {
  const [testWord, setTestWord] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const [showDinamica, setShowDinamica] = useState(false);
  const [dinamicaCompleted, setDinamicaCompleted] = useState(false);

  useEffect(() => {
    generateTest();
    setShowVideo(false);
    setShowDinamica(false);
    setDinamicaCompleted(false);
  }, [letraData]);

  const playFonema = () => {
    const audio = new Audio(letraData.fonema);
    audio.play();
  };

  const generateTest = () => {
    const correctWord = letraData.palabras[Math.floor(Math.random() * letraData.palabras.length)];
    setTestWord(correctWord);

    const allWords = [correctWord];
    while (allWords.length < 3) {
      const randomLetra = letras[Math.floor(Math.random() * letras.length)];
      const randomWord = randomLetra.palabras[Math.floor(Math.random() * randomLetra.palabras.length)];
      if (!allWords.find(word => word.palabra === randomWord.palabra)) {
        allWords.push(randomWord);
      }
    }

    for (let i = allWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allWords[i], allWords[j]] = [allWords[j], allWords[i]];
    }

    setOptions(allWords);
    setFeedback('');
  };

  const handleTestClick = (selectedWord) => {
    if (selectedWord.palabra === testWord.palabra) {
      setFeedback('¡Correcto!');
      setTimeout(() => {
        generateTest();
        setShowVideo(true);
      }, 1500);
    } else {
      setFeedback('Intenta de nuevo');
    }
  };

  const handleVideoEnd = () => {
    setShowVideo(false);
    setShowDinamica(true);
  };

  const handleDinamicaComplete = () => {
    setDinamicaCompleted(true);
    onComplete(letraData.letra);
  };

  // 🔽 Determinar fondo por sección
  const fondo = showDinamica
    ? '/image/p5.jpg'
    : showVideo
    ? '/image/p4.jpeg'
    : '/image/p3.jpg';

  return (
    <div
      className="p-6 min-h-screen flex flex-col items-center relative bg-cover bg-center"
      style={{ backgroundImage: `url('${fondo}')` }}
    >
      <button
        onClick={onBack}
        className="absolute top-4 left-4 bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600 transition-colors"
      >
        Volver al Menú
      </button>

      {/* VISTA PRINCIPAL */}
      {!showVideo && !showDinamica && (
        <>
          <h1 className="text-8xl font-black text-red-600 mt-8 mb-4">{letraData.letra}</h1>
          <button
            onClick={playFonema}
            className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-full text-2xl font-bold shadow-lg hover:bg-yellow-500 transition-colors"
          >
            Escuchar sonido
          </button>

          <div className="flex flex-wrap justify-center mt-8">
            {letraData.palabras.map((palabra, index) => (
              <WordImage key={index} {...palabra} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-3xl font-bold text-green-700">Mini Test:</h2>
            {testWord && (
              <>
                <p className="text-2xl mt-4 text-gray-800">
                  ¿Qué palabra empieza con la letra "{letraData.letra}"?
                </p>
                <div className="flex flex-wrap justify-center mt-6">
                  {options.map((option, index) => (
                    <div key={index} className="flex flex-col items-center m-3">
                      <img
                        src={option.imagen}
                        alt={option.palabra}
                        className="w-28 h-28 rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => handleTestClick(option)}
                      />
                      <p className="mt-1 text-lg font-medium text-gray-700">{option.palabra}</p>
                    </div>
                  ))}
                </div>
                <p
                  className={`mt-4 text-2xl font-bold ${
                    feedback === '¡Correcto!' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {feedback}
                </p>
              </>
            )}
          </div>
        </>
      )}

      {/* VIDEO EDUCATIVO */}
      {showVideo && (
        <div className="mt-12 w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-blue-700 text-center mb-4">¡Mira este video!</h2>

          <video
            src={letraData.video}
            controls
            autoPlay
            muted
            onEnded={handleVideoEnd}
            className="w-full h-auto rounded-lg shadow-lg"
          >
            Tu navegador no soporta este video.
          </video>

          <button
            onClick={handleVideoEnd}
            className="mt-4 bg-yellow-500 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition-colors mx-auto block"
          >
            Saltar video (para prueba)
          </button>
        </div>
      )}

      {/* DINÁMICA FINAL */}
      {showDinamica && (
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-orange-700 mb-4">¡Es hora de jugar!</h2>
          <p className="text-2xl text-gray-800 mb-6">{letraData.dinamica}</p>

          <div className="bg-white p-8 rounded-lg shadow-lg border-4 border-orange-400">
            <img
              src={letraData.dinamicaimg}
              alt={`Dinámica de la letra ${letraData.letra}`}
              className="mx-auto max-w-full h-auto rounded-lg"
            />
          </div>

          <button
            onClick={handleDinamicaComplete}
            disabled={dinamicaCompleted}
            className={`mt-8 px-8 py-4 text-white text-2xl font-bold rounded-full shadow-lg transition-colors ${
              dinamicaCompleted ? 'bg-green-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {dinamicaCompleted ? '¡Completado!' : 'Completar Dinámica'}
          </button>
        </div>
      )}
    </div>
  );
};

export default LetterDetail;
