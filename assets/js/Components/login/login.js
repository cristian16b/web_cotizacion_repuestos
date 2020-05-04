import React , { Component } from 'react';
require("../login/login.css");

class Login extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
        <div className="login-form">
            <form action="/examples/actions/confirmation.php" method="post">
                <h2 className="text-center">Sign in</h2>   
                <div className="form-group">
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-user"></i></span>
                        {/* importante los elementos input deben terminar así: <input /> y no <input></input> porque genera error */}
                        <input type="text" className="form-control" name="username" placeholder="Username" required="required" />
                        {/* </input>				 */}
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                        <input type="password" className="form-control" name="password" placeholder="Password" required="required" />	
                        {/* </input>			 */}
                    </div>
                </div>        
                <div className="form-group">
                    <button type="submit" className="btn btn-primary login-btn btn-block">Sign in</button>
                </div>
                <div className="clearfix">
                    <label className="pull-left checkbox-inline"><input type="checkbox" /> Remember me</label>
                    <a href="#" className="pull-right">Forgot Password?</a>
                </div>
                <div className="or-seperator">
                    <i>or</i>
                </div>
                <p className="text-center">Login with your social media account</p>
                <div className="text-center social-btn">
                    <a href="#" className="btn btn-primary"><i className="fa fa-facebook"></i>&nbsp; Facebook</a>
                    <a href="#" className="btn btn-info"><i className="fa fa-twitter"></i>&nbsp; Twitter</a>
                    <a href="#" className="btn btn-danger"><i className="fa fa-google"></i>&nbsp; Google</a>
                </div>
            </form>
            <p className="text-center text-muted small">Don't have an account? <a href="#">Sign up here!</a></p>
        </div>
    );
  }
}

export default Login;