import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import PokeTypes from './PokeTypes';
import AddToFavourite from './AddToFavourite';

import {
  editPoke,
  deletePoke
} from '../../store/actionCreator/getPokemons';

class PokeItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.pokemon.id,
      editData: {}
    };
  }

  render() {
    const poke = this.props.pokemon;
    const colors = [indigo600, green900, yellow600, deepOrange700];
    return (
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
          {
            this.state.edit ?
              (
                <TextField
                  label="Weight"
                  onChange={(e, v) => {
                    const editData = Object.assign(
                      this.state.editData,
                      {
                        weight: v
                      }
                    );
                    this.setState({ editData });
                  }}
                />
              )
            :
              (
                <span>
                  Weight:&nbsp;
                  <b>
                    {
                      poke.weight
                    }
                  </b>
                </span>
              )
          }
          &nbsp;
          Abilities:&nbsp;
          {
            poke.abilities.map((ab, i) => (
              <span
                key={i}
              >
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
          <PokeTypes pokeTypes={poke.types ? poke.types.map(t => t.type) : []} />
        </CardText>
        <CardActions>
          <Link
            to={{
              pathname: `/pokemon/${poke.name}`,
              state: {
                pokeData: poke
              }
            }}
          >
            <RaisedButton label="VizStats" />
          </Link>
          <AddToFavourite
            poke={poke}
          />
          <RaisedButton
            label="Delete"
            onClick={() => {
              this.props.dispatch(deletePoke(this.state.id));
            }}
          />
          {
            this.state.edit ?
              (
                <RaisedButton
                  label="Save"
                  onClick={() => {
                    this.props.dispatch(editPoke(this.state.editData, this.state.id));
                    this.setState({ edit: false });
                  }}
                />
              )
            :
              (
                <RaisedButton
                  label="Edit"
                  onClick={() => {
                    this.setState({ edit: true });
                  }}
                />
              )
          }
        </CardActions>
      </Card>
    );
  }
}

PokeItem.propTypes = {
  pokemon: PropTypes.object,
  id: PropTypes.number,
  dispatch: PropTypes.func
};

export default connect(
)(PokeItem);
