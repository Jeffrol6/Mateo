import React, { useState } from 'react';
import LetterButton from './components/LetterButton';
import LetterDetail from './components/LetterDetail';
import CoverPage from './components/CoverPage';
import DonateButton from './components/DonateButton'; // Botón de PayPal limpio
import { letras } from './mock/letras';

const App = () => {
  const [currentPage, setCurrentPage] = useState('cover');
  const [selectedLetra, setSelectedLetra] = useState(null);
  const [completedLetters, setCompletedLetters] = useState([]);

  const handleStart = () => setCurrentPage('menu');

  const handleLetterClick = (letra) => {
    const letraData = letras.find((item) => item.letra === letra);
    setSelectedLetra(letraData);
    setCurrentPage('detail');
  };

  const handleBackToMenu = () => {
    setCurrentPage('menu');
    setSelectedLetra(null);
  };

  const handleLetterComplete = (letra) => {
    if (!completedLetters.includes(letra)) {
      setCompletedLetters([...completedLetters, letra]);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Pantalla de portada */}
      {currentPage === 'cover' && <CoverPage onStart={handleStart} />}

      {/* Menú de letras */}
      {currentPage === 'menu' && (
        <div
          className="bg-blue-200 min-h-screen p-8 flex flex-wrap justify-center items-center bg-cover bg-center"
          style={{ backgroundImage: 'url(/image/P2.png)' }}
        >
          {letras.map((letra, index) => (
            <LetterButton
              key={index}
              letra={letra.letra}
              onClick={handleLetterClick}
              completed={completedLetters.includes(letra.letra)}
            />
          ))}
        </div>
      )}

      {/* Detalle de letra */}
      {currentPage === 'detail' && selectedLetra && (
        <LetterDetail
          letraData={selectedLetra}
          onBack={handleBackToMenu}
          onComplete={handleLetterComplete}
        />
      )}

      {/* Botón PayPal flotante SOLO en el menú */}
      {currentPage === 'menu' && <DonateButton />}
    </div>
  );
};

export default App;
