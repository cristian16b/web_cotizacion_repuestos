import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './Components/barra superior/navBar';
require("../css/app.css");
import 'bootstrap/dist/css/bootstrap.css';
import PiePagina from './Components/pie de pagina/piePagina';
import Home from './Components/home/home';
import BuscarRepuesto from './Components/buscar repuesto/buscarRepuesto';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends React.Component {

  // ref: https://gist.github.com/darklilium/183ce1405788f2aef7e8
    render() {
      return (
        <>
          <BrowserRouter>
            <>
              <NavBar />
                <div className="container">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/repuesto" component={BuscarRepuesto} />
                  </Switch>
                </div>
              <PiePagina />
            </>
          </BrowserRouter>
        </>
      );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);