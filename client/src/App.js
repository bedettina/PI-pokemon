import './App.css';
import LandingPage from './components/LandingPage.jsx';
import Home from './components/Home.jsx';
import PokemonDetail from './components/PokemonDetail';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import CreateActivity from './Components/CreateActivity.jsx';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
      <Route exact path ='/' component={LandingPage} />
      <Route path ='/home' component={Home} /> 
      <Route path='/pokemons/:idPokemon' render={({match}) => <PokemonDetail id={match.params.idPokemon}/>} />
      {/*<Route path='/createpokemons' component={CreatePokemon} />*/}
       </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
