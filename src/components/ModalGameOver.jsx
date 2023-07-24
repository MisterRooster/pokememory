import PropTypes from 'prop-types';
import ModalBox from "./ModalBox/ModalBox"

function ModalGameOver({ isOpen, close, onAfterClose}) {
  return (
    <ModalBox
      isOpen={isOpen}
      close={close}
      onAfterClose={onAfterClose}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      aria={{
        labelledby: "mgo_heading",
        describedby: "mgo_description",
      }}
    >
      <button
        onClick={close}
        className="btn btn-md  btn-circle btn-ghost absolute right-2 top-2 text-xl"
      >✕</button>
      <h3 id="mgo_heading" className="font-bold text-3xl text-center">Game Over</h3>
      <div id="mgo_description">
        <p className="py-4 text-center"> Your time ran out! </p>
        <p className="text-center text-xl border-t border-t-black">Max level: <b>level 4</b> </p>
        <p className="text-center text-xl border-b border-b-black"> Total score: <b>1250</b> </p>
        <p className="pt-4 text-center text-md">
          Nice try, but i think you are good enough to beat this score, aren't you?
        </p>  
      </div>
      <div className="py-4 flex justify-center">
        <button
          onClick={close}
          className='btn btn-primary '
        >dLAY AGAIN</button>
      </div>
    </ModalBox>
  );
}

ModalGameOver.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  onAfterClose: PropTypes.func,
};

export default ModalGameOver;