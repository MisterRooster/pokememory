import PropTypes from 'prop-types';
import ModalBox from "./ModalBox/ModalBox"

/*
 * Modal window displaying game instructions
 */
function ModalInfo({ isOpen, close, onAfterClose}) {
  return (
    <ModalBox
      isOpen={isOpen}
      close={close}
      onAfterClose={onAfterClose}
      closeOnOverlayClick={true}
      closeOnEsc={true}
      ClassName="shadow-2xl shadow-secondary max-w-lg"
      aria={{
        labelledby: "mif_heading",
        describedby: "mif_description",
      }}
    >
      <button
        onClick={close}
        className="btn btn-md btn-circle btn-ghost absolute right-2 top-2 text-xl"
      >✕</button>
      <h3 id="mif_heading" className="font-bold text-lg">How to play:</h3>
      <div id="mif_description">
        <p className="py-4">
          Try to click on as many cards as possible without
          choosing the same card twice.
          The pokemons are getting reordered randomly after every choice.
          You beat a level when there is no unique card left to choose.
        </p>
        <p>
          On every level one additional pokemon joins and you get a time bonus.
          The faster you are the higher your score!
        </p>
        <p className="font-semibold">
          Don't let time run out and Have fun playing!
        </p>
      </div>
    </ModalBox>
  );
}

ModalInfo.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  onAfterClose: PropTypes.func,
};

export default ModalInfo;