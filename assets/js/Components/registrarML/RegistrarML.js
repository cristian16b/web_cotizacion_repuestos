import React , { Component } from 'react';

class RegistrarML extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-12 col-lg-9">
          <h5>Vincular tu cuenta con MercadoPago</h5>
          <div className="card shadow-sm p-3 mb-5 bg-white rounded">
            <div className="card-body">
              <p className="card-text">
                EisenPart es una plataforma de venta de respuestos vinculada con MercadoPago para que puedas recibir los pagos. Para completar debes apretar confirmar y el sistema te va a dirigir a la pagina principal de MercadoPago.
              </p>
              <p>En la misma se te van a solicitar tu usuario/contraseña de tu cuenta de MercadoPago.</p>
              <a type="button" href={this.props.url} className="btn btn-primary">Confirmar</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegistrarML;