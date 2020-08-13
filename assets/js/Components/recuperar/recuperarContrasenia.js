import React , { Component } from 'react';
import {API_REGISTER,API_CAPTCHA_PUBLIC} from '../../Constantes/constantes';
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


  handleSubmit = (event) => {
    // if(this.validarFormulario() == true) {
    //   this.consumirApiRegister();
    // } 
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

  renderContrasenia() {
    const {handleChangeInput} = this.props;
    return(
      <div className="row">
      <div className="col-lg-6">
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <div className="input-group">
            <span id="passwordHelp" className="text-danger error_negrita">
              {this.props.errors["passdistintas"]}
            </span> 
          </div>
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
              <input type="password" className="form-control" name="password" 
                                          defaultValue = {this.props.password} onChange={this.handleChangeInput}
                                          placeholder="Ingrese su contraseña" />	
            </div>
            <span id="passwordHelp" className="text-danger error_negrita">
              {this.props.errors["password"]}
            </span> 
        </div>
      </div>
      <div className="col-lg-6">
        <div className="form-group">
        <label htmlFor="password2">Ingresela de nuevo</label>
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
              <input type="password" className="form-control" name="password2" 
                                          defaultValue = {this.props.password2} onChange={this.handleChangeInput}
                                          placeholder="Escribala de nuevo" />	
            </div>
            <span id="password2Help" className="text-danger error_negrita">
              {this.props.errors["password2"]}
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
                      <>{this.renderEmail()}</>
                      <>{this.renderCaptcha()}</>
                      <>{this.renderBotones()}</>
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