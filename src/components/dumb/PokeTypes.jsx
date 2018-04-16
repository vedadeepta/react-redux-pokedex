import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

export default function PokeType(props) {
  const styles = {
    chip: {
      margin: 4,
    }
  };
  const pokeTypes = props.pokeTypes;
  const mapTypesToEl = [];
  mapTypesToEl.push(
    <Link to="/#/">
      <Chip style={styles.chip}>
        <Avatar size={32}>A</Avatar>
          All
      </Chip>
    </Link>
  );
  const mapTypesToEldy = (
    pokeTypes ?
      pokeTypes.map(t => (
        <Link to={`/type/${t.name}`}>
          <Chip style={styles.chip}>
            <Avatar size={32}>{t.name[0].toUpperCase()}</Avatar>
            {t.name}
          </Chip>
        </Link>
      ))
    :
      null
  );
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      { mapTypesToEl.concat(mapTypesToEldy) }
    </div>
  );
}

PokeType.propTypes = {
  pokeTypes: PropTypes.array
};
