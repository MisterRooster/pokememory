/**
 * ModalBox
 * 
 * requires: npm i react-modal
 * 
 * use:
 * <ModalBox isOpen={openstate}, close={setOpenState} ...>
 *  {children}
 * </ModalBox>
 */
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import './ModalBox.css'

Modal.setAppElement('#root');

Modal.defaultStyles = {
  overlay: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    inset: 0,
    backdropFilter: 'blur(5px) brightness(0.5)',
  },
  content: {
    WebkitOverflowScrolling: 'touch',
  }
};

function ModalBox({
  children,
  isOpen,
  close,
  onAfterOpen,
  onAfterClose,
  closeOnOverlayClick=true,
  closeOnEsc=true,
  aria,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onAfterClose={onAfterClose}
      onRequestClose={close}
      shouldCloseOnOverlayClick={closeOnOverlayClick}
      shouldCloseOnEsc={closeOnEsc}
      closeTimeoutMS={200}
      className="p-5 bg-base-100 self-end sm:self-center rounded-xl overflow-auto"
      aria={aria}
    >
      {children}
    </Modal>
  );
}

ModalBox.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  onAfterOpen: PropTypes.func,
  onAfterClose: PropTypes.func,
  closeOnOverlayClick: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
  aria: PropTypes.object,
};

export default ModalBox;