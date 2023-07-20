import './App.css'
import { useState } from 'react'

import HeaderBar from './components/HeaderBar';
import FooterBar from './components/FooterBar';
import CardGrid from './components/CardGrid';
import ModalInfo from './components/ModalInfo';

function App() {
  const numberOfCards = 20;

  const [creatureIndices, setCreatureIndices] = useState([]);
  const [cardKeys, setCardKeys] = useState([...Array(3).keys()]);

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  let cards = []
  for (let idx = 0; idx < numberOfCards; idx+=1)
  {
    cards.push(
      <CardGrid.Card
        key={idx}
        creatureIdx={idx < creatureIndices.length ? creatureIndices[idx] : null}
      />
    );
  }

  return (
    <div className='flex flex-col min-h-full'>
      <ModalInfo />
      <HeaderBar currentScore={score} bestScore={bestScore}/>
      <main className='p-4 flex-1 bg-gradient-to-b from-base-100 to-base-200'>
        <CardGrid>
          {cards}
        </CardGrid>
      </main>
      <FooterBar />
    </div>
  )
}

export default App
