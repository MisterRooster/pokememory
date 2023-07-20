import React from 'react';
import PropTypes from 'prop-types';

function CardGrid({children}) {
  let cardComponents = [];
  cardComponents = React.Children.map(children, (child) => 
    child.type.name === "MemoryCard" ? child : null
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

export default CardGrid;