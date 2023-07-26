import { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames'

import ModalPause from './modals/ModalPause';

/*
 * Display time value & pause the game
 */
function TimeBar({timerData}) {
  const [modalPauseOpen, setModalPauseOpen] = useState(false);
  
  // colorize timer when time is low
  const timerClass = cn({
    "mx-4 p-4 flex items-center justify-center font-space2p text-md text-center border-2 border-base-content rounded-lg": true,
    "text-accent": (timerData.totalSeconds < 10),
  });
  const secString = (timerData.seconds < 10) ? "0" + timerData.seconds : timerData.seconds;

  return (
    <div className={timerClass}>
      <ModalPause
        isOpen={modalPauseOpen}
        close={() => setModalPauseOpen(false)}
        onAfterClose={timerData.resume}
      />
      <p className='flex-1'><span>{timerData.minutes}</span>:<span>{secString}</span></p>
      <div className="flex font-tektur flex-none tooltip tooltip-left" data-tip="pause">
        <button onClick={() => {
          timerData.pause();
          setModalPauseOpen(true);
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" stroke="currentColor" fill='currentColor'><title>pause</title><path d="M14,19H18V5H14M6,19H10V5H6V19Z" /></svg>
        </button>
      </div>
    </div>
  );
}

TimeBar.propTypes = {
  TimerBar: PropTypes.object,
};

export default TimeBar;