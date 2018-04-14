import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'bootstrap/dist/css/bootstrap.css';

/* Custom */
import PokeGridContainer from './components/container/PokeGridContainer';

function App() {
  return (
    <MuiThemeProvider>
      <Router>
        <div>
          <Route exact path="/" component={PokeGridContainer} />
          <Route path="/type/:name?" component={PokeGridContainer} />
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
