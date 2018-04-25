import React from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { addPoke } from '../../store/actionCreator/getPokemons';
/*eslint-disable*/
class PokeAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    }
  }

  render() {
    return (
      <div>
        <TextField
          hintText="Enter pokemon details"
          onChange={(e, v) => {
            this.setState({data: v})
          }}
        />
        <RaisedButton
          label="ADD"
          onClick={() => {
            const data = this.state.data.split(',');
            let parsedData = {
              name: data[0],
              weight: data[1],
              sprites: {
                front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png'
              }
            }
            let abilities = [];
            let j = 0;
            for (let i = 3; i < data.length; i++) {
              abilities[j] = {
                ability: {
                  name: data[i]
                }
              }
              j++;
            }
            parsedData["abilities"] = abilities;
            this.props.dispatch(addPoke(parsedData));
          }}
        />
      </div>
    );
  }
}

export default connect(
)(PokeAdd);
