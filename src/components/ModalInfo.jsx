export default function ModalInfo() {
  return (
    <dialog id="modal_info" className="modal modal-bottom sm:modal-middle">
      <form method="dialog" className="modal-box">
        <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2 text-xl">✕</button>
        <h3 className="font-bold text-lg">How to play:</h3>
        <p className="py-4">
          Try to click on as many cards as possible successively without
          choosing the same card twice.
          You win when there is now unique card left to choose. 
        </p>
        <p>Have fun playing!</p>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}