import React , { Component } from 'react';
import FormularioDatosComunes from './FormularioDatosComunes.js';
import FormularioDatosComerciante from './FormularioDatosComerciante.js';
import {API_REGISTER,API_CAPTCHA_PUBLIC} from '../../Constantes/constantes';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";

class FormularioAltaUsuario extends React.Component {

  constructor(props){
    super(props);

    this.state = ({
      nombre:'',
      apellido: '',
      codArea: '',
      telefono: '',
      email: '',
      cuitCuit: '',
      // datos del comerciante
      constanciaDni: '',
      constanciaAfip: '',
      calle: '',
      nro: '',
      localidad: '',
      provincia: '',
      //
      password:'',
      password2: '',
      // errores locales o retornados por la api
      errors: {},
      errorApi: '',
      // 
      catchaValido: false,
      // <-- initialize the signup state as false
      isSignedUp: false, 
      // para mostrar el loop de cargando
      isLoading: false,
      // para mostrar los botones de seleccion
      botonesSeleccionUsuario: true,
      // para ocultar/mostrar los campos de contrasenia/campos de archivos
      ocultarCampos: false,
      // para habilitar modo lectura (true) o modo editar (false)
      soloLectura: false
  })

  this.handleSubmit   = this.handleSubmit.bind(this); 
  this.validarFormulario = this.validarFormulario.bind(this);
  this.consumirApiRegister = this.consumirApiRegister.bind(this);
  this.handleChangeCaptcha = this.handleChangeCaptcha.bind(this);
  this.handleChangeCaptchaExpirado = this.handleChangeCaptchaExpirado.bind(this);

  this.cancelar = this.cancelar.bind(this);
  this.handleChangeInput = this.handleChangeInput.bind(this);
  this.handleChangeSelectLocalidad = this.handleChangeSelectLocalidad.bind(this);
  this.handleChangeSelectProvincia = this.handleChangeSelectProvincia.bind(this);

  }

