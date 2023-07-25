import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ResourceProvider } from '../modules/ResourceProvider';
import './CardGrid.css'

/*
 * Dynamic grid for holding cards
 */
function CardGrid({children}) {
  let cardComponents = [];
  cardComponents = React.Children.map(children, (child) => 
    child.type.name === 'Card' ? child : null
  );

  return (
    <div className='grid grid-cols-cards-sm sm:grid-cols-cards gap-5'>
      {cardComponents && cardComponents.map((component) => component)}
    </div>
  );
}

CardGrid.propTypes = {
  children: PropTypes.node,
};

/*
 * A game card representing one pokemon
 */
const Card = ({uuid, onClick, blink=false}) => {
  const [creature, setCreature] = useState(null);
  const [resetToggle, setResetToggle] = useState(false);

  // used for dynamic font scaling
  const cardRef = useRef(null);
  const [fontSize, setFontSize] = useState(0);

  // used to show detailed info
  const [detailMode, setDetailMode] = useState(false);
  const detailModeStyle = (detailMode) ? "detailMode" : "";
  const cardBlinkStyle = (blink) ? "blinking" : "";

  function reset() {
    setCreature(null);
    setResetToggle((prev) => !prev);
  }
  
  // fetch new pokemon on mount and on reset
  useEffect(() => {
    let isSubscribed = true;

    (async () => {
      const data = await ResourceProvider.getRandomPokemon();

      // avoid any race conditions if effect is called twice
      if (isSubscribed) setCreature(data);
    })().catch(console.error);

    // cancel any future state changes
    return () => isSubscribed = false;
  }, [resetToggle]);

  // track current card size and scale font accordingly
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const fScale = entries[0].contentRect.width/120;
      setFontSize(()=> 0.675 * fScale);
    });

    if (cardRef && cardRef.current) {
      resizeObserver.observe(cardRef.current);
    }
  },[cardRef]);

  return (
    <button
      ref={cardRef}
      onClick={() => onClick(uuid)}
      className={`card ${cardBlinkStyle} relative bg-base-300 w-full aspect-square overflow-hidden rounded-xl shadow-xl`}
    >
      {!creature && <span className="loading loading-spinner loading-lg m-auto text-base-100"></span>}
      {creature && <>
        <img
          className={`${detailModeStyle} absolute inset-0 max-w-none w-full object-cover`}
          src={creature.sprite} 
        />
        <div
          className='absolute top-[5%] right-[5%] text-md text-base-300-content'
          onMouseOver={() => setDetailMode(true)}
          onMouseOut={() => setDetailMode(false)}>
          <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 -960 960 960"><path d="M453-280h60v-240h-60v240Zm26.982-314q14.018 0 23.518-9.2T513-626q0-14.45-9.482-24.225-9.483-9.775-23.5-9.775-14.018 0-23.518 9.775T447-626q0 13.6 9.482 22.8 9.483 9.2 23.5 9.2Zm.284 514q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Zm.234-60Q622-140 721-239.5t99-241Q820-622 721.188-721 622.375-820 480-820q-141 0-240.5 98.812Q140-622.375 140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg>
        </div>
        <p
          className={`details ${detailModeStyle} absolute bottom-4 inset-x-0 text-center font-bold bg-secondary/75 opacity-0`}
          style={{fontSize: fontSize + 'rem' }} >
          {creature.name}
        </p>
        <div 
          className={`details ${detailModeStyle} absolute top-[30%] right-[12%] text-xs text-left opacity-0`}
          style={{fontSize: fontSize*0.8 + 'rem' }}
        >
          <p>{creature.height} m</p>
          <p>{creature.weight} kg</p>
        </div>
        <div
          className={`details ${detailModeStyle} absolute bottom-[30%] inset-x-0 text-xs opacity-0`}
          style={{fontSize: fontSize*0.8 + 'rem' }}
        >
          <p>type: {creature.types.join(", ")}</p>
        </div>
      </>}
    </button>
  );
}

Card.propTypes = {
  uuid: PropTypes.number,
  onClick: PropTypes.func,
  blink: PropTypes.bool,
};

CardGrid.Card = Card;

export default CardGrid;