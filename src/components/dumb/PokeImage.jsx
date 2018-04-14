import React from 'react';
import PropTypes from 'prop-types';

function PokeImage(props) {
  return (
    <img
      alt="pokemon"
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.index}.png`}
    />
  );
}

PokeImage.propTypes = {
  index: PropTypes.string
};

export default PokeImage;
