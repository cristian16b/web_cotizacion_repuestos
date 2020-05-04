import React , { Component } from 'react';
require("../login/login.css");
import {Link}  from 'react-router-dom'

class Login extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
        <div className="row justify-content-center">
            <div className="col-lg-5">
                <form action="/examples/actions/confirmation.php" method="post">
                    <h2 className="text-center">Iniciar sesión</h2>   
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                            {/* importante los elementos input deben terminar así: <input /> y no <input></input> porque genera error */}
                            <input type="text" className="form-control" name="username" 
                                    placeholder="Ingrese su nombre de usuario" required="required" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                            <input type="password" className="form-control" name="password" 
                                    placeholder="Ingrese su contraseña" required="required" />	
                        </div>
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