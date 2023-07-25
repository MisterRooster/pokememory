import { useState } from 'react'
import { useTimer } from 'react-timer-hook';
import cn from 'classnames'

import HeaderBar from './components/HeaderBar';
import FooterBar from './components/FooterBar';
import CardGrid from './components/CardGrid';
import ModalWelcome from './components/ModalWelcome';
import ModalLevelUp from './components/ModalLevelUp';
import ModalGameOver from './components/ModalGameOver';

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
  const [modalOpenArr, setModalOpenArr] = useState({ WELCOME: true, LEVELUP: false, GAMEOVER: false});

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

  // ------------------- game logic -------------------- //

  const startNumberOfCards = 5;
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const [cardKeys, setCardKeys] = useState([...Array(level + startNumberOfCards).keys()]);
  const [clickedCards, setClickedCards] = useState(new Set());
  const [blinkingCard, setBlinkingCard] = useState(-1);

  // timer data
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

  function resetLevel() {
    setScore(0);
    setClickedCards(new Set());
  }

  function gotoLevel(value) {
    setLevel((prev) => value);
    setCardKeys(() => [...Array(value + startNumberOfCards).keys()]);
    resetLevel();

    if (value === 0)
      addTime(60);
    else
      addTime((value + startNumberOfCards)*3);
  }

  function gameOver() {
    if (hasSound) playSound(SndGameOverUrl);
    openModal(MODALTYPE.GAMEOVER);
  }

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

      setClickedCards((prev) => new Set(prev.add(uuid)));
      setScore((prev) => prev+1);
      setBestScore((prev) => Math.max(score + 1, prev)); // +1 because react state set is not atomic

      // user has finished the level
      if (score+1 === (startNumberOfCards+level)) {
        if (hasSound) playSound(SndLevelUpUrl);
        pause();
        openModal(MODALTYPE.LEVELUP);
      }

      // shuffle keys
      setCardKeys((prev)=> shuffledArray(prev));
    }
  }

  // --------------------- render ---------------------- //

  // colorize timer when time is low
  const timerClass = cn({
    "mx-4 p-4 font-space2p text-md text-center border-2 border-base-content rounded-lg": true,
    "text-accent": (totalSeconds < 10),
  });
  const secString = (seconds < 10) ? "0" + seconds : seconds;

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
        currLevel={level}/>
      <ModalGameOver
        isOpen={modalOpenArr.GAMEOVER}
        close={() => closeModal(MODALTYPE.GAMEOVER)}
        onAfterClose={() => gotoLevel(0)}
        maxlevel={level}
        score={bestScore}/>
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
      <p className={timerClass}>
        <span>{minutes}</span>:<span>{secString}</span>
      </p>
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
