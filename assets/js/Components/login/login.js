import React , { Component  } from 'react';
require("../login/login.css");
import {Link}  from 'react-router-dom';
import {API_LOGIN,API_LOGIN_SOCIAL} from '../../Constantes/constantes';
import axios from 'axios';
// import SocialButton from '../social button/SocialButton';
import { FacebookLoginButton } from "react-social-login-buttons";
import { OldSocialLogin as SocialLogin } from 'react-social-login'
 
class Login extends React.Component {

    constructor(props){
        super(props);

        this.state = ({
            username:'',
            password:'',
            errors: {},
            errorApi: ''
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
    handleSocialLogin = (user) => {
        let email = user.profile.email;
        let nombre = user.profile.name;
        let apellido = user.profile.lastName;
        let id = user.profile.id;
        let token = user.token.accessToken;

        const payload = {
            email,
            nombre,
            apellido,
            id,
            token
        };
        this.consumirAxios(API_LOGIN_SOCIAL,payload);
    }

    //adaptador para hacer petición http
    consumirAxios = (url,payload) => {
        axios.post(url,payload)
        .then(response => {
            let rol = response.data.rol;
            let token = response.data.token;
            let code = response.data.code;
            // console.log(rol + ' ' + code );
            // Llamo al componente app para que muestre habilite rutas segun corresponda por el rol
            this.props.obtenerTokenPadre(true,rol,token,code);
        })
        .catch(e => {
            if(e.response)
            {
                let error = '';
                error = e.response.data.message;
                this.setState({errorApi: error});
            }
        });
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-lg-5">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <h2 className="text-center">Iniciar sesión</h2>
                                <div className="form-group">
                                    <span className="text-danger error_negrita">
                                        {this.state.errorApi}
                                    </span>
                                </div>   
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
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary login-btn btn-block">Ingresar</button>
                                </div>
                            </form>
                            <div className="clearfix">
                                    {/* <label className="pull-left checkbox-inline"><input type="checkbox" /> Remember me</label> */}
                                    <Link to="/recuperarContrasenia" className="navbar-brand">
                                        <span className="small"> 
                                            ¿Olvidaste tu contraseña?
                                        </span>
                                    </Link>
                            </div>
                            <div className="clearfix">
                                <hr />
                            </div>
                            <p className="text-center">O ingresar con tu red social</p>
                            <div className="text-center social-btn">
                                            <div className="row justify-content-center">
                                                <div className="col-lg-5 col-md-5">
                                                    {/* <SocialButton
                                                        provider='facebook'
                                                        appId='245924643289636'
                                                        onLoginSuccess={this.handleSocialLogin}
                                                        // onLoginFailure={handleSocialLoginFailure}
                                                        >
                                                        <FacebookLoginButton>
                                                            Facebook
                                                        </FacebookLoginButton>
                                                    </SocialButton> */}
                                                    <SocialLogin
                                                        provider='facebook'
                                                        appId='245924643289636'
                                                        callback={this.handleSocialLogin}
                                                        >
                                                        <FacebookLoginButton>
                                                            Facebook
                                                        </FacebookLoginButton>
                                                    </SocialLogin>
                                                </div>
                                            </div>          
                                </div>
                            <p className="text-center">¿No tienes una cuenta?&nbsp;  
                                <Link to="/registrarme">
                                    <span> 
                                         Registrate!
                                    </span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;