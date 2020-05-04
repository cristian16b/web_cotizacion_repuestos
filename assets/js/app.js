import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './Components/barra superior/navBar';
require("../css/app.css");
import 'bootstrap/dist/css/bootstrap.css';
import PiePagina from './Components/pie de pagina/piePagina';
import Home from './Components/home/home';
import BuscarRepuesto from './Components/buscar repuesto/buscarRepuesto';
import Contacto from './Components/contacto/contacto';
import MiPerfil from './Components/mi perfil/miPerfil';
import MisCotizaciones from './Components/mis cotizaciones/misCotizaciones';
import Registrarme from './Components/registrarme/registrarme';
import Login from './Components/login/login';
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
                    <Route path="/perfil" component={MiPerfil} />
                    <Route path="/cotizaciones" component={MisCotizaciones} />
                    <Route path="/registrarme" component={Registrarme} />
                    <Route path="/contacto" component={Contacto} />
                    <Route path="/login" component={Login} />
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