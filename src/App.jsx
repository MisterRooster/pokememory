import './App.css'
import { useEffect, useState } from 'react'

import getRandomPokemons from './modules/pokeFetch';
import HeaderBar from './components/HeaderBar';
import FooterBar from './components/FooterBar';
import CardGrid from './components/CardGrid';
import MemoryCard from './components/MemoryCard';
import ModalInfo from './components/ModalInfo';

function App() {
  const numberOfCards = 20;

  const [pokemons, setPokemons] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // fetch list of pokemons on mount
  useEffect(() => {
    let isSubscribed = true;

    (async () => {
      const data = await getRandomPokemons(numberOfCards);

      // avoid any race conditions if effect is called twice
      if (isSubscribed) setPokemons(data);
    })().catch(console.error);

    // cancel any future state changes
    return () => isSubscribed = false;
  }, []);

  return (
    <div className='flex flex-col min-h-full'>
      <ModalInfo />
      <HeaderBar currentScore={score} bestScore={bestScore}/>
      <main className='p-4 flex-1 bg-gradient-to-b from-base-100 to-base-200'>
        <CardGrid>
          <MemoryCard key={0}/>
        </CardGrid>
      </main>
      <FooterBar />
    </div>
  )
}

export default App
