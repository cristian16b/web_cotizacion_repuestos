import React , { Component } from 'react';

class Registrarme extends React.Component {

  constructor(props){
    super(props);

    this.state = ({
        nombre:'',
        apellido: '',
        codArea: '',
        telefono: '',
        email: '',
        //solo para vendedores
        esComerciante: '',
        cuitCuit: '',
        domicilio: '',
        //
        password:'',
        password2: '',
        errors: {},
        errorApi: '',

    })

    this.handleSubmit   = this.handleSubmit.bind(this); 
    this.validarFormulario = this.validarFormulario.bind(this);
}

handleSubmit(event) {
  if(this.validarFormulario() == true) {
      this.consumirApiLogin();
  }
  event.preventDefault();
}

validarFormulario() {

}

render() {
  return (        
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <div className="card">
            <div className="card-body">
              <h2 className="my-4">Registrarme</h2>
              <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <span className="text-danger error_negrita">
                  {this.state.errorApi}
                </span>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                  <label htmlFor="apellido">Apellido</label>
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-user"></i></span>
                        {/* importante los elementos input deben terminar así: <input /> y no <input></input> porque genera error */}
                        <input type="text" className="form-control" name="apellido" 
                                                    defaultValue={this.state.apellido} onChange={this.cambioUsername}
                                                    placeholder="Ingrese su apellido"/>
                    </div>
                    <span id="passwordHelp" className="text-danger error_negrita">
                      {this.state.errors["apellido"]}
                    </span> 
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                  <label htmlFor="apellido">Nombre</label>
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-user"></i></span>
                        {/* importante los elementos input deben terminar así: <input /> y no <input></input> porque genera error */}
                        <input type="text" className="form-control" name="nombre" 
                                                    defaultValue={this.state.apellido} onChange={this.cambioUsername}
                                                    placeholder="Ingrese su nombre"/>
                    </div>
                    <span id="passwordHelp" className="text-danger error_negrita">
                      {this.state.errors["nombre"]}
                    </span> 
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                  <label htmlFor="codArea">Código de área</label>
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                        <input type="text" className="form-control" name="codArea" 
                                                    defaultValue={this.state.codArea} onChange={this.cambioUsername}
                                                    placeholder="Ingrese su Código de área"/>
                    </div>
                    <span id="passwordHelp" className="text-danger error_negrita">
                      {this.state.errors["codArea"]}
                    </span> 
                </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                  <label htmlFor="telefono">Telefóno</label>
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                        <input type="text" className="form-control" name="telefono" 
                                                    defaultValue = {this.state.telefono} onChange={this.cambioPassword}
                                                    placeholder="Ingrese su Telefóno" />	
                      </div>
                      <span id="passwordHelp" className="text-danger error_negrita">
                        {this.state.errors["telefono"]}
                      </span> 
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                        <input type="text" className="form-control" name="password" 
                                                    defaultValue = {this.state.email} onChange={this.cambioPassword}
                                                    placeholder="Ingrese su email" />	
                      </div>
                      <span id="passwordHelp" className="text-danger error_negrita">
                        {this.state.errors["email"]}
                      </span> 
                  </div>
                </div>
              </div>

          <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
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
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                  <label htmlFor="password2">Ingrese nuevamente su contraseña</label>
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                        <input type="password" className="form-control" name="password2" 
                                                    defaultValue = {this.state.password2} onChange={this.cambioPassword}
                                                    placeholder="Ingrese nuevamente su contraseña" />	
                      </div>
                      {/* <span id="passwordHelp" className="text-danger error_negrita">
                        {this.state.errors["password"]}
                      </span>  */}
                  </div>
                </div>
              </div>

          
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Registrarme</button>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <button type="reset" className="btn btn-light btn-block">Cancelar</button>
                  </div>
                </div>  
              </div> 
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Registrarme;