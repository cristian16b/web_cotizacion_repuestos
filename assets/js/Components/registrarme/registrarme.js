import React , { Component } from 'react';
import {API_REGISTER,API_CAPTCHA_PUBLIC} from '../../Constantes/constantes';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import { Redirect } from 'react-router-dom';
import Loading from '../loading/loading.js';

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
        //
        botonesHabilitados: false,
        // <-- initialize the signup state as false
        isSignedUp: false, 
        // para mostrar el loop de cargando
        isLoading: false,
        // para mostrar los botones de seleccion
        botonesSeleccionUsuario: false
    })

    this.handleSubmit   = this.handleSubmit.bind(this); 
    this.validarFormulario = this.validarFormulario.bind(this);
    this.consumirApiRegister = this.consumirApiRegister.bind(this);
    this.cambioApellido = this.cambioApellido.bind(this);
    this.cambioCodArea = this.cambioCodArea.bind(this);
    this.cambioContraseña = this.cambioContraseña.bind(this);
    this.cambioContraseña2 = this.cambioContraseña2.bind(this);
    this.cambioEmail = this.cambioEmail.bind(this);
    this.cambioNombre = this.cambioNombre.bind(this);
    this.cambioTelefono = this.cambioTelefono.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isHabilitado = this.isHabilitado.bind(this);
    this.cambioHabilitado = this.cambioHabilitado.bind(this);

}

