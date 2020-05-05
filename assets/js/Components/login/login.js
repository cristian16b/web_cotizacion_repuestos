import React , { Component } from 'react';
require("../login/login.css");
import {Link}  from 'react-router-dom';
import {API_LOGIN} from '../../Constantes/constantes';
import axios from 'axios';

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
    }

    handleSubmit(event) {
        if(this.validarFormulario() == true) {
            this.consumirApiLogin();
        }
        // alert('los errores encontrados son :' + this.state.errors);
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

    consumirApiLogin() {
        const payload={
            "_username":this.state.username,
            "_password":this.state.password,
        }
        var self = this;
        axios.post(API_LOGIN, payload)
            .then(function (response) {
                self.setState({errorApi: response.data})
            })
            .catch(function (e) {
                console.log(e);
                let error = '';
                if(e.response)
                {
                    let error = e.response.message;
                }
                self.setState({errorApi: error})
            });
    }

    redirectToHome() {
        props.updateTitle('Home')
        props.history.push('/');
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-lg-5">
                    <form onSubmit={this.handleSubmit}>
                        <h2 className="text-center">Iniciar sesión</h2>   
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                {/* importante los elementos input deben terminar así: <input /> y no <input></input> porque genera error */}
                                <input type="text" className="form-control" name="username" 
                                        defaultValue={this.state.username} onChange={this.cambioUsername}
                                        placeholder="Ingrese su nombre de usuario"/>
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
                        <div className="clearfix">
                            {/* <label className="pull-left checkbox-inline"><input type="checkbox" /> Remember me</label> */}
                            <Link to="/registrarme" className="navbar-brand">
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
                            <a href="#" className="btn btn-primary"><i className="fa fa-facebook"></i>&nbsp; Facebook</a>
                            {/* <a href="#" className="btn btn-info"><i className="fa fa-twitter"></i>&nbsp; Twitter</a>
                            <a href="#" className="btn btn-danger"><i className="fa fa-google"></i>&nbsp; Google</a> */}
                        </div>
                    </form>
                    <p className="text-center text-muted small">¿No tienes una cuenta? 
                        <Link to="/registrarme" className="navbar-brand">
                            <span className="small"> 
                                Registrate!
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default Login;