import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'material-ui-pagination';
import { connect } from 'react-redux';

/* ACTION */
import setPageCount from '../../store/actionCreator/setPageCount';

function PaginationContainer(props) {
  return (
    <center>
      <Pagination
        total={props.total}
        current={props.current}
        display={8}
        onChange={(number) => {
          props.setPageCount(number);
        }}
      />
    </center>
  );
}

const mapStoreToProps = (store) => {
  return {
    total: store.PokemonList.total,
    current: store.PageCount.count
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageCount: count => dispatch(setPageCount(count))
  };
};

PaginationContainer.propTypes = {
  total: PropTypes.number,
  current: PropTypes.number,
  setPageCount: PropTypes.func
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(PaginationContainer);
