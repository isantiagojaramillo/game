import React, {useState} from 'react';
// import './App.css';

function App() {

  const [randomNumber, setRandomNumber] = useState(null);
  const [storedNumbers, setStoredNumbers] = useState(Array(5).fill(null));
  const [gameLost, setGameLost] = useState(false);
  const [isNumberGenerated, setIsNumberGenerated] = useState(false); 

  const generateRandomNumber = () => {
    if (!isNumberGenerated) { 
      const newRandomNumber = Math.floor(Math.random() * 1000);
      setRandomNumber(newRandomNumber);
      setGameLost(false);
      setIsNumberGenerated(true);
    }
  };

  const storeRandomNumber = (index) => {
    if (randomNumber !== null && isNumberGenerated) { 
      const newStoredNumbers = [...storedNumbers];

      if (index > 0 && randomNumber < storedNumbers[index - 1]) {
        setGameLost(true);
        return;
      }

      newStoredNumbers[index] = randomNumber;
      setStoredNumbers(newStoredNumbers);
      setIsNumberGenerated(false); 
    }
  };

  const resetGame = () => {
    setRandomNumber(null);
    setStoredNumbers(Array(5).fill(null));
    setGameLost(false);
    setIsNumberGenerated(false);
  };

  const checkGameResult = () => {
    if (storedNumbers.every((num, index) => index === 0 || num > storedNumbers[index - 1])) {
      return 'YOU HAVE WON';
    } else if (storedNumbers.every((num, index) => index === 0 || num < storedNumbers[index - 1])) {
      setGameLost(true);
      return 'You FAILED';
    }
    return '';
  };

  return (
    <>
      <h1 className='text-center'>Generate Number</h1>

      <div className='container justify-content-center align-items-center'>
          <div className='text-center'>
            <button className='btn btn-dark m-2' onClick={generateRandomNumber}>Generate Random Number</button>
            <button className='btn btn-dark' onClick={resetGame}>Start Over</button>
          </div>

          <div className='textRandom'>Generated  Number: {randomNumber}</div>
            {gameLost && <div className='lostGame'>You FAILED</div>}
          <div>
            {storedNumbers.map((value, index) => (
              <button key={index} onClick={() => storeRandomNumber(index)} className='btn btn-dark m-2' >
                {value !== null ? value : 'Numbers Position ' + (index + 1)}
              </button>
            ))}
          </div>

          <div>
            {checkGameResult()}
          </div>
      </div>
    </>
  )
}

export default App;
