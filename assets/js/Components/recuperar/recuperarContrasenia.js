import React , { Component } from 'react';
import {API_CAMBIAR_CONTRASENIA,API_CAPTCHA_PUBLIC} from '../../Constantes/constantes';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import Loading from '../loading/loading.js';
import { Redirect } from 'react-router-dom';

class RecuperarContrasenia extends React.Component {

  constructor(props){
    super(props);

    this.state = (
      {
        redirectLogin: false,
        // errores locales o retornados por la api
        errors: {},
        errorApi: '',
        email: '',
        password:'',
        password2: '',
        catchaValido: false,
      }
    );

    this.handleSubmit   = this.handleSubmit.bind(this); 
    this.cancelar = this.cancelar.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeCaptcha = this.handleChangeCaptcha.bind(this);
    this.handleChangeCaptchaExpirado = this.handleChangeCaptchaExpirado.bind(this);
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

  validarFormulario = () => {
    let formularioValido = true;
    let errors = {};

    if(this.state.email.length == 0) {
      errors["email"] = "Debe completar su e-mail";
      formularioValido = false;
    }
  
    if(this.state.password2.length == 0) {
      errors["password2"] = "Debe ingresar nuevamente la contraseña";
      formularioValido = false;
    }

    if(this.state.password.length == 0) {
      errors["password"] = "La contraseña no puede estar vacia";
      formularioValido = false;
    }

    if(this.state.password != this.state.password2) {
      errors["passdistintas"] = "Las contraseñas ingresadas son diferentes";
      formularioValido = false;
    }

    if(this.state.catchaValido == false) {
      errors["captcha"] = "Debe completar el captcha";
      formularioValido = false;
    }

    this.setState({
      errors: errors
    });
  
    return formularioValido;
  }

  consumirApiRegister(){
    this.setState({isLoading:true});
    this.setState({captcha: false });
  
    const payload={
      "password":this.state.password,
      "password2":this.state.password2,
      "email":this.state.email,
    };
    // console.log(payload);
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const formData = new FormData();
    for (let indice in payload) {
      // console.log(x + '-' + payload[x]);
      formData.append(indice,payload[indice]);
    } 
    // llamamos a la api
    this.getData(API_CAMBIAR_CONTRASENIA,formData,headers);
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

  handleSubmit = (event) => {
    if(this.validarFormulario() == true) {
      this.consumirApiRegister();
    } 
    event.preventDefault();
  }

  cancelar = () => {
    this.setState({redirectLogin: true});
  }

  renderEmail() {
    return (
      <div className="form-group">
      <label htmlFor="email">Email</label>
      <div className="input-group">
        <span className="input-group-addon"><i className="fa fa-lock"></i></span>
          <input type="text" className="form-control" name="email" 
                              readOnly={this.state.soloLectura}
                                      defaultValue = {this.state.email} onChange={this.handleChangeInput}
                                      placeholder="Ingrese su email" />	
        </div>
        <span id="emailHelp" className="text-danger error_negrita">
          {this.state.errors["email"]}
        </span> 
    </div>
    );
  }

  renderBotones() {
    return (
      <div className="row">
        <div className="col-lg-6">
          <div className="form-group">
            <button type="submit" onClick={this.handleSubmit}
                    className="btn btn-primary btn-block">Confirmar</button>
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

  renderContrasenia() {
    return(
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
                                          defaultValue = {this.state.password} onChange={this.handleChangeInput}
                                          placeholder="Ingrese su nueva contraseña" />	
            </div>
            <span id="passwordHelp" className="text-danger error_negrita">
              {this.state.errors["password"]}
            </span> 
        </div>
      </div>
      <div className="col-lg-6">
        <div className="form-group">
        <label htmlFor="password2">Ingresela de nuevo</label>
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
              <input type="password" className="form-control" name="password2" 
                                          defaultValue = {this.state.password2} onChange={this.handleChangeInput}
                                          placeholder="Escribala de nuevo" />	
            </div>
            <span id="password2Help" className="text-danger error_negrita">
              {this.state.errors["password2"]}
            </span> 
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

  render() {
    if(this.state.isLoading == true)
      return  <Loading></Loading>
    if(this.state.redirectLogin)
      return <Redirect to = {{ pathname: "/login" }} />;
    return (
    <div className="row justify-content-center">
      <div className="col-12 col-sm-12 col-md-12 col-lg-8">
        <div className="card shadow-sm p-3 mb-5 bg-white rounded">
          <div className="card-body">
            <h5>Recuperar tu contraseña</h5>
              <hr></hr>
                <form  method="post" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <span className="text-danger error_negrita">
                        {this.state.errorApi}
                      </span>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <p>Para reestablecer su contraseña debe ingresar el e-mail con el que usted se registro.</p>
                      </div>
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <>{this.renderEmail()}</>
                      </div>
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <>{this.renderContrasenia()}</>
                      </div>
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <>{this.renderCaptcha()}</>
                      </div>
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <>{this.renderBotones()}</>
                      </div>
                    </div>
                </form>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default RecuperarContrasenia;