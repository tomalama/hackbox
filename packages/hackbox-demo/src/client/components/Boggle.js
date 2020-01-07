import React, { useState, useEffect } from 'react';

function Boggle() {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    const consonant = [
      'B',
      'C',
      'D',
      'F',
      'G',
      'H',
      'J',
      'K',
      'L',
      'M',
      'N',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ];

    const letters = [];
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        letters.push(vowels[Math.floor(Math.random() * vowels.length)]);
      } else {
        letters.push(consonant[Math.floor(Math.random() * consonant.length)]);
      }
    }

    setLetters(letters);
  }, []);

  return (
    <div className='Boggle'>
      <div className='Boggle__Wrapper'>
        <div className='Boggle__Grid'>
          {letters.map((letter, i) => (
            <div key={i}>
              <div>{letter}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Boggle;
