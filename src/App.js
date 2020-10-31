import {BrowserRouter, Router, Route, Switch, Redirect} from 'react-router-dom';
import {PlanetsList} from './components/PlanetsList/PlanetsList.js'
import {Planet} from './components/Planet/Planet.js'
import './App.css';
import { Header } from './components/Header/Header.js';
import { HomePage } from './components/HomePage/HomePage.js';
import history from './utils/history.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router history={history}>
          <Header/>
          <Switch>
            <Route exact path='/'>
                <HomePage/>
            </Route>
            <Route exact path='/planets/'>
                <PlanetsList/>
            </Route>
            <Route path='/planets/:id'>
                <Planet/>
            </Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      </BrowserRouter>
    </div>
  );
}

export default App;
