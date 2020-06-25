import React , { Component } from 'react';
import {API_REGISTER,API_CAPTCHA_PUBLIC} from '../../Constantes/constantes';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import { Redirect } from 'react-router-dom';
import Loading from '../loading/loading.js';
import FormularioDatosComunes from './FormularioDatosComunes.js';
import FormularioDatosComerciante from './FormularioDatosComerciante.js';

class Registrarme extends React.Component {

  constructor(props){
    super(props);

    this.state = ({
        nombre:'',
        apellido: '',
        codArea: '',
        telefono: '',
        email: '',
        //solo para vendedores
        esComerciante: false,
        cuitCuit: '',
        domicilio: '',
        //
        password:'',
        password2: '',
        errors: {},
        errorApi: '',
        // 
        catchaValido: false,
        // <-- initialize the signup state as false
        isSignedUp: false, 
        // para mostrar el loop de cargando
        isLoading: false,
        // para mostrar los botones de seleccion
        botonesSeleccionUsuario: true
    })

    this.handleSubmit   = this.handleSubmit.bind(this); 
    this.validarFormulario = this.validarFormulario.bind(this);
    this.consumirApiRegister = this.consumirApiRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.cambioComerciante = this.cambioComerciante.bind(this);
    this.cancelar = this.cancelar.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
}

validarFormulario () {
  let formularioValido = true;
  let errors = {};

  if(this.state.password2.length == 0) {
    errors["password2"] = "Debe ingresar nuevamente la contraseña";
    formularioValido = false;
  }
  if(this.state.password.length == 0) {
    errors["password"] = "La contraseña no puede estar vacia";
    formularioValido = false;
  }
  if(this.state.apellido.length == 0) {
    errors["apellido"] = "Debes completar tu apellido";
    formularioValido = false;
  }
  if(this.state.nombre.length == 0) {
    errors["nombre"] = "Debes completar tu nombre";
    formularioValido = false;
  }
  if(this.state.codArea.length == 0) {
    errors["codArea"] = "Debe ingresar el cod. de área";
    formularioValido = false;
  }
  if(this.state.telefono.length == 0) {
    errors["telefono"] = "Debe ingresar su teléfono";
    formularioValido = false;
  }
  if(this.state.email.length == 0) {
    errors["email"] = "Debe completar su e-mail";
    formularioValido = false;
  }
  if(this.state.catchaValido == false) {
    errors["captcha"] = "Debe completar el captcha";
    formularioValido = false;
  }
  if(this.state.password != this.state.password2) {
    errors["passdistintas"] = "Las contraseñas ingresadas son diferentes";
    formularioValido = false;
  }

  this.setState({
    errors: errors
  });

  return formularioValido;
}

handleSubmit(event) {
  // this.habilitarBotones();
  if(this.validarFormulario() == true) {
    this.consumirApiRegister();
  } 
  event.preventDefault();
}


consumirApiRegister(){
  const payload={
    "apellido":this.state.apellido,
    "nombre":this.state.nombre,
    "codArea":this.state.codArea,
    "telefono":this.state.telefono,
    "password":this.state.password,
    "password2":this.state.password2,
    "email":this.state.email,
    "esComerciante":this.state.esComerciante,
  }
  this.setState({isLoading: true});
  axios.post(API_REGISTER,payload)
      .then(response => {
          let code = response.data.code;
          if(code == 200){
            this.setState({ isSignedUp: true }); // after signing up, set the state to true. This will trigger a re-render
          }
          this.mostrarErroresApi(response);
          this.setState({isLoading: false});
      })
      .catch(e => {
          this.setState({isLoading: false});
          alert('Ocurrio un error al consultar al servidor, intente nuevamente');
  });
  event.preventDefault();
}

mostrarErroresApi = (response) => {
  let mensajes = response.data;
  let errors = {};
  for (const prop in mensajes) {
    // console.log(`obj.${prop} = ${mensajes[prop]}`);
    errors[prop] = mensajes[prop];
  }
  this.setState({
    errors: errors
  });
}

handleChangeInput = e => {
  this.setState({
    [e.target.name] : e.target.value
  });
}

handleChange = value => {
  this.setState({
    catchaValido: true
  })
  //alert(this.state.catchaValido);
};

cambioComerciante = () => {
  // console.log('click sobre boton de comerciante');
  this.setState({
    esComerciante: true
  });
  this.setState({
    botonesSeleccionUsuario: false
  });
  // console.log('es comerciante = ' + this.state.esComerciante);
}

cambioUsuario = () => {
  // console.log('click sobre boton de usuari');
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

cancelar() {
  this.setState({
    esComerciante: false
  });
  this.setState({
    botonesSeleccionUsuario: true
  });
  // console.log('click cancelar');
}

renderBotones() {
  return(
<div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <button type="submit" 
                            className="btn btn-primary btn-block">Registrarme</button>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <button 
                            onClick={this.cancelar}
                            className="btn btn-light btn-block">Cancelar</button>
                  </div>
                </div>  
              </div>
  );
}

renderCaptcha() {
  return(
    <div className="row">
      <div className="col-lg-6 col-12">
        <div className="form-group">
          <ReCAPTCHA
            sitekey={API_CAPTCHA_PUBLIC}
            onChange={this.handleChange}
          />
          <span id="passwordHelp" className="text-danger error_negrita">
            {this.state.errors["captcha"]}
          </span> 
        </div>
      </div> 
    </div> 
  );
}

renderBotonesUsuarioComercio () {
  return (
    <div className="row justify-content-center">
      <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                <div className="row justify-content-center">
                  <a onClick={this.cambioUsuario} className="btn btn-sq-lg btn-default  shadow-lg p-3 mb-5 bg-white rounded">
                    <i className="fa fa-user fa-5x"></i><br/>
                    <h4>Necesito buscar repuestos<br/> para mi auto/camioneta</h4>
                    <br/>Registrate!
                  </a>
                </div>
                <div className="row justify-content-center">
                  <a  onClick={this.cambioComerciante} className="btn btn-sq-lg btn-default shadow-lg p-3 mb-5 bg-white rounded">
                    <i className="fa fa-user fa-5x"></i><br/>
                    <h4>Soy un comercio y quiero registrarme<br/> para vender autopartes</h4>
                    <br/>Registrate!
                  </a>
                </div>
        </div>
      </div>
  );
}

renderFormulario() {
  return(
    <div className="row justify-content-center">
    {
      // si no se logueo correctamente se redirige al login
      this.redirectToLogin()
    }
    <div className="col-12 col-sm-12 col-md-12 col-lg-6">
      <div className="card shadow-sm p-3 mb-5 bg-white rounded">
        <div className="card-body">
          <h2 className="my-4">Registrarme</h2>
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <span className="text-danger error_negrita">
              {this.state.errorApi}
            </span>
          </div>
          <FormularioDatosComunes 
                  handleChangeInput={this.handleChangeInput} 
                  errors={this.state.errors}
                  errorsApi={this.state.errorApi}
                >
          </FormularioDatosComunes>
            <>
              {
                this.state.esComerciante == true &&
                <>
                  <hr></hr>
                  <FormularioDatosComerciante>
                    
                  </FormularioDatosComerciante>
                </>
              }
            </>
            <hr></hr>
          { this.renderCaptcha() }
            <hr></hr>
          { this.renderBotones() }
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}

render() { 
    if(this.state.isLoading == true)
      return  <Loading></Loading>
    else if(this.state.botonesSeleccionUsuario == true)
      return(
        <>{this.renderBotonesUsuarioComercio()}</>
      )
    else 
      return (        
          <>{this.renderFormulario()}</>
        );
      }
}

export default Registrarme;