import React , { Component } from 'react';

class FormularioDatosComunes extends React.Component {

  constructor(props){
    super(props);
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
                                        defaultValue={this.props.apellido} onChange={handleChangeInput}
                                        placeholder="Ingrese su apellido"/>
        </div>
        <span id="passwordHelp" className="text-danger error_negrita">
          {this.props.errors["apellido"]}
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
                                        defaultValue={this.props.nombre} onChange={handleChangeInput}
                                        placeholder="Ingrese su nombre"/>
        </div>
        <span id="passwordHelp" className="text-danger error_negrita">
          {this.props.errors["nombre"]}
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
                                                      defaultValue={this.props.codArea} onChange={handleChangeInput}
                                                      placeholder="Ej: 0342"/>
                      </div>
                      <span id="codAreaHelp" className="text-danger error_negrita">
                        {this.props.errors["codArea"]}
                      </span> 
                    </div>
                  </div>
            <div className="col-lg-6 col-12 col-md-12"> 
                  <div className="form-group">
                    <label htmlFor="telefono">Telefóno</label>
                      <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                          <input type="text" className="form-control" name="telefono" 
                                                      defaultValue = {this.props.telefono} onChange={handleChangeInput}
                                                      placeholder="Ingrese su Telefóno" />	
                        </div>
                        <span id="telefonodHelp" className="text-danger error_negrita">
                          {this.props.errors["telefono"]}
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
                                      defaultValue = {this.props.email} onChange={handleChangeInput}
                                      placeholder="Ingrese su email" />	
        </div>
        <span id="passwordHelp" className="text-danger error_negrita">
          {this.props.errors["email"]}
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
              {this.props.errors["passdistintas"]}
            </span> 
          </div>
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
              <input type="password" className="form-control" name="password" 
                                          defaultValue = {this.props.password} onChange={handleChangeInput}
                                          placeholder="Ingrese su contraseña" />	
            </div>
            <span id="passwordHelp" className="text-danger error_negrita">
              {this.props.errors["password"]}
            </span> 
        </div>
      </div>
      <div className="col-lg-6">
        <div className="form-group">
        <label htmlFor="password2">Ingresela de nuevo</label>
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
              <input type="password" className="form-control" name="password2" 
                                          defaultValue = {this.props.password2} onChange={handleChangeInput}
                                          placeholder="Escribala de nuevo" />	
            </div>
            <span id="passwordHelp" className="text-danger error_negrita">
              {this.props.errors["password2"]}
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
        <div className="col-lg-11 col-12 col-md-12">
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