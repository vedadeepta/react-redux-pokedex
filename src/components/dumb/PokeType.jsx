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
  const url = `/type/${props.type}`;
  return (
    <Link to={url}>
      <Chip style={styles.chip}>
        <Avatar size={32}>A</Avatar>
        {props.type}
      </Chip>
    </Link>
  );
}

PokeType.propTypes = {
  type: PropTypes.string
};
