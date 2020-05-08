import React from 'react';
import ReactDOM from 'react-dom';
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
import NavbarNoLogueado from './Components/barra superior/navBarNoLogueado';
import NavbarLogueado from './Components/barra superior/navBarLogueado';

class App extends React.Component {


  constructor(props){
    super(props);

    this.state = ({
      isUserLogin: false
    })

    this.obtenerToken = this.obtenerToken.bind(this);
}

  obtenerToken = (bandera,tokenObtenido) => {

    this.setState({
      isUserLogin: bandera, token: tokenObtenido
    })

    // alert(this.state.isUserLogin);
    // alert(this.state.token);

    this.navigateToHome();
  }

  navigateToHome() {
    const { history } = this.props;
    history.push("/");
  }

  // ref: https://gist.github.com/darklilium/183ce1405788f2aef7e8
    render() {
      return (
        <>
          <BrowserRouter>
            <>
                {
                  this.state.isUserLogin 
                  ?
                    <NavbarLogueado></NavbarLogueado>
                  :
                    <NavbarNoLogueado></NavbarNoLogueado>
                }
                <div className="container">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/repuesto" component={BuscarRepuesto} />
                    <Route exact path="/perfil" component={MiPerfil} />
                    <Route exact path="/cotizaciones" component={MisCotizaciones} />
                    <Route exact path="/registrarme" component={Registrarme} />
                    <Route exact path="/contacto" component={Contacto} />
                    <Route exact path="/login" render={() => <Login obtenerTokenPadre={this.obtenerToken}/>} />
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