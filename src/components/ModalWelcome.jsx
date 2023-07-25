import PropTypes from 'prop-types';
import ModalBox from "./ModalBox/ModalBox"


function ModalWelcome({ isOpen, close, onAfterClose }) {
  return (
    <ModalBox
      isOpen={isOpen}
      close={close}
      onAfterClose={onAfterClose}
      closeOnOverlayClick={false}
      closeOnEsc={true}
      ClassName="shadow-2xl shadow-secondary max-w-lg"
      aria={{
        labelledby: "mwc_heading",
        describedby: "mwc_description",
      }}
    >
      <h3 id="mwc_heading" className="font-bold text-3xl text-center">
        Welcome to Pokememory!
      </h3>
      <div id="mwc_description">
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
      <div className="py-4 flex justify-center">
        <button onClick={close} className='btn btn-primary'>Lets Go!</button>
      </div>
    </ModalBox>
  );
}

ModalWelcome.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  onAfterClose: PropTypes.func,
};

export default ModalWelcome;