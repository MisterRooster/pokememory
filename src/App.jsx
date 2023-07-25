import { useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook';

import HeaderBar from './components/HeaderBar';
import FooterBar from './components/FooterBar';
import CardGrid from './components/CardGrid';
import TimeBar from './components/TimeBar';
import ModalWelcome from './components/modals/ModalWelcome';
import ModalLevelUp from './components/modals/ModalLevelUp';
import ModalGameOver from './components/modals/ModalGameOver';

import SndRightChoiceUrl from './assets/right_choice.mp3';
import SndWrongChoiceUrl from './assets/wrong_choice.mp3';
import SndLevelUpUrl from './assets/level_up.mp3';
import SndGameOverUrl from './assets/game_over.mp3';


/* helper function to create enum objects */
function createEnum(values) {
  const enumObject = {};
  for (const val of values) {
    enumObject[val] = val;
  }
  return Object.freeze(enumObject);
}

/* helper function to shuffle an array */
const shuffledArray = (array) => {
  let shuffledArray = array.slice(0);
  for (let i = 0; i < shuffledArray.length; i++) {
    const j = Math.floor(Math.random() * shuffledArray.length);
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

/*
 * Main application component
 */
function App() {

  // ---------------------- sound ---------------------- //

  const [hasSound, setHasSound] = useState(true);

  function playSound(path) {
    if (path === undefined) return;

    const audio = new Audio(path);
    audio.volume = 0.2;
    audio.currentTime = 0;
    audio.play();
  }

  // --------------------- modals ---------------------- //

  const MODALTYPE = createEnum(['WELCOME', 'LEVELUP', 'GAMEOVER']);
  const [modalOpenArr, setModalOpenArr] = useState({ WELCOME: false, LEVELUP: false, GAMEOVER: false});

  function openModal(modaltype) {
    switch (modaltype) {
      case MODALTYPE.WELCOME:
        setModalOpenArr({...modalOpenArr, WELCOME: true});
        break;
      case MODALTYPE.LEVELUP:
        setModalOpenArr({...modalOpenArr, LEVELUP: true});
        break;
      case MODALTYPE.GAMEOVER:
        setModalOpenArr({...modalOpenArr, GAMEOVER: true});
        break;
    }
  }

  function closeModal(modaltype) {
    switch (modaltype) {
      case MODALTYPE.WELCOME:
        setModalOpenArr({...modalOpenArr, WELCOME: false});
        break;
      case MODALTYPE.LEVELUP:
        setModalOpenArr({...modalOpenArr, LEVELUP: false});
        break;
      case MODALTYPE.GAMEOVER:
        setModalOpenArr({...modalOpenArr, GAMEOVER: false});
        break;
    }
  }

  useEffect(() => {
    if (!modalOpenArr.WELCOME)
      openModal(MODALTYPE.WELCOME);
  }, []);

  // ------------------- game logic -------------------- //

  const startNumberOfCards = 5;
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const [cardKeys, setCardKeys] = useState([...Array(level + startNumberOfCards).keys()]);
  const [clickedCards, setClickedCards] = useState(new Set());
  const [consecutiveMax, setConsecutiveMax] = useState(0);
  const [blinkingCard, setBlinkingCard] = useState(-1);

  // timer
  const startTime = new Date();
  startTime.setSeconds(startTime.getSeconds() + 60);
  const {
    totalSeconds, seconds, minutes, hours, days,
    isRunning, start, pause, resume, restart,
  } = useTimer({ expiryTimestamp: startTime, onExpire: gameOver, autoStart: false });

  function addTime(value) {
    const time = new Date();
    time.setSeconds(time.getSeconds() + value + totalSeconds);
    restart(time);
  }

  /* reset the current level */
  function resetLevel() {
    setClickedCards(new Set());
  }

  /* change level */
  function gotoLevel(value) {
    setLevel((prev) => value);
    setCardKeys(() => [...Array(value + startNumberOfCards).keys()]);
    resetLevel();
    setConsecutiveMax(0);
    
    if (value === 0) {
      setScore(0);
      addTime(60);
    }
    else {
      addTime((value + startNumberOfCards)*2);
    }
  }

  /* runs when game is over (timer ran out) */
  function gameOver() {
    if (hasSound) playSound(SndGameOverUrl);
    openModal(MODALTYPE.GAMEOVER);
  }

  /* handler for clicking on card */
  function handleClick(uuid) {
    if (clickedCards.has(uuid)) { // card already selected
      if (hasSound) playSound(SndWrongChoiceUrl);

      setBlinkingCard(()=>uuid);
      (async ()=>{
        setTimeout(() => setBlinkingCard(-1), 1000);
      })();

      resetLevel();
    } else {
      if (hasSound) playSound(SndRightChoiceUrl);
      
      const clickedCardsSize = clickedCards.size+1;
      setClickedCards((prev) => new Set(prev.add(uuid)));
      
      if (clickedCardsSize > consecutiveMax) {
        setConsecutiveMax(clickedCardsSize);

        const newScore = score + level + 1;
        setScore(newScore);
        setBestScore((prev) => Math.max(newScore, prev)); // +1 because react state set is not atomic
      }

      // user has finished the level
      if (clickedCardsSize === (startNumberOfCards+level)) {
        if (hasSound) playSound(SndLevelUpUrl);
        pause();
        openModal(MODALTYPE.LEVELUP);
      }

      // shuffle keys
      setCardKeys((prev)=> shuffledArray(prev));
    }
  }

  // --------------------- render ---------------------- //

  return (
    <div className='flex flex-col min-h-full max-w-7xl my-0 mx-auto border-x border-base-300'>
      <ModalWelcome 
        isOpen={modalOpenArr.WELCOME}
        close={() => closeModal(MODALTYPE.WELCOME)}
        onAfterClose={() => start()}/>
      <ModalLevelUp
        isOpen={modalOpenArr.LEVELUP}
        close={() => closeModal(MODALTYPE.LEVELUP)}
        onAfterClose={() => {
          gotoLevel(level+1);
        }}
        currLevel={level}
        startNumberOfCards={startNumberOfCards}/>
      <ModalGameOver
        isOpen={modalOpenArr.GAMEOVER}
        close={() => closeModal(MODALTYPE.GAMEOVER)}
        onAfterClose={() => gotoLevel(0)}
        maxlevel={level}
        score={score}/>
      <HeaderBar
        level={level}
        currentScore={score}
        bestScore={bestScore}
        hasSound={hasSound} 
        setHasSound={setHasSound}
        timerData={{
          pause: pause,
          resume: resume,
        }}
      />
      <TimeBar 
        timerData={{
          totalSeconds: totalSeconds,
          seconds: seconds,
          minutes: minutes,
          pause: pause,
          resume: resume,
        }}
      />
      <main className='p-4 flex-1 bg-gradient-to-b from-base-100 to-base-200'>
        <CardGrid>
          {cardKeys.map(key =>
            <CardGrid.Card
              key={key}
              uuid={key}
              onClick={handleClick}
              blink={blinkingCard===key}/>)
          }
        </CardGrid>
      </main>
      <FooterBar />
    </div>
  )
}

export default App
