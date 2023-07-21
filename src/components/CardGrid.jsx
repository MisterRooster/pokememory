import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ResourceProvider } from '../modules/ResourceProvider';
import Placeholder from '../assets/placeholder.png'

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
const Card = () => {
  const [creature, setCreature] = useState(null);
  const [resetToggle, setResetToggle] = useState(false);

  // used for dynamic font scaling
  const cardRef = useRef(null);
  const [fontSize, setFontSize] = useState(0);

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
      setFontSize(()=> 0.675 * fScale + 'rem');
    });

    if (cardRef && cardRef.current) {
      resizeObserver.observe(cardRef.current);
    }
  },[cardRef]);

  return (
    <div ref={cardRef} className="relative bg-base-300 w-full aspect-square rounded-lg overflow-hidden">
      {!creature && <span className="loading loading-spinner loading-lg m-auto text-base-100"></span>}
      {creature && <>
        <img
          className="absolute top-[-2rem] inset-x-[-1rem] max-w-none w-[calc(100%+2rem)] object-cover"
          src={creature.sprites.front_default} 
        />
        <p
          className="absolute bottom-4 inset-x-0 text-center "
          style={{fontSize: fontSize }} >
          {creature.name}
        </p>
        <button className='btn btn-ghost btn-xs hidden absolute top-0 inset-x-0 w-full' onClick={reset}>reset</button>
      </>}
    </div>
  );
}

Card.propTypes = {
  creatureIdx: PropTypes.number,
};

CardGrid.Card = Card;

export default CardGrid;