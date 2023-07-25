import PropTypes from 'prop-types';
import cn from 'classnames'


function TimeBar({timerData}) {
  // colorize timer when time is low
  const timerClass = cn({
    "mx-4 p-4 font-space2p text-md text-center border-2 border-base-content rounded-lg": true,
    "text-accent": (timerData.totalSeconds < 10),
  });
  const secString = (timerData.seconds < 10) ? "0" + timerData.seconds : timerData.seconds;

  return (
    <div className={timerClass}>
      <span>{timerData.minutes}</span>:<span>{secString}</span>
    </div>
  );
}

TimeBar.propTypes = {
  TimerBar: PropTypes.object,
};

export default TimerBar;