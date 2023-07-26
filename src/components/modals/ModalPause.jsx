import PropTypes from 'prop-types';
import ModalBox from "./ModalBox/ModalBox"

/*
 * Modal window displaying game is paused
 */
function ModalPause({ isOpen, close, onAfterClose}) {
  return (
    <ModalBox
      isOpen={isOpen}
      close={close}
      onAfterClose={onAfterClose}
      closeOnOverlayClick={true}
      closeOnEsc={true}
      ClassName="shadow-lg shadow-secondary max-w-lg"
      aria={{
        labelledby: "mpg_heading",
        describedby: "mpg_description",
      }}
    >
      <h3 id="mpg_heading" className="font-bold text-lg text-center">GAME PAUSED</h3>
      <div id="mpg_description">
        <p className="py-4 text-center">
          Relax your mind for a while!
        </p>
        <div className="py-4 flex justify-center">
        <button
          onClick={close}
          className='btn btn-primary'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className='w-8 h-8' viewBox="0 0 24 24" fill='currentColor'><title>play</title><path d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>
          Continue
        </button>
      </div>
    </div>
    </ModalBox>
  );
}

ModalPause.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  onAfterClose: PropTypes.func,
};

export default ModalPause;