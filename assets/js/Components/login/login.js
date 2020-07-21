import React , { Component  } from 'react';
require("../login/login.css");
import {Link}  from 'react-router-dom';
import {API_LOGIN,API_LOGIN_SOCIAL,API_FACEBOOK} from '../../Constantes/constantes';
import axios from 'axios';
// import SocialButton from '../social button/SocialButton';
import { FacebookLoginButton,GoogleLoginButton,API_GMAIL_KEY,API_GMAIL_PRIVATE } from "react-social-login-buttons";
import { OldSocialLogin as SocialLogin } from 'react-social-login';
import Loading from '../loading/loading.js';
 
class Login extends React.Component {

    constructor(props){
        super(props);

        this.state = ({
            username:'',
            password:'',
            errors: {},
            errorApi: '',
            isLoading: false,
        })

        this.cambioUsername = this.cambioUsername.bind(this);
        this.cambioPassword = this.cambioPassword.bind(this);
        this.handleSubmit   = this.handleSubmit.bind(this); 
        this.consumirApiLogin = this.consumirApiLogin.bind(this);
        this.validarFormulario = this.validarFormulario.bind(this);
    }

    handleSubmit(event) {
        if(this.validarFormulario() == true) {
            this.consumirApiLogin();
        }
        event.preventDefault();
    }

    validarFormulario() {
        let formularioValido = true;
        let errors = {};
        //alert('A name was submitted: ' + this.state.username + ' ' + this.state.password);
        if(this.state.username.length == 0) {
            errors["username"] = "El usuario no puede estar vacio";
            formularioValido = false;
        }
        if(this.state.password.length == 0) {
            errors["password"] = "La contraseña no puede estar vacia";
            formularioValido = false;
        }

        this.setState({
            errors: errors
        })

        return formularioValido;
    }

    cambioPassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    cambioUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    // login con user/pass
    consumirApiLogin() {
        const payload={
            "_username":this.state.username,
            "_password":this.state.password,
        }
        this.consumirAxios(API_LOGIN,payload);
    }

    // login con facebook
    handleSocialLoginFacebook = (user) => {
        let email = user.profile.email;
        let nombre = user.profile.name;
        let apellido = user.profile.lastName;
        let id = user.profile.id;
        let token = user.token.accessToken;
        let provider = 'FACEBOOK';

        const payload = {
            email,
            nombre,
            apellido,
            id,
            token,
            provider
        };
        this.consumirAxios(API_LOGIN_SOCIAL,payload);
    }

    // login con gmail
    handleSocialLoginGmail = (user) => {
        let email = user.profile.email;
        let nombre = user.profile.firstName;
        let apellido = user.profile.lastName;
        let id = user.profile.id;
        let token = user.token.accessToken;
        let provider = 'GMAIL';

        const payload = {
            email,
            nombre,
            apellido,
            id,
            token,
            provider
        };
        this.consumirAxios(API_LOGIN_SOCIAL,payload);
    }

    //adaptador para hacer petición http
    consumirAxios = (url,payload) => {
        this.setState({isLoading: true});
        axios.post(url,payload)
        .then(response => {
            let rol = response.data.rol;
            let token = response.data.token;
            let code = response.data.code;
            this.setState({isLoading: false});
            if(code != 200) 
            {
                let error = response.data.message;
                this.setState({errorApi: error});
            }
            else {
                // console.log(rol + ' ' + code );
                // Llamo al componente app para que muestre habilite rutas segun corresponda por el rol
                this.props.obtenerTokenPadre(true,rol,token,code);
            }
        })
        .catch(e => {
            this.setState({isLoading: false});
            if(e.response)
            {
                let error = '';
                error = e.response.data.message;
                if(e.response.data.code == 401) {
                    this.setState({errorApi: 'Usuario y / o contraseña invalida'});
                }
                else {
                    this.setState({errorApi: error});
                }
            }
        });
    }

    renderLoginSocial () {
        return(
                <div className="text-center social-btn">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-6 col-md-6 col-sm-8">
                            <SocialLogin
                                provider='facebook'
                                appId={API_FACEBOOK}
                                callback={this.handleSocialLoginFacebook}
                            >
                                <FacebookLoginButton>
                                    Facebook
                                </FacebookLoginButton>
                            </SocialLogin>
                            <SocialLogin
                                provider='google'
                                appId={API_GMAIL_KEY}
                                callback={this.handleSocialLoginGmail}
                            >
                                <GoogleLoginButton>
                                    Gmail
                                </GoogleLoginButton>
                            </SocialLogin>
                        </div>
                    </div>          
                </div>
            );
    }

    renderRegistrarse () {
        return(
                            <p className="text-center">¿No tienes una cuenta?&nbsp;  
                                <Link to="/registrarme">
                                    <span> 
                                         Registrate!
                                    </span>
                                </Link>
                            </p>
        );
    }

    renderInputCorreo() {
        return(
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                    {/* importante los elementos input deben terminar así: <input /> y no <input></input> porque genera error */}
                    <input type="text" className="form-control" name="username" 
                            defaultValue={this.state.username} onChange={this.cambioUsername}
                            placeholder="Ingrese su correo"/>
                </div>
                <span id="passwordHelp" className="text-danger error_negrita">
                    {this.state.errors["username"]}
                </span> 
            </div>
        );
    }

    renderInputPass() {
        return(
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                        <input type="password" className="form-control" name="password" 
                        defaultValue = {this.state.password} onChange={this.cambioPassword}
                        placeholder="Ingrese su contraseña" />	
                </div>
                <span id="passwordHelp" className="text-danger error_negrita">
                        {this.state.errors["password"]}
                </span> 
            </div>        
        );
    }

    renderOlvidePass() {
        return(
            <div className="clearfix">
                {/* <label className="pull-left checkbox-inline"><input type="checkbox" /> Remember me</label> */}
                <Link to="/recuperarContrasenia">
                    <span className="small"> 
                        ¿Olvidaste tu contraseña?
                    </span>
                </Link>
            </div>
        );
    }

    render() {
    if(this.state.isLoading == true)
        return  <Loading></Loading>
    else
        return (
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-12 col-lg-5">
                    <div className="card  shadow-sm p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <h5 className="text-center">Ingresar</h5>
                                <div className="form-group">
                                    <span className="text-danger error_negrita">
                                        {this.state.errorApi}
                                    </span>
                                </div>   
                                { this.renderInputCorreo() }
                                { this.renderInputPass() }
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary login-btn btn-block">Ingresar</button>
                                </div>
                            </form>
                                { this.renderOlvidePass() }
                            <div className="clearfix">
                                <hr />
                            </div>
                            <p className="text-center">O ingresar con tu red social</p>
                                { this.renderLoginSocial() }
                                { this.renderRegistrarse() }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;