import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getPokemon from '../modules/pokeFetch';

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

const Card = ({creatureIdx}) => {
  const [creature, setCreature] = useState(null);

  // fetch creature on mount and on index change
  useEffect(() => {
    let isSubscribed = true;

    (async () => {
      const data = await getPokemon(creatureIdx);

      // avoid any race conditions if effect is called twice
      if (isSubscribed) setCreature(data);
    })().catch(console.error);

    // cancel any future state changes
    return () => isSubscribed = false;
  }, [creatureIdx]);

  return (
    <div className="flex bg-base-300 w-full p-4 aspect-square justify-center text-center rounded-lg">
      {!creature && <span className="loading loading-spinner loading-lg text-base-100"></span>}
      {creature && <p>{creature.name}</p>}
    </div>
  );
}

Card.propTypes = {
  creatureIdx: PropTypes.number,
};

CardGrid.Card = Card;

export default CardGrid;