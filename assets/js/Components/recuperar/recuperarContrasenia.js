import React , { Component } from 'react';

class RecuperarContrasenia extends React.Component {

  constructor(props){
    super(props);

    this.state = (
      {
        redirectLogin: false,
      }
    );

    this.handleSubmit   = this.handleSubmit.bind(this); 
  }

  handleSubmit = (event) => {
    // if(this.validarFormulario() == true) {
    //   this.consumirApiRegister();
    // } 
    event.preventDefault();
  }

  redirectToLogin = () => {
    this.setState({redirectLogin: true});
  }

  render() {
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