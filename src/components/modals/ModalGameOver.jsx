import PropTypes from 'prop-types';
import ModalBox from "./ModalBox/ModalBox"

/*
 * Modal window shown when game is over
 */
function ModalGameOver({ isOpen, close, onAfterClose, maxlevel, score}) {
  return (
    <ModalBox
      isOpen={isOpen}
      close={close}
      onAfterClose={onAfterClose}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      ClassName="shadow-2xl shadow-secondary max-w-lg"
      aria={{
        labelledby: "mgo_heading",
        describedby: "mgo_description",
      }}
    >
      <h3 id="mgo_heading" className="font-bold text-3xl text-center">Game Over</h3>
      <div id="mgo_description">
        <p className="py-4 text-center"> Your time ran out! </p>
        <p className="text-center text-xl border-t border-t-secondary">
          Level reached: <b className='text-accent'>{maxlevel + 1}</b>
        </p>
        <p className="text-center text-xl border-b border-b-secondary">
          Total score: <b className='text-accent'>{score}</b>
        </p>
        <p className="pt-4 text-center text-md">
          Nice try, but i think you are good enough to beat this score, aren't you?
        </p>  
      </div>
      <div className="py-4 flex justify-center">
        <button
          onClick={close}
          className='btn btn-primary'
        >PLAY AGAIN</button>
      </div>
    </ModalBox>
  );
}

ModalGameOver.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  onAfterClose: PropTypes.func,
  maxlevel: PropTypes.number,
  score: PropTypes.number,
};

export default ModalGameOver;