import { useState } from 'react'

import HeaderBar from './components/HeaderBar';
import FooterBar from './components/FooterBar';
import CardGrid from './components/CardGrid';
import ModalInfo from './components/ModalInfo';
import ModalWin from './components/ModalWin';

function App() {
  const startNumberOfCards = 5;

  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const [cardKeys, setCardKeys] = useState([...Array(level + startNumberOfCards).keys()]);
  const [clickedCards, setClickedCards] = useState(new Set());
  
  function reset() {
    setScore(0);
    setClickedCards(new Set());
  }

  function newLevel(value) {
    setLevel((prev) => value);
    setCardKeys(() => [...Array(value + startNumberOfCards).keys()]);
    reset();
  }

  const shuffledArray = (array) => {
		let shuffledArray = array.slice(0);
		for (let i = 0; i < shuffledArray.length; i++) {
			const j = Math.floor(Math.random() * shuffledArray.length);
			[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
		}
		return shuffledArray;
	}

  function handleClick(uuid) {
    if (clickedCards.has(uuid)) { // card already selected
      reset();
    } else {
      clickedCards.add(uuid);
      setScore((prev) => prev+1);
      setBestScore((prev) => Math.max(score + 1, prev)); // +1 because react state set is not atomic

      // user has finished the level
      if (score+1 === (startNumberOfCards+level)) {
        window.modal_win.showModal()
        newLevel(level + 1);
      }

      // shuffle keys
      setCardKeys((prev)=> shuffledArray(prev));
    }
  }

  return (
    <div className='flex flex-col min-h-full max-w-7xl my-0 mx-auto border-x border-base-300'>
      <ModalInfo />
      <ModalWin currLevel={level}/>
      <HeaderBar level={level} currentScore={score} bestScore={bestScore}/>
      <main className='p-4 flex-1 bg-gradient-to-b from-base-100 to-base-200'>
        <CardGrid>
          {cardKeys.map(key => <CardGrid.Card key={key} uuid={key} onClick={handleClick}/>)}
        </CardGrid>
      </main>
      <FooterBar />
    </div>
  )
}

export default App
