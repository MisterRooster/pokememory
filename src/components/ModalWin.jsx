import PropTypes from 'prop-types';

export default function ModalWin({currLevel}) {
  return (
    <dialog id="modal_win" className="modal modal-bottom sm:modal-middle">
      <form method="dialog" className="modal-box">
        <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2 text-xl">✕</button>
        <h3 className="font-bold text-lg">Congrats</h3>
        <p className="pt-4">
          You beat <b>Level {currLevel}</b>!
        </p>
        <p className="">Can you do it with one more?</p>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

ModalWin.propTypes = {
  children: PropTypes.number,
};