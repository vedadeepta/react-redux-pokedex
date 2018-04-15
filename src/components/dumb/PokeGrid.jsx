import React from 'react';
import PropsTypes from 'prop-types';
import StackGrid from 'react-stack-grid';
import { Link } from 'react-router-dom';
import {
  Card,
  CardActions,
  CardHeader,
  CardText
} from 'material-ui/Card';
import {
  indigo600,
  green900,
  yellow600,
  deepOrange700
} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import PokeTypes from './PokeTypes';

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
  const colors = [indigo600, green900, yellow600, deepOrange700];
  return (
    <StackGrid columnWidth={250}>
      {
        pokemons.map((poke, index) => (
          <div
            key={index}
            style={styles.gridTile}
          >
            <Card>
              <CardHeader
                title={
                  <b>
                    {poke.name[0].toUpperCase() + poke.name.slice(1)}
                  </b>
                }
                avatar={
                  <Avatar src={poke.sprites.front_default} size={90} />
                }
              />
              <CardText>
                Weight:&nbsp;
                <b>
                  {
                    poke.weight
                  }
                </b>
                &nbsp;
                Abilities:&nbsp;
                {
                  poke.abilities.map((ab, i) => (
                    <span>
                      <b
                        style={{
                          color: colors[i]
                        }}
                      >
                        {ab.ability.name}
                      </b>
                      &nbsp;
                    </span>
                  ))
                }
              </CardText>
              <CardText>
                <PokeTypes pokeTypes={poke.types.map(t => t.type)} />
              </CardText>
              <CardActions>
                <Link
                  to={{
                    pathname: '/pokemon',
                    state: {
                      pokeData: poke
                    }
                  }}
                >
                  <FlatButton label="More" />
                </Link>
              </CardActions>
            </Card>
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