validarFormulario () {
  let formularioValido = true;
  let errors = {};
  //alert('A name was submitted: ' + this.state.username + ' ' + this.state.password);
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

isHabilitado = () => { return this.state.botonesHabilitados}

handleSubmit(event) {
  // this.habilitarBotones();
  if(this.validarFormulario() == true) {
    this.consumirApiRegister();
  } 
  this.cambioHabilitado();
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
    "email":this.state.email
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

cambioApellido(e) {
  this.setState({
      apellido: e.target.value
  })
}

cambioNombre(e) {
  this.setState({
      nombre: e.target.value
  })
}

cambioCodArea(e) {
  this.setState({
      codArea: e.target.value
  })
}

cambioTelefono(e) {
  this.setState({
      telefono: e.target.value
  })
}

cambioEmail(e) {
  this.setState({
      email: e.target.value
  })
}

cambioContraseña(e) {
  this.setState({
      password: e.target.value
  })
}

cambioContraseña2(e) {
  this.setState({
      password2: e.target.value
  })
}

handleChange = value => {
  this.setState({
    catchaValido: true
  })
  //alert(this.state.catchaValido);
};

cambioHabilitado = () => { 
  if(this.state.botonesHabilitados == true) {
    this.setState({
      botonesHabilitados: false
    });
  }
  else {
    this.setState({
      botonesHabilitados: true
    });
  }
  // console.log(this.state.botonesHabilitados);
}

cambioComerciante = () => {
  this.setState({
    esComerciante: true
  });
}

redirectToLogin = () => {
  if (this.state.isSignedUp) {
    // redirect to home if signed up
    return <Redirect to = {{ pathname: "/login" }} />;
  }
}

renderCamposComunes() {
  return(
    <>
          <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                  <label htmlFor="apellido">Apellido</label>
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-user"></i></span>
                        {/* importante los elementos input deben terminar así: <input /> y no <input></input> porque genera error */}
                        <input type="text" className="form-control" name="apellido" 
                                                    defaultValue={this.state.apellido} onChange={this.cambioApellido}
                                                    placeholder="Ingrese su apellido"/>
                    </div>
                    <span id="passwordHelp" className="text-danger error_negrita">
                      {this.state.errors["apellido"]}
                    </span> 
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                  <label htmlFor="apellido">Nombre</label>
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-user"></i></span>
                        {/* importante los elementos input deben terminar así: <input /> y no <input></input> porque genera error */}
                        <input type="text" className="form-control" name="nombre" 
                                                    defaultValue={this.state.nombre} onChange={this.cambioNombre}
                                                    placeholder="Ingrese su nombre"/>
                    </div>
                    <span id="passwordHelp" className="text-danger error_negrita">
                      {this.state.errors["nombre"]}
                    </span> 
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                  <label htmlFor="codArea">Código de área</label>
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                        <input type="text" className="form-control" name="codArea" 
                                                    defaultValue={this.state.codArea} onChange={this.cambioCodArea}
                                                    placeholder="Ingrese su Código de área"/>
                    </div>
                    <span id="passwordHelp" className="text-danger error_negrita">
                      {this.state.errors["codArea"]}
                    </span> 
                </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                  <label htmlFor="telefono">Telefóno</label>
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                        <input type="text" className="form-control" name="telefono" 
                                                    defaultValue = {this.state.telefono} onChange={this.cambioTelefono}
                                                    placeholder="Ingrese su Telefóno" />	
                      </div>
                      <span id="passwordHelp" className="text-danger error_negrita">
                        {this.state.errors["telefono"]}
                      </span> 
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                        <input type="text" className="form-control" name="email" 
                                                    defaultValue = {this.state.email} onChange={this.cambioEmail}
                                                    placeholder="Ingrese su email" />	
                      </div>
                      <span id="passwordHelp" className="text-danger error_negrita">
                        {this.state.errors["email"]}
                      </span> 
                  </div>
                </div>
              </div>

          <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <div className="input-group">
                      <span id="passwordHelp" className="text-danger error_negrita">
                        {this.state.errors["passdistintas"]}
                      </span> 
                    </div>
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                        <input type="password" className="form-control" name="password" 
                                                    defaultValue = {this.state.password} onChange={this.cambioContraseña}
                                                    placeholder="Ingrese su contraseña" />	
                      </div>
                      <span id="passwordHelp" className="text-danger error_negrita">
                        {this.state.errors["password"]}
                      </span> 
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                  <label htmlFor="password2">Ingrese nuevamente su contraseña</label>
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                        <input type="password" className="form-control" name="password2" 
                                                    defaultValue = {this.state.password2} onChange={this.cambioContraseña2}
                                                    placeholder="Ingrese nuevamente su contraseña" />	
                      </div>
                      <span id="passwordHelp" className="text-danger error_negrita">
                        {this.state.errors["password2"]}
                      </span> 
                  </div>
                </div>
              </div>    
    </>
  );
}

renderBotones() {
  return(
<div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <button type="submit" 
                            className="btn btn-primary btn-block"
                            disabled={this.isHabilitado()}
                            onClick={this.cambioHabilitado}
                            >Registrarme</button>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <button type="reset" 
                            // disabled={this.state.botonesHabilitados}
                            className="btn btn-light btn-block">Cancelar</button>
                  </div>
                </div>  
              </div>
  );
}

renderCaptcha() {
  return(
    <div className="row">
      <div className="col-lg-6">
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
          <>
            <div className="row justify-content-center">
                <a className="btn btn-sq-lg btn-default  shadow-lg p-3 mb-5 bg-white rounded">
                  <i className="fa fa-user fa-5x"></i><br/>
                  <h4>Necesito buscar repuestos</h4>
                  <br/>Registrate!
                </a>
              </div>
              <div className="row justify-content-center">
                <a  className="btn btn-sq-lg btn-default shadow-lg p-3 mb-5 bg-white rounded">
                  <i className="fa fa-user fa-5x"></i><br/>
                  <h4>Soy un comercio y quiero vender autopartes</h4>
                  <br/>Registrate!
                </a>
              </div>
          </>
  );
}

render() {

if(this.state.isLoading == true)
  return  <Loading></Loading>
  return (        
      <div className="row justify-content-center">
        {
          // si se logueo correctamente se redirige al login
          this.redirectToLogin()
        }
        <div className="col-12 col-sm-12 col-md-12 col-lg-9">
          <div className="card">
            <div className="card-body">
              <h2 className="my-4">Registrarme</h2>
              <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <span className="text-danger error_negrita">
                  {this.state.errorApi}
                </span>
              </div>
              {
                this.state.botonesSeleccionUsuario == false  && this.state.esComerciante == false
                  ?
                  <>{this.renderBotonesUsuarioComercio()}</>
                  :
                  <></>
              }
              {/* {
                this.state.esComerciante == false
                ?
                <>{this.renderCamposComunes()}</>
                :
                <>
                  {this.renderCamposComunes()}
                  HOLAAAA
                </>

              } */}
              
              {/* { this.renderCamposComunes() } */}
    {/* 
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    
                  </div>
                </div> 
              </div>
               */}
              {/* { this.renderCaptcha() }
              { this.renderBotones() } */}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Registrarme;