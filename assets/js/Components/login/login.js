import React , { Component } from 'react';

class Login extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                {/* <!-- Tabs Titles --> */}
            
                {/* <!-- Icon --> */}
                <div className="fadeIn first">
                    <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
                </div>
        
                {/* <!-- Login Form --> */}
                <form>
                    <input type="text" id="login" className="fadeIn second" name="login" placeholder="login"></input>
                    <input type="text" id="password" className="fadeIn third" name="login" placeholder="password"></input>
                    <input type="submit" className="fadeIn fourth" value="Log In"></input>
                </form>
               
                {/* <!-- Remind Passowrd --> */}
                <div id="formFooter">
                    <a className="underlineHover" href="#">Forgot Password?</a>
                </div>
            </div>
        </div>
    );
  }
}

export default Login;