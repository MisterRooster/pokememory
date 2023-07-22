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
    <div className='grid grid-cols-cards gap-5'>
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
const Card = ({uuid, onClick}) => {
  const [creature, setCreature] = useState(null);
  const [resetToggle, setResetToggle] = useState(false);

  // used for dynamic font scaling
  const cardRef = useRef(null);
  const [fontSize, setFontSize] = useState(0);

  // used to show detailed info
  const [detailMode, setDetailMode] = useState(false);
  const detailModeStyle = (detailMode) ? "detailMode" : "";

  function handleClick(e) {
    if (onClick) onClick();
    //reset();
  }

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
      className="card mask mask-squircle relative bg-base-300 w-full aspect-square overflow-hidden hover:bg-primary"
    >
      {!creature && <span className="loading loading-spinner loading-lg m-auto text-base-100"></span>}
      {creature && <>
        <img
          className={`${detailModeStyle} absolute inset-0 max-w-none w-full object-cover`}
          src={creature.sprite} 
        />
        <p
          className="absolute bottom-4 inset-x-0 text-center font-semibold bg-secondary/75"
          onMouseOver={() => setDetailMode(true)}
          onMouseOut={() => setDetailMode(false)}
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
};

CardGrid.Card = Card;

export default CardGrid;