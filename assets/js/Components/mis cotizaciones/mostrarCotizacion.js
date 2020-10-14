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

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <a>Volver al listado</a>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-body">    
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MostrarCotizacion;