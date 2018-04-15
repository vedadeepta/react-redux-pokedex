import React from 'react';
import PropTypes from 'prop-types';
import BarChart from 'react-d3-components/lib/BarChart';

function parseStats(data) {
  const parsed = data.stats.map((st) => {
    return {
      y: st.base_stat,
      x: st.stat.name
    };
  });
  return parsed;
}
function PokeData(props) {
  // this.props.location.state.data
  const parsed = parseStats(props.location.state.pokeData);
  const name = props.location.state.pokeData.name;
  const data = [{
    label: 'Stats',
    values: parsed
  }];
  return (
    <div>
      <center>
        <h1>{name[0].toUpperCase() + name.slice(1)} Stats</h1>
        <BarChart
          colorByLabel={false}
          data={data}
          width={950}
          height={400}
          margin={{ top: 30, bottom: 50, left: 50, right: 10 }}
        />
      </center>
    </div>
  );
}

PokeData.propTypes = {
  location: PropTypes.object
};

export default PokeData;
