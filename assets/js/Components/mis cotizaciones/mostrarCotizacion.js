import React , { Component } from 'react';
import {API_OBTENER_FOTO_REPUESTO} from '../../Constantes/constantes';
import ModalImage from "react-modal-image";

class MostrarCotizacion extends React.Component {

  constructor(props){
    super(props);
  }

  armarPrevisualizacionImagen = (recurso,u) => {
    const url = u + `?fileName=${recurso.nombre_fisico}`;
    return (
            <div className="col-12 modal-image">
              <ModalImage
                  small={url}
                  large={url}
                  alt=""
                  className="modal-image"       
              />
            </div>
    );
  }

  mostrarListado = () => { this.props.mostrarListado(); }

  renderImagenes = (cotizacion) => {
    const recursos = cotizacion.recurso_cotizacions;
    return(
      <div className="row justify-content-center"> 
        {
          recursos.map(e  =>  {
            return this.armarPrevisualizacionImagen(e,API_OBTENER_FOTO_REPUESTO)
          })
        }
      </div>
    )
  }

  renderDescripcion = (cotizacion) => {
    return(
      <div className="card">
        <div className="card-body">
          soy una prueba
        </div>
      </div>
    )
  }

  render() {
    const cotizacion = this.props.cotizacion;
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
                  <>{this.renderImagenes(cotizacion)}</>
                </div>
                <div className="col-6">
                  <>{this.renderDescripcion(cotizacion)}</>
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