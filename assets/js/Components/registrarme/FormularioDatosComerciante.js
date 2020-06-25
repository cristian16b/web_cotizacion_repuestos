import React , { Component } from 'react';
import SubidaArchivos from '../subida Archivos/SubidaArchivos.js';

class FormularioDatosComerciante extends React.Component {

  constructor(props){
    super(props);

    this.state = ({
        constanciaDni: '',
        constanciaAfip: '',
        calle: '',
        nro: '',
        localidad: '',
        provincia: '',
        errors: {},
    })
  }
  
  renderCalleNro(){
    const {handleChangeInput} = this.props;
    return(
      <div className="row">
        <div className="col-lg-9 col-12 col-md-12">
          <div className="form-group">
            <label htmlFor="calle">Calle</label>
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-user"></i></span>
                  {/* importante los elementos input deben terminar así: <input /> y no <input></input> porque genera error */}
                  <input type="text" className="form-control" name="nombre" 
                                              defaultValue={this.state.calle} onChange={handleChangeInput}
                                              placeholder="Ingrese su calle"/>
              </div>
              <span id="calledHelp" className="text-danger error_negrita">
                {/* {this.props.errors["calle"]} */}
              </span> 
            </div>
          </div>
          {/* fin primer columna */}
          <div className="col-lg-3 col-12 col-md-12">
            <div className="form-group">
            <label htmlFor="nro">Nro.</label>
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-user"></i></span>
                  {/* importante los elementos input deben terminar así: <input /> y no <input></input> porque genera error */}
                  <input type="text" className="form-control" name="nro" 
                                              defaultValue={this.state.nro} onChange={handleChangeInput}
                                              placeholder="Ej: 5746"/>
              </div>
              <span id="calledHelp" className="text-danger error_negrita">
                {/* {this.props.errors["calle"]} */}
              </span> 
            </div>
          </div>
          {/* fin segunda columna */}
      </div>
      // fin de la fila
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
                                                      defaultValue = {this.state.telefono} onChange={handleChangeInput}
                                                      placeholder="Ingrese su Telefóno" />	
                        </div>
                        <span id="passwordHelp" className="text-danger error_negrita">
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
                                      defaultValue = {this.state.email} onChange={handleChangeInput}
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
                                          defaultValue = {this.state.password} onChange={handleChangeInput}
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
                                          defaultValue = {this.state.password2} onChange={handleChangeInput}
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

  renderArchivos = () => {
    return(
        <div className="row">
          <div className="col-lg-5 col-12 col-md-12">
            <SubidaArchivos nombreBoton="Adjuntar una copia de su inscripción AFIP"></SubidaArchivos>
          </div>
          <hr/>
          <div className="col-lg-5 col-12 col-md-12">
            <SubidaArchivos nombreBoton="Adjuntar una copia de su inscripción AFIP"></SubidaArchivos>
          </div>
        </div>
    );
  }
  
  render() {
    const {handleChangeInput} = this.props;
    return (
      <div className="row">
        <div className="col-lg-10 col-12 col-md-12">
          <>{this.renderCalleNro()}</>
          <>{this.renderArchivos()}</>
        </div>
      </div>
    );
  }
}

export default FormularioDatosComerciante;