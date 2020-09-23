import React , { Component } from 'react';

class DarBaja extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="row justify-content-center containerCentral">
        <div className="col-12 col-sm-12 col-md-12 col-lg-9">
            <div className="card shadow-sm p-3 mb-5 bg-white rounded">
              <div className="card-body">
                <h5>Cancelar mi cuenta</h5>
                <hr/>
                <p>
                  La cancelación de su cuenta ocasiona la perdida de sus datos y 
                  no podrá registrarse nuevamente usando el mismo correo. 
                </p>
                <p>

                </p>
                <p>
                  Si usted esta seguro de continuar presione Confirmar. 
                  Caso contrario, presione Cancelar.
                </p>
                <div className="row">
                 <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                     <div className="form-group">
                       <button onClick={this.confirmarBajaUsuario}
                               className="btn btn-primary btn-block">Confirmar</button>
                     </div>
                 </div>
                 <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                     <div className="form-group">
                       <button 
                               onClick={this.cancelarBajaUsuario}
                               className="btn btn-light btn-block">Cancelar</button>
                     </div>
                 </div>  
               </div>     
            </div>
          </div>
        </div>
      </div>
    );
  }

  confirmarBajaUsuario = () => {

  }

  cancelarBajaUsuario = () => {
    this.props.cancelarBajaUsuario();
  }
}

export default DarBaja;