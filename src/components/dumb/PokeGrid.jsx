import React from 'react';
import PropsTypes from 'prop-types';
import {
  Card,
  CardActions,
  CardHeader,
  CardText
} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';

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
    <div className="row" style={styles.gridList}>
      {
        pokemons.map((poke, index) => (
          <div
            className="col-md-4"
            key={index}
            style={styles.gridTile}
          >
            <Card>
              <CardHeader
                title={poke.name}
                avatar={
                  <Avatar src={poke.sprites.front_default} size={90} />
                }
              />
              <CardText>
                {
                  poke.weight
                }
              </CardText>
              <CardActions>
                <FlatButton label="More" />
              </CardActions>
            </Card>
          </div>
        ))
      }
    </div>
  );
}

PokeGrid.propTypes = {
  pokemons: PropsTypes.array
};

export default PokeGrid;
