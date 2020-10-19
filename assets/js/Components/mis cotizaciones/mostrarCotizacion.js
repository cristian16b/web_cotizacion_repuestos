import React , { Component } from 'react';
import {API_OBTENER_FOTO_REPUESTO} from '../../Constantes/constantes';
import ModalImage from "react-modal-image";

const multipreview = {
  backgroundPosition: 'center center',
  background:'url(' + 'http://cliquecities.com/assets/no-image-e3699ae23f866f6cbdf8ba2443ee5c4e.jpg' + ')',
  backgroundColor: '#fff',
  backgroundSize: 'cover',
  backgroundRepeat:'no-repeat',
  display: 'inline-block',
  boxShadow: '0px -3px 6px 2px rgba(0,0,0,0.2)',
}

class MostrarCotizacion extends React.Component {

  constructor(props){
    super(props);
  }

  armarPrevisualizacionImagen = (recurso,u) => {
    const url = u + `?fileName=${recurso.nombre_fisico}`;
    return (
            // <div className="col-6 col-md-6 col-lg-6" style={multipreview}>
              //             {/* <ModalImage
              //     small={url}
              //     large={url}
              //     alt=""
              // /> */}
                <img src={url} width="200" height="200" style={multipreview} alt="Ocurrio un problema al previsualizar..." 
                      onClick={() => this.mostrarCotizacion(id)} 
                />
            // </div>
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
    const monto = cotizacion.monto;
    const descripcion = cotizacion.solicitud.repuesto.name;
    const id = cotizacion.id;
    const modelo = cotizacion.solicitud.modelo_auto.name;
    const marca = cotizacion.solicitud.modelo_auto.marca_auto.name;

    return(
      <div className="card">
        <div className="card-body">
          <h6 onClick={() => this.mostrarCotizacion(id)}>Repuesto: {descripcion}</h6>
          <h6>Marca del vehículo: {marca} - Modelo: {modelo}</h6>
          <h5><b>$ {monto}</b></h5>
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
        <div className="col-12 col-md-12 col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-6">
                  <>{this.renderImagenes(cotizacion)}</>
                </div>
                <div className="col-12 col-md-12 col-lg-6">
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