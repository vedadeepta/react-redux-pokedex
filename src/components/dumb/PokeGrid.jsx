import React from 'react';
import PropsTypes from 'prop-types';
import StackGrid from 'react-stack-grid';
import PokeItem from './PokeItem';

function PokeGrid(props) {
  const styles = {
    gridList: {
      width: '100%',
      overflowY: 'auto',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 6
    },
    gridTile: {
      marginTop: 5
    }
  };
  const pokemons = props.pokemons;
  return (
    <StackGrid columnWidth={250}>
      {
        pokemons.map(poke => (
          <div
            key={poke.id}
            style={styles.gridTile}
          >
            <PokeItem
              pokemon={poke}
            />
          </div>
        ))
      }
    </StackGrid>
  );
}

PokeGrid.propTypes = {
  pokemons: PropsTypes.array
};

export default PokeGrid;
