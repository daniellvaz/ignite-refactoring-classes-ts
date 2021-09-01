import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

class App extends Component {

  render() {

    return (
      <Router>
        <React.Fragment className='flyout'>

          <main style={{ marginTop: '4rem' }}>
            <Routes />
          </main>

        </React.Fragment>
      </Router>
    );
  }
}

export default App;
