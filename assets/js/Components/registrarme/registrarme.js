import React , { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FormularioAltaUsuario from '../registrarme/FormularioAltaUsuario.js';

const divLoading = {
  'height': "100%",
  'width': "100%",
  '' : '',
}

const divBucle = {
  'margin': '1% auto'
}

const divMensaje = {
  'margin': '0% auto'
}

class Registrarme extends React.Component {

  constructor(props){
    super(props);

    this.state = ({
      //solo para vendedores
      esComerciante: false,
      botonesSeleccionUsuario: null,
    });

    this.cambioComerciante = this.cambioComerciante.bind(this);
}


cambioComerciante = () => {
  this.setState({
    esComerciante: true
  });
  this.setState({
    botonesSeleccionUsuario: true
  });
  // console.log('es comerciante = ' + this.state.esComerciante);
}

cambioUsuario = () => {
  this.setState({
    esComerciante: false
  });
  this.setState({
    botonesSeleccionUsuario: false
  });
  // console.log('es comerciante = ' + this.state.esComerciante);
}

redirectToLogin = () => {
  if (this.state.isSignedUp) {
    // redirect to home if signed up
    return <Redirect to = {{ pathname: "/login" }} />;
  }
}

renderBotonesUsuarioComercio () {
  return (
    <div className="row justify-content-center"  style={divLoading}>
      <div className="col-12 col-sm-12 col-md-12 col-lg-8">
      <div className="card shadow-sm p-3 mb-5 bg-white rounded">
        <div className="card-body">
        <h5>Registrarme</h5>
            <hr></hr>
                <div className="row justify-content-center">
                    <button onClick={this.cambioUsuario} className="btn btn-primary btn-block btn btn-sq-lg shadow-lg p-3 mb-5 rounded">
                      <b>
                        Usuario
                        <br/> 
                        Registrate!
                      </b>
                    </button>
                </div>
                <hr></hr>
                <div className="row justify-content-center">
                    <i className="fa fa-user fa-5x"></i><br/>
                    <button onClick={this.cambioComerciante} className="btn btn-secondary btn-block btn btn-sq-lg shadow-lg p-3 mb-5 rounded">
                      <b>
                        Vendedor
                        <br/>
                        Registrate!
                      </b>
                    </button>
                </div>
                <hr></hr>
            </div>
          </div>
        </div>
      </div>
  );
}

resetearMostrarBotones = () => {
  this.setState({
    botonesSeleccionUsuario: null
  });
}

render() { 
    if(this.state.botonesSeleccionUsuario == null)
      return <>{this.renderBotonesUsuarioComercio()}</>
    if(this.state.botonesSeleccionUsuario == true)
      return(
        <>
          <FormularioAltaUsuario
            mostrarBotones={this.resetearMostrarBotones}
            esComerciante={this.state.esComerciante}
            ocultarCampos={false}
          >
          </FormularioAltaUsuario>
        </>
      )
    if(this.state.botonesSeleccionUsuario == false)
      return (        
            <>
              <FormularioAltaUsuario
                mostrarBotones={this.resetearMostrarBotones}
                esComerciante={this.state.esComerciante}
                ocultarCampos={false}
              >
              </FormularioAltaUsuario>
            </>
          );
    }
}

export default Registrarme;