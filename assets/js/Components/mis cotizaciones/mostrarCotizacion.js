import React , { Component } from 'react';

class MostrarCotizacion extends React.Component {

  constructor(props){
    super(props);
  }

  armarPrevisualizacionImagen = (recurso,u) => {
    const url = u + `?fileName=${recurso.nombre_fisico}`;
    return (
            <div className="col-12 col-sm-12 col-md-3 col-lg-3">
                    <ModalImage
                            small={url}
                            large={url}
                            alt=""
                        />
            </div>
    );
  }

  mostrarListado = () => { this.props.mostrarListado(); }

  renderImagenes = () => {

  }

  renderDescripcion = () => {
    
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <button type="button" className="btn btn-link" onClick={this.mostrarListado}>Volver al listado</button>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <>{this.renderImagenes()}</>
                </div>
                <div className="col-6">
                  <>{this.renderDescripcion()}</>
                </div>
              </div>    
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MostrarCotizacion;