export default function ModalInfo() {
  return (
    <dialog id="modal_info" className="modal modal-bottom sm:modal-middle">
      <form method="dialog" className="modal-box">
        <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2 text-xl">✕</button>
        <h3 className="font-bold text-lg">Welcome to Pokememory!</h3>
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
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}