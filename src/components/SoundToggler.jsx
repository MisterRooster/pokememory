import PropTypes from 'prop-types';

function SoundToggler({ size=32, hasSound, setHasSound }) {
  function toggle() {
    setHasSound(!hasSound)
  }

  return (
    <div className="w-10 h-10 flex-none tooltip tooltip-left" data-tip="turn sound on/off">
      <label className="swap swap-rotate">
        <input onClick={toggle} type="checkbox" />
        <svg className='swap-on fill-current' xmlns="http://www.w3.org/2000/svg" height={size} width={size} viewBox="0 -960 960 960"><path d="m611-323-43-43 114-113-114-113 43-43 113 114 113-114 43 43-114 113 114 113-43 43-113-114-113 114Zm-491-37v-240h160l200-200v640L280-360H120Zm300-288L307-540H180v120h127l113 109v-337ZM311-481Z"/></svg>
        <svg className='swap-off fill-current' xmlns="http://www.w3.org/2000/svg" height={size} width={size} viewBox="0 -960 960 960"><path d="M655-452v-60h145v60H655Zm33 292-119-88 34-47 119 88-34 47Zm-85-505-34-47 119-88 34 47-119 88ZM120-361v-240h160l200-200v640L280-361H120Zm300-288L307-541H180v120h127l113 109v-337Zm-94 168Z"/></svg>
      </label>
    </div>
  );
}

SoundToggler.propTypes = {
  size: PropTypes.number,
  hasSound: PropTypes.bool,
  setHasSound: PropTypes.func,
};

export default SoundToggler;