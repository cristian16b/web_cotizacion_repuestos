import React , { Component } from 'react';

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
  }

  handleChangeInput = e => {
    this.setState({
      [e.target.name] : e.target.value
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
                                      defaultValue = {this.state.email} onChange={handleChangeInput}
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
                      <>{this.renderEmail()}</>
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