  renderCaptcha() {
    return(
      <div className="row">
        <div className="col-lg-6 col-12">
          <div className="form-group">
            <ReCAPTCHA
              sitekey={API_CAPTCHA_PUBLIC}
              onChange={this.handleChangeCaptcha}
              onExpired={this.handleChangeCaptchaExpirado}
            />
            <span id="passwordHelp" className="text-danger error_negrita">
              {this.state.errors["captcha"]}
            </span> 
          </div>
        </div> 
      </div> 
    );
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

  cancelar() {
    this.setState({
      nombre:'',
      apellido: '',
      codArea: '',
      telefono: '',
      email: '',
      cuitCuit: '',
      // datos del comerciante
      constanciaDni: '',
      constanciaAfip: '',
      calle: '',
      nro: '',
      localidad: '',
      provincia: '',
      //
      password:'',
      password2: '',
      // errores locales o retornados por la api
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
    });
  }
  
  handleChangeSelectProvincia = (e) => {
    this.setState({provincia: e}); 
  }
  
  handleChangeSelectLocalidad = (e) => {
    this.setState({ localidad: e });
  }
  
  handleChangeValueArchivoDni = e => {
    this.setState({ constanciaDni: e });
  }
  
  handleChangeValueArchivoAfip = e => {
    this.setState({ constanciaAfip: e });
  }
  
  renderFormulario() {
    return(
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-12 col-lg-9">
        <div className="card shadow-sm p-3 mb-5 bg-white rounded">
          <div className="card-body">
            <h5>Registrarme</h5>
            <form  method="post" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <span className="text-danger error_negrita">
                {this.state.errorApi}
              </span>
            </div>
            <FormularioDatosComunes 
                    handleChangeInput={this.handleChangeInput} 
                    errors={this.state.errors}
                    errorsApi={this.state.errorApi}
                    nombre={this.state.nombre}
                    apellido={this.state.apellido}
                    codArea={this.state.codArea}
                    telefono={this.state.telefono}
                    email={this.state.email}
                    password={this.state.password}
                    password2={this.state.password2}
                    ocultarCampos={this.props.ocultarCampos}
                    soloLectura={this.state.soloLectura}
                  >
            </FormularioDatosComunes>
              <>
                {
                  this.props.esComerciante == true &&
                  <>
                    <hr></hr>
                    <FormularioDatosComerciante
                      handleChangeInput={this.handleChangeInput} 
                      handleChangeSelectLocalidad={this.handleChangeSelectLocalidad}
                      handleChangeSelectProvincia={this.handleChangeSelectProvincia}
                      constanciaDni={this.state.constanciaDni}
                      constanciaAfip={this.state.constanciaAfip}
                      calle={this.props.calle}
                      nro={this.props.nro}
                      provincia={this.state.provincia}
                      localidad={this.state.localidad}
                      errors={this.state.errors}
                      errorsApi={this.state.errorApi}
                      onChangeValueDni={this.handleChangeValueArchivoDni}
                      onChangeValueAfip={this.handleChangeValueArchivoAfip}
                      ocultarCampos={this.props.ocultarCampos}
                    >
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
  
    if(this.props.esComerciante) {
      if(this.state.calle == ''){
        errors["calle"] = "Debe completar la calle";
        formularioValido = false;    
      }
    
      if(this.state.nro == ''){
        errors["nro"] = "Debe completar el nro";
        formularioValido = false;    
      }
    
      if(this.state.provincia == ''){
        errors["provincia"] = "Debe seleccionar su provincia";
        formularioValido = false;    
      }
    
      if(this.state.localidad == ''){
        errors["localidad"] = "Debe completar la calle";
        formularioValido = false;    
      }
    
      if(this.state.constanciaDni == ''){
        errors["constanciaDni"] = "Debe subir una constancia del Dni";
        formularioValido = false;    
      }
    
      if(this.state.constanciaAfip == ''){
        errors["constanciaAfip"] = "Debe subir una constancia de Afip";
        formularioValido = false;    
      }  
    }
  
    this.setState({
      errors: errors
    });
  
    return formularioValido;
  }
  
  handleSubmit(event) {
    if(this.validarFormulario() == true) {
      this.consumirApiRegister();
    } 
    event.preventDefault();
  }
  
  
  consumirApiRegister(){
    this.setState({isLoading:true});
    this.setState({captcha: false });
  
    const payload={
      "apellido":this.state.apellido,
      "nombre":this.state.nombre,
      "codArea":this.state.codArea,
      "telefono":this.state.telefono,
      "password":this.state.password,
      "password2":this.state.password2,
      "email":this.state.email,
      "esComerciante":this.state.esComerciante,
      "calle":this.state.calle,
      "nro":this.state.nro,
      "provincia":this.state.provincia['value'],
      "localidad":this.state.localidad['value'],
      "constanciaDni":this.state.constanciaDni,
      "constanciaAfip":this.state.constanciaAfip
    };
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const formData = new FormData();
    for (let indice in payload) {
      // console.log(x + '-' + payload[x]);
      formData.append(indice,payload[indice]);
    } 
    // llamamos a la api
    this.getData(API_REGISTER,formData,headers);
    event.preventDefault();
  }
  
  async getData(url,payload,headers){
    try 
    {
      // Load async data from an inexistent endpoint.
      const response = await axios.post(url,payload,headers);
      const { data } = await response;
      this.setState({ catchaValido: false });
  
      let code = response.data.code;
      if(code == 200){
        this.setState({ isSignedUp: true }); // after signing up, set the state to true. This will trigger a re-render
      }
      else if(code == 400) {
        this.mostrarErroresApi(response.data.error);
      }
      this.setState({isLoading: false});
    } 
    catch (e) 
    {
      console.log(`😱 Axios request failed: ${e}`);
      this.setState({isLoading: false});
      this.setState({ catchaValido: false });
      alert('Ocurrio un error inesperado, intente nuevamente mas tarde!');
    }
  }
  
  mostrarErroresApi = (response) => {
    let errors = {};
    for (const prop in response) {
      // console.log(`obj.${prop} = ${mensajes[prop]}`);
      errors[prop] = response[prop];
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
  
  handleChangeCaptcha = value => {
      this.setState({
        catchaValido: true
      });
  };
  
  handleChangeCaptchaExpirado = value => {
    this.setState({
      catchaValido: false
    });
  }

  render() {
    return (
      <>{this.renderFormulario()}</>
    );
  }
}

export default FormularioAltaUsuario;