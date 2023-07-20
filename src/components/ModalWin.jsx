export default function ModalWin() {
  return (
    <dialog id="modal_win" className="modal modal-bottom sm:modal-middle">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Congrats!</h3>
        <p className="py-4">You beat the Game!</p>
        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn">Close</button>
        </div>
      </form>
    </dialog>
  );
}