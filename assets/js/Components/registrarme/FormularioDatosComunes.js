import React , { Component } from 'react';

class FormularioDatosComunes extends React.Component {

  constructor(props){
    super(props);

    this.state = ({
        nombre:'',
        apellido: '',
        codArea: '',
        telefono: '',
        email: '',
        //
        password:'',
        password2: '',
        errors: {},
        errorApi: '',
    })
  }

  renderApellido() {
    const {handleChangeInput} = this.props;
    return(
      <div className="form-group">
      <label htmlFor="apellido">Apellido</label>
        <div className="input-group">
          <span className="input-group-addon"><i className="fa fa-user"></i></span>
            {/* importante los elementos input deben terminar así: <input /> y no <input></input> porque genera error */}
            <input type="text" className="form-control" name="apellido" 
                                        defaultValue={this.state.apellido} onChange={handleChangeInput}
                                        placeholder="Ingrese su apellido"/>
        </div>
        <span id="passwordHelp" className="text-danger error_negrita">
          {this.state.errors["apellido"]}
        </span> 
      </div>
    )
  }
  
  renderNombre(){
    const {handleChangeInput} = this.props;
    return(
      <div className="form-group">
      <label htmlFor="apellido">Nombre</label>
        <div className="input-group">
          <span className="input-group-addon"><i className="fa fa-user"></i></span>
            {/* importante los elementos input deben terminar así: <input /> y no <input></input> porque genera error */}
            <input type="text" className="form-control" name="nombre" 
                                        defaultValue={this.state.nombre} onChange={handleChangeInput}
                                        placeholder="Ingrese su nombre"/>
        </div>
        <span id="passwordHelp" className="text-danger error_negrita">
          {this.state.errors["nombre"]}
        </span> 
      </div>
    );
  }
  
  renderTelefono() {
    const {handleChangeInput} = this.props;
    return(
        <div className="row">
            <div className="col-lg-6 col-12 col-md-12">                
                  <div className="form-group">
                    <label htmlFor="codArea">Código de área</label>
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-user"></i></span>
                          <input type="text" className="form-control" name="codArea" 
                                                      defaultValue={this.state.codArea} onChange={handleChangeInput}
                                                      placeholder="Ej: 0342"/>
                      </div>
                      <span id="passwordHelp" className="text-danger error_negrita">
                        {this.state.errors["codArea"]}
                      </span> 
                    </div>
                  </div>
            <div className="col-lg-6 col-12 col-md-12"> 
                  <div className="form-group">
                    <label htmlFor="telefono">Telefóno</label>
                      <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                          <input type="text" className="form-control" name="telefono" 
                                                      defaultValue = {this.state.telefono} onChange={handleChangeInput}
                                                      placeholder="Ingrese su Telefóno" />	
                        </div>
                        <span id="passwordHelp" className="text-danger error_negrita">
                          {this.state.errors["telefono"]}
                        </span> 
                  </div>
            </div>
        </div>
    );
  }
  
  renderEmail() {
    const {handleChangeInput} = this.props;
    return (
      <div className="form-group">
      <label htmlFor="email">Email</label>
      <div className="input-group">
        <span className="input-group-addon"><i className="fa fa-lock"></i></span>
          <input type="text" className="form-control" name="email" 
                                      defaultValue = {this.state.email} onChange={handleChangeInput}
                                      placeholder="Ingrese su email" />	
        </div>
        <span id="passwordHelp" className="text-danger error_negrita">
          {this.state.errors["email"]}
        </span> 
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
              {this.state.errors["passdistintas"]}
            </span> 
          </div>
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
              <input type="password" className="form-control" name="password" 
                                          defaultValue = {this.state.password} onChange={handleChangeInput}
                                          placeholder="Ingrese su contraseña" />	
            </div>
            <span id="passwordHelp" className="text-danger error_negrita">
              {this.state.errors["password"]}
            </span> 
        </div>
      </div>
      <div className="col-lg-6">
        <div className="form-group">
        <label htmlFor="password2">Ingresela de nuevo</label>
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
              <input type="password" className="form-control" name="password2" 
                                          defaultValue = {this.state.password2} onChange={handleChangeInput}
                                          placeholder="Escribala de nuevo" />	
            </div>
            <span id="passwordHelp" className="text-danger error_negrita">
              {this.state.errors["password2"]}
            </span> 
        </div>
      </div>
    </div>
    );
  }
  
  render() {
    const {handleChangeInput} = this.props;
    return (
      <div className="row">
        <div className="col-lg-10 col-12 col-md-12">
          <>{this.renderApellido()}</>
          <>{this.renderNombre()}</>
          <>{this.renderEmail()}</>
          <>{this.renderTelefono()}</>
          <>{this.renderContrasenia()}</>
        </div>
      </div>
    );
  }
}

export default FormularioDatosComunes;