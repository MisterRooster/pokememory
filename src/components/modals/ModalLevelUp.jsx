import PropTypes from 'prop-types';
import ModalBox from "./ModalBox/ModalBox"

/*
 * Modal window shown when leveling up
 */
function ModalLevelUp({ isOpen, close, onAfterClose, currLevel, startNumberOfCards}) {
  return (
    <ModalBox
      isOpen={isOpen}
      close={close}
      onAfterClose={onAfterClose}
      closeOnOverlayClick={true}
      closeOnEsc={true}
      ClassName="shadow-lg shadow-secondary max-w-lg text-center"
      aria={{
        labelledby: "mlu_heading",
        describedby: "mlu_description",
      }}
    >
      <button
        onClick={close}
        className="btn btn-md btn-circle btn-ghost absolute right-2 top-2 text-xl"
      >✕</button>
      <h3 id="mlu_heading" className="font-bold text-3xl text-center">Congrats</h3>
      <div id="mlu_description">
        <p className="pt-4">
          You beat <b>Level {currLevel+1}</b>!
        </p>
        <p>
          Time bonus gained: <b>{(currLevel + 1 + startNumberOfCards)*2}s</b>
        </p>
        <p className="">Can you do it with one more before time runs out?</p>
      </div>
      <div className="py-4 flex justify-center">
        <button
          onClick={close}
          className='btn btn-primary'
        >Next Level ≫</button>
      </div>
    </ModalBox>
  );
}

ModalLevelUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  onAfterClose: PropTypes.func,
  currLevel: PropTypes.number.isRequired,
};

export default ModalLevelUp;