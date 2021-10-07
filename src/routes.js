
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from './components/Header';

import Home from './pages/Home';
import Carrinho from './pages/Carrinho';


const Routes = () => {
  return(
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/carrinho" component={Carrinho} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;