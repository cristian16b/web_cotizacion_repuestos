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

const paddingPrevisualizacion = {
  paddingLeft: "10%",
  paddingRight: "5%",
  paddingTop: "0%",
}

const paddingCard = {
  paddingLeft: "5%",
  paddingRight: "5%",
  paddingTop: "0%",
  marginTop: "1%"
}

class MostrarCotizacion extends React.Component {

  constructor(props){
    super(props);

    this.state = ({
      urlImagenVisualizada: null,
    })
    
  }

  componentDidMount() {
    const nombreFisico = this.props.cotizacion.recurso_cotizacions[0].nombre_fisico;
    const url = API_OBTENER_FOTO_REPUESTO + `?fileName=${nombreFisico}`;
    this.mostrarImagen(url);
  }

  armarMiniaturaImagen = (recurso,u) => {
    const url = u + `?fileName=${recurso.nombre_fisico}`;
    return (
            <div className="col-4 col-md-4 col-lg-4">
              <img src={url} width="100" height="100" style={multipreview} alt="Cargando..." 
                onClick={() => this.mostrarImagen(url)} 
              />
            </div>
    );
  }

  mostrarListado = () => { this.props.mostrarListado(); }

  mostrarImagen = (url) => { this.setState({urlImagenVisualizada: url}); }

  renderImagenes = (cotizacion) => {
    const recursos = cotizacion.recurso_cotizacions;
    return(
      <div className="row" align="left">
        <div className="col-3 col-md-3 col-lg-3">
          {
            recursos.map(e  =>  {
              return this.armarMiniaturaImagen(e,API_OBTENER_FOTO_REPUESTO)
            })
          }
        </div>
        <div className="col-9 col-md-9 col-lg-9" style={paddingPrevisualizacion}>
          {
            <img src={this.state.urlImagenVisualizada} width="250" height="250" style={multipreview} alt="Cargando..." 
            />
          }
        </div> 
      </div>
    )
  }

  renderDescripcion = (cotizacion) => {
    const monto = cotizacion.monto;
    const descripcion = cotizacion.solicitud.repuesto.name;
    const id = cotizacion.id;
    const modelo = cotizacion.solicitud.modelo_auto.name;
    const marca = cotizacion.solicitud.modelo_auto.marca_auto.name;
    const urlPreferencia = cotizacion.preferencia;
    const observacion = cotizacion.observacion;

    return(
      <div className="card">
        <div className="card-body"  style={paddingCard}>
          <h6>Repuesto: {descripcion}</h6>
          <h6>Marca del vehículo: {marca}</h6>
          <h6>Modelo: {modelo}</h6>
          <h5><b>$ {monto}</b></h5>
          <h6>
            Observacion:&nbsp; 
            { observacion == '' ? '-' : observacion }
          </h6>
          <div align="center">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <form action="/procesar-pago" method="POST">
                <a href={urlPreferencia} 
                    className="btn btn-primary btn-block btn-sm"
                    type="button"
                    target="_self">
                  Comprar ahora
                </a>   
                <script
                  src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"
                  data-preference-id={urlPreferencia}>
                </script>
              </form>
            </div>
          </div> 
        </div>
      </div>
    )
  }

  render() {
    const cotizacion = this.props.cotizacion;
    return (
      <div>
        <div className="row">
          <div className="col-12">
            <button type="button" className="btn btn-link" onClick={this.mostrarListado}>Volver al listado</button>
          </div>
        </div>
        <div className="row">
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
      </div>
    );
  }
}

export default MostrarCotizacion;