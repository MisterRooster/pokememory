import './App.css'
import { useState } from 'react'

import HeaderBar from './components/HeaderBar';
import FooterBar from './components/FooterBar';
import CardGrid from './components/CardGrid';
import ModalInfo from './components/ModalInfo';
import ModalWin from './components/ModalWin';

function App() {
  const numberOfCards = 5;

  const [cardKeys, setCardKeys] = useState([...Array(numberOfCards).keys()]);
  const [clickedCards, setClickedCards] = useState(new Set());

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  
  function reset() {
    setScore(0);
    setClickedCards(new Set());
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
    if (clickedCards.has(uuid)) {
      reset();
    } else {
      clickedCards.add(uuid);
      setScore((prev) => prev+1);
      setBestScore((prev) => Math.max(score + 1, prev)); // +1 because react state set is not atomic

      if (score+1 === numberOfCards)
        window.modal_win.showModal()
      setCardKeys((prev)=> shuffledArray(prev));
    }
  }

  return (
    <div className='flex flex-col min-h-full'>
      <ModalInfo />
      <ModalWin />
      <HeaderBar currentScore={score} bestScore={bestScore}/>
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
