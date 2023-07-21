import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ResourceProvider } from '../modules/ResourceProvider';

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

const Card = () => {
  const [creature, setCreature] = useState(null);
  const [resetToggle, setResetToggle] = useState(false);

  function reset() {
    setCreature(null);
    setResetToggle((prev) => !prev);
  }
  
  // fetch creature on mount and on index change
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

  return (
    <div className="flex flex-col bg-base-300 w-full p-4 aspect-square items-center rounded-lg">
      {!creature && <span className="loading loading-spinner loading-lg text-base-100"></span>}
      {creature && <p>{creature.name}</p>}
      <button className='btn btn-primary' onClick={reset}>reset</button>
    </div>
  );
}

Card.propTypes = {
  creatureIdx: PropTypes.number,
};

CardGrid.Card = Card;

export default CardGrid;