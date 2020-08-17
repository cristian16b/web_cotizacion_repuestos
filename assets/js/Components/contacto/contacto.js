import React , { Component } from 'react';
import {API_CONTACTO,API_CAPTCHA_PUBLIC} from '../../Constantes/constantes';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import Loading from '../loading/loading.js';
import { Redirect } from 'react-router-dom';

class Contacto extends React.Component {

  constructor(props){
    super(props);

    this.state = (
      {
        redirectLogin: false,
        // errores locales o retornados por la api
        errors: {},
        errorApi: '',
        email: '',
        nombreApellido:'',
        password2: '',
        catchaValido: false,
        mensaje: '',
      }
    );

    this.handleSubmit   = this.handleSubmit.bind(this); 
    this.cancelar = this.cancelar.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeCaptcha = this.handleChangeCaptcha.bind(this);
    this.handleChangeCaptchaExpirado = this.handleChangeCaptchaExpirado.bind(this);
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
            <span className="text-danger error_negrita">
              {this.state.errors["captcha"]}
            </span> 
          </div>
        </div> 
      </div> 
    );
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
    this.setState({
      errors: {}
    });

    let formularioValido = true;
    let errors = {};

    if(this.state.email.length == 0) {
      errors["email"] = "Debe completar su e-mail";
      formularioValido = false;
    }
    else {
      let patron = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      let email = this.state.email; 
      if(!patron.test(email)) {
        errors["email"] = "El email ingresado no es valido";
        formularioValido = false;
      }  
    }

    if(this.state.nombreApellido.length == 0) {
      errors["nombreApellido"] = "Debe ingresar nuevamente la contraseña";
      formularioValido = false;
    }

    if(this.state.mensaje.length == 0) {
      errors["mensaje"] = "La contraseña no puede estar vacia";
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
      "apellidoNombre":this.state.nombreApellido,
      "mensaje":this.state.mensaje,
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
    this.getData(API_CONTACTO,formData,headers);
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
        // this.setState({ redirectLogin: true }); // after signing up, set the state to true. This will trigger a re-render
        this.setState({email: ''});
        this.setState({nombreApellido: ''});
        this.setState({mensaje: ''});
        this.setState({captcha: false});
        alert('Su consulta ha sido enviada.');
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

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.validarFormulario() == true) {
      this.consumirApiRegister();
    } 
  }

  cancelar = () => {
    this.setState({redirectLogin: true});
  }

  render() {
    if(this.state.isLoading == true)
      return  <Loading></Loading>
    if(this.state.redirectLogin)
      return <Redirect to = {{ pathname: "/contacto" }} />;
    return (        
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-12 col-lg-9">
          
            <div className="card shadow-sm p-3 mb-5 bg-white rounded">
              <div className="card-body">
              <section className="mb-4">
                <h5>Formulario de contacto</h5>
                <p className="text-center w-responsive mx-auto mb-5">¿Tenes alguna consulta?</p>

                <div className="row">

                    {/* <!--Grid column--> */}
                    <div className="col-md-9 mb-md-0 mb-5">
                        <form method="post" onSubmit={this.handleSubmit}>

                            {/* <!--Grid row--> */}
                            <div className="row">

                                {/* <!--Grid column--> */}
                                <div className="col-md-6">
                                    <div className="md-form mb-0">
                                      <label forhtml="name" className="">Nombre y apellido</label>
                                      <input type="text" id="name" name="nombreApellido" 
                                      defaultValue = {this.state.password2} onChange={this.handleChangeInput}
                                      className="form-control" />
                                      <span id="password2Help" className="text-danger error_negrita">
                                        {this.state.errors["nombreApellido"]}
                                      </span> 
                                    </div>
                                </div>
                                {/* <!--Grid column--> */}

                                {/* <!--Grid column--> */}
                                <div className="col-md-6">
                                    <div className="md-form mb-0">
                                      <label forhtml="email" className="">Email</label>
                                      <input type="text" id="email" name="email"
                                      defaultValue = {this.state.password2} onChange={this.handleChangeInput}
                                      className="form-control" />
                                      <span id="password2Help" className="text-danger error_negrita">
                                        {this.state.errors["email"]}
                                      </span> 
                                    </div>
                                </div>
                                {/* <!--Grid column--> */}
                            </div>
                            {/* <!--Grid row-->

                            <!--Grid row--> */}
                            <div className="row">

                                {/* <!--Grid column--> */}
                                <div className="col-md-12">

                                    <div className="md-form">
                                        <label forhtml="message">Tu pregunta</label>
                                        <textarea type="text" id="message"
                                        defaultValue = {this.state.password2} onChange={this.handleChangeInput}
                                        name="mensaje" rows="2" className="form-control md-textarea"></textarea>
                                        <span id="password2Help" className="text-danger error_negrita">
                                          {this.state.errors["mensaje"]}
                                        </span> 
                                    </div>

                                </div>
                            </div>
                            <>{this.renderCaptcha()}</>


                            {/* <!--Grid row--> */}
                            <div className="row">

                                {/* <!--Grid column--> */}
                                <div className="col-md-6">

                                    <div className="md-form">
                                      <br />
                                      <button type="submit" className="btn btn-primary login-btn btn-block">Enviar</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                  </div>
                </section>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Contacto;