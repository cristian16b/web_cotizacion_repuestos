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


  constructor(props){
    super(props);

    this.state = ({
      isUserLogin: false
    })

    this.myCallback = this.myCallback.bind(this);
}

  myCallback = (dataFromChild) => {
    //  [...we will use the dataFromChild here...]
    alert('soy el padre');
  }

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
                    <Route exact path="/repuesto" component={BuscarRepuesto} />
                    <Route exact path="/perfil" component={MiPerfil} />
                    <Route exact path="/cotizaciones" component={MisCotizaciones} />
                    <Route exact path="/registrarme" component={Registrarme} />
                    <Route exact path="/contacto" component={Contacto} />
                    <Route exact path="/login" render={() => <Login callbackFromParent={this.myCallback}/>} />
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