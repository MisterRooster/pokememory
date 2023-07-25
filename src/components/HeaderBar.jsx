import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames'

import ModalInfo from './ModalInfo';
import ThemeToggler from './ThemeToggler';
import SoundToggler from './SoundToggler';


function HeaderBar({
  level, currentScore, bestScore,
  hasSound, setHasSound, timerData,
}) {
  const [modalInfoOpen, setModalInfoOpen] = useState(false);

   // used for dynamic layout changes
   const flexDivRef = useRef(null);
   const [isWrapped, setIsWrapped] = useState("flex-row");

  // track if flex div is wrapped
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const childNode = entries[0].target.lastElementChild;
      setIsWrapped((childNode.offsetTop - entries[0].target.offsetTop > 5) ? true : false);
    });

    if (flexDivRef && flexDivRef.current) {
      resizeObserver.observe(flexDivRef.current);
    }
  }, [flexDivRef]);

  // conditional layout on flex wrap
  const togglerClass = cn({
    "flex gap-4 gap-y-8 flex-wrap": true,
    "flex-col ml-[56px]": isWrapped,
    "flex-row": !isWrapped,
  });
  const scoreClass = cn({
    "mx-auto text-center text-accent": true,
    "pl-[56px]": isWrapped,
    "px-[28px]": !isWrapped,
  });

  return (
    <header className="p-4 flex items-center bg-gradient-to-b from-secondary to-base-100">
      <ModalInfo
        isOpen={modalInfoOpen}
        close={() => setModalInfoOpen(false)}
        onAfterClose={timerData.resume}
      />
      <div ref={flexDivRef} className='flex-1 flex flex-row flex-wrap items-center gap-4'>
        <div>
          <h1 className="text-xl text-primary-content font-space2p font-bold">POKEMEMORY</h1>
          <h4 className="font-space2p font-bold text-sm">Level {level+1}</h4>
        </div>
        <div className='flex-1 flex'>
          <button onClick={() => {
            timerData.pause();
            setModalInfoOpen(true);
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
          </button>
          <div className={scoreClass}>
            <p className='font-space2p text-sm whitespace-nowrap'>Score: {currentScore}</p>
            <p className='font-space2p text-sm whitespace-nowrap'>Best: {bestScore}</p>
            <span>{timerData.days}</span>:<span>{timerData.hours}</span>:<span>{timerData.minutes}</span>:<span>{timerData.seconds}</span>
          </div>
        </div>
      </div>
      <div className={togglerClass}>
        <ThemeToggler size={32}/>
        <SoundToggler size={32} hasSound={hasSound} setHasSound={setHasSound} />
      </div>
    </header>
  );
}

HeaderBar.propTypes = {
  level: PropTypes.number,
  currentScore: PropTypes.number,
  bestScore: PropTypes.number,
  hasSound: PropTypes.bool,
  setHasSound: PropTypes.func,
  timerData: PropTypes.object,
};

export default HeaderBar;