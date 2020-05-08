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
import { BrowserRouter, Route, Switch , Redirect } from 'react-router-dom';
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
  }

  returnTemplateLogueado = () => {
    return (
        <>
          <NavbarLogueado></NavbarLogueado>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/repuesto" component={BuscarRepuesto} />
              <Route exact path="/perfil" component={MiPerfil} />
              <Route exact path="/cotizaciones" component={MisCotizaciones} />
              <Route exact path="/registrarme" component={Registrarme} />
              <Route exact path="/contacto" component={Contacto} />
              {/* <Route exact path="/login" render={() => <Login obtenerTokenPadre={this.obtenerToken}/>} /> */}
            </Switch>
          </div>
        </>
    );
  }

  returnTemplateNoLogueado = () => {
    return (
            <>
              <NavbarNoLogueado></NavbarNoLogueado>
                <div className="container">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/repuesto" component={BuscarRepuesto} />
                      {/* <Route exact path="/perfil" component={MiPerfil} /> */}
                      {/* <Route exact path="/cotizaciones" component={MisCotizaciones} /> */}
                    <Route exact path="/registrarme" component={Registrarme} />
                    <Route exact path="/contacto" component={Contacto} />
                    <Route exact path="/login" render={() => <Login obtenerTokenPadre={this.obtenerToken}/>} />
                  </Switch>
                </div> 
            </>
    );
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
                    <>{ this.returnTemplateLogueado() }</>   
                  :
                    <>{ this.returnTemplateNoLogueado() }</>         
                }              
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