import React from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'bootstrap/dist/css/bootstrap.css';

/* Custom */
import PokeGridContainer from './components/container/PokeGridContainer';
import PokeData from './components/dumb/PokeData';

function App() {
  return (
    <MuiThemeProvider>
      <Router>
        <div>
          <Route exact path="/" component={PokeGridContainer} />
          <Route path="/type/:name?" component={PokeGridContainer} />
          <Route path="/pokemon/:name?" component={PokeData} />
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
