import './App.css'
import { useEffect, useState } from 'react'

import getRandomPokemons from './modules/pokemons';
import HeaderBar from './components/HeaderBar';
import FooterBar from './components/FooterBar';
import CardGrid from './components/CardGrid';
import ModalInfo from './components/ModalInfo';

function App() {
  const numberOfCards = 0;

  const [pokemons, setPokemons] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const fetchPokemons = async () => {
      const data = await getRandomPokemons(numberOfCards);
      setPokemons(data);
    }

    fetchPokemons().catch(console.error);
  }, []);

  return (
    <div className='flex flex-col min-h-full'>
      <ModalInfo />
      <HeaderBar currentScore={score} bestScore={bestScore}/>
      <main className='p-4 flex-1 bg-gradient-to-b from-base-100 to-base-200'>
        <CardGrid />
      </main>
      <FooterBar />
    </div>
  )
}

export default App
