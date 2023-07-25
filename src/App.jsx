import { useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook';

import HeaderBar from './components/HeaderBar';
import FooterBar from './components/FooterBar';
import CardGrid from './components/CardGrid';
import ModalWelcome from './components/ModalWelcome';
import ModalWin from './components/ModalWin';
import ModalGameOver from './components/ModalGameOver';

import SndRightChoiceUrl from './assets/right_choice.mp3';
import SndWrongChoiceUrl from './assets/wrong_choice.mp3';
import SndLevelUpUrl from './assets/level_up.mp3';
import SndGameOverUrl from './assets/game_over.mp3';


function createEnum(values) {
  const enumObject = {};
  for (const val of values) {
    enumObject[val] = val;
  }
  return Object.freeze(enumObject);
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

  const MODALTYPE = createEnum(['WELCOME', 'INFO', 'LEVELUP', 'GAMEOVER']);
  const [modalOpenArr, setModalOpenArr] = useState({ WELCOME: true, INFO: false, LEVELUP: false, GAMEOVER: false});

  function openModal(modaltype) {
    switch (modaltype) {
      case MODALTYPE.WELCOME:
        setModalOpenArr({...modalOpenArr, WELCOME: true});
        break;
      case MODALTYPE.INFO:
        setModalOpenArr({...modalOpenArr, INFO: true});
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
      case MODALTYPE.INFO:
        setModalOpenArr({...modalOpenArr, INFO: false});
        break;
      case MODALTYPE.LEVELUP:
        setModalOpenArr({...modalOpenArr, LEVELUP: false});
        break;
      case MODALTYPE.GAMEOVER:
        setModalOpenArr({...modalOpenArr, GAMEOVER: false});
        break;
    }
  }

  // show info modal on start
  /*/useEffect(() => {
    if (!window.modal_welcome.open) window.modal_welcome.showModal()
  }, []);//*/

  // ---------------------- game ----------------------- //

  const startNumberOfCards = 5;
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const [cardKeys, setCardKeys] = useState([...Array(level + startNumberOfCards).keys()]);
  const [clickedCards, setClickedCards] = useState(new Set());
  const [blinkingCard, setBlinkingCard] = useState(-1);

  // timer data
  const startTime = new Date();
  startTime.setSeconds(startTime.getSeconds() + 10);
  const {
    totalSeconds, seconds, minutes, hours, days,
    isRunning, start, pause, resume, restart,
  } = useTimer({ expiryTimestamp: startTime, autoStart: false, onExpire: gameOver });

  function resetLevel() {
    setScore(0);
    setClickedCards(new Set());
  }

  function newLevel(value) {
    setLevel((prev) => value);
    setCardKeys(() => [...Array(value + startNumberOfCards).keys()]);
    resetLevel();
  }

  function gameOver() {
    if (hasSound) playSound(SndGameOverUrl);
    openModal(MODALTYPE.GAMEOVER);
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
      if (hasSound) playSound(SndWrongChoiceUrl);

      setBlinkingCard(()=>uuid);
      (async ()=>{
        setTimeout(() => setBlinkingCard(-1), 1000);
      })();

      resetLevel();
    } else {
      if (hasSound) playSound(SndRightChoiceUrl);

      setClickedCards((prev) => prev.add(uuid));
      setScore((prev) => prev+1);
      setBestScore((prev) => Math.max(score + 1, prev)); // +1 because react state set is not atomic

      // user has finished the level
      if (score+1 === (startNumberOfCards+level)) {
        if (hasSound) playSound(SndLevelUpUrl);
        window.modal_win.showModal()
        newLevel(level + 1);
      }

      // shuffle keys
      setCardKeys((prev)=> shuffledArray(prev));
    }
  }

  return (
    <div className='flex flex-col min-h-full max-w-7xl my-0 mx-auto border-x border-base-300'>
      <ModalWelcome isOpen={modalOpenArr.WELCOME} close={()=>closeModal(MODALTYPE.WELCOME)}/>
      <ModalWin currLevel={level}/>
      <ModalGameOver
        isOpen={modalOpenArr.GAMEOVER}
        close={() => closeModal(MODALTYPE.GAMEOVER)}
        onAfterClose={()=>newLevel(0)}/>
      <HeaderBar
        level={level}
        currentScore={score}
        bestScore={bestScore}
        hasSound={hasSound} 
        setHasSound={setHasSound}
        timerData={{
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds,
          pause: pause,
          resume: resume,
        }}
      />
      <button className='btn btn-secondary' onClick={start}>Start Timer</button>
      <button className='btn btn-secondary' onClick={pause}>Pause Timer</button>
      <button className='btn btn-secondary' onClick={resume}>Resume Timer</button>
      <button className='btn btn-secondary' onClick={() => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 20);
        restart(time);
      }}>Restart Timer</button>
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
