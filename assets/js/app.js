import React from 'react';
import ReactDOM from 'react-dom';
require("../css/app.css");
import 'bootstrap/dist/css/bootstrap.css';
import PiePagina from './Components/pie de pagina/piePagina';
import Home from './Components/home/home';
import BuscarRepuesto from './Components/buscar repuesto/buscarRepuestos';
import Contacto from './Components/contacto/contacto';
import MiPerfil from './Components/mi perfil/miPerfil';
import MisCotizaciones from './Components/mis cotizaciones/misCotizaciones';
import SolicitudesGeneradas from './Components/solicitudes generadas/SolicitudesGeneradas';
import Registrarme from './Components/registrarme/registrarme';
import Login from './Components/login/login';
import { BrowserRouter, Route, Switch , Redirect } from 'react-router-dom';
import NavbarNoLogueado from './Components/barra superior/navBarNoLogueado';
import NavbarLogueado from './Components/barra superior/navBarLogueado';
import Salir from './Components/salir/salir';
import RecuperarContrasenia from './Components/recuperar/recuperarContrasenia';
import NotFound from './Components/not found/notfound';
import {ROL_COMERCIANTE} from './Constantes/constantes';
import RegistrarML from './Components/registrarML/RegistrarML';

class App extends React.Component {


  constructor(props){
    super(props);

    this.state = ({
      isUserLogin: false,
      token: '',
      rol: '',
      credencialML: '',
      url: '',
    })

    this.obtenerToken = this.obtenerToken.bind(this);
  }

  obtenerToken = (bandera,rolObtenido,tokenObtenido,code,credencialML,url) => {
    // console.log(rolObtenido + ' ' + tokenObtenido + ' ' + code);
    // 
    if(code == 200) {

      this.setState({
        isUserLogin: bandera,
        token: tokenObtenido,
        rol: rolObtenido,
        credencialML: credencialML,
        url: url,
      })
    }
    // alert(this.state.isUserLogin);
  }

  returnTemplateLogueado = () => {
    if(this.state.rol == ROL_COMERCIANTE && this.state.credencialML == true)
      return (
        <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
          <NavbarLogueado rol={this.state.rol}/>
          <div className="containerCentral">
              <Switch>
                <Redirect exact from='/login' to='/solicitudes'/>
                <Route exact path="/" component={Home} />
                <Route exact path="/perfil" render={() => <MiPerfil token={this.state.token['token']} rol={this.state.rol}/>} />
                <Route exact path="/solicitudes" render={() => <SolicitudesGeneradas token={this.state.token['token']} rol={this.state.rol}/>} />
                {/* <Route exact path="/contacto" component={Contacto} /> */}
                <Route exact path="/salir" render={() => <Salir obtenerToken={this.obtenerToken}/>} />
                <Route component={NotFound}/>
              </Switch>
            </div>
          <PiePagina />
        </div>
      </div>
      )
      if(this.state.rol == ROL_COMERCIANTE && this.state.credencialML == false)
      return (
        <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
          <NavbarLogueado rol={this.state.rol}/>
          <div className="containerCentral">
              <Switch>
                <Redirect exact from='/login' to='/registrarML'/>
                <Redirect exact from="/" to='/registrarML'/>
                <Redirect exact from="/solicitudes" to='/registrarML'/>
                <Redirect exact from="/perfil" to='/registrarML'/>
                <Redirect exact from="/cotizaciones" to='/registrarML'/>
                <Route exact path="/registrarML" 
                  render={() => <RegistrarML url={this.state.url} token={this.state.token['token']} rol={this.state.rol}/>} />
                <Route exact path="/salir" render={() => <Salir obtenerToken={this.obtenerToken}/>} />
                <Route component={NotFound}/>
              </Switch>
          </div>
          <PiePagina />
        </div>
      </div>
      )
    return (
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
          <NavbarLogueado rol={this.state.rol}/>
          <div className="containerCentral">
              <Switch>
                <Redirect exact from='/login' to='/repuesto'/>
                <Route exact path="/" component={Home} />
                <Route exact path="/repuesto" render={() => <BuscarRepuesto token={this.state.token['token']} rol={this.state.rol}/>} />
                <Route exact path="/perfil" render={() => <MiPerfil token={this.state.token['token']} rol={this.state.rol}/>} />
                <Route exact path="/cotizaciones" render={() => <MisCotizaciones token={this.state.token['token']} rol={this.state.rol}/>} />
                {/* <Route exact path="/contacto" component={Contacto} /> */}
                <Route exact path="/salir" render={() => <Salir obtenerToken={this.obtenerToken}/>} />
                <Route component={NotFound}/>
              </Switch>
            </div>
          <PiePagina />
        </div>
      </div>
    );
  }

  returnTemplateNoLogueado = () => {
    return (
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
          <NavbarNoLogueado />    
              <div className="containerCentral">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/repuesto" component={BuscarRepuesto} />
                    <Route exact path="/registrarme" component={Registrarme} />
                    <Route exact path="/contacto" component={Contacto} />
                    <Route exact path="/recuperarContrasenia" component={RecuperarContrasenia} />
                    <Route exact path="/login" render={() => <Login obtenerTokenPadre={this.obtenerToken}/>} />
                  </Switch>
              </div>
          <PiePagina />
        </div>
      </div>
    );
  }

  // ref: https://gist.github.com/darklilium/183ce1405788f2aef7e8
    render() {
      return (
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <BrowserRouter>
                  {
                    this.state.isUserLogin 
                    ?
                      <>{ this.returnTemplateLogueado() }</>   
                    :
                      <>{ this.returnTemplateNoLogueado() }</>         
                  }
            </BrowserRouter>
          </div>
        </div>
      );
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
);