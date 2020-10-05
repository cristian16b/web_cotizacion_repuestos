import React , { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-Table';
import {Collapsible} from '../collapsible/Collapsible';
import ModalImage from "react-modal-image";
import {API_OBTENER_FOTO_REPUESTO, API_OBTENER_FOTO_COTIZACION, API_CANCELAR_SOLICITUD,API_MERCADO_PAGO_MOSTRAR_BOTON_PAGO} from '../../Constantes/constantes';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

class Fila extends React.Component {

  constructor(props){
    super(props);

    this.state = ({
      errors: '',
      isMount: false,
      botonHabilitado: false,
      misCotizaciones: [],
    });
  }

  componentDidMount() {
    this.setState({isMount: true});
  }

  componentWillUnmount() {
    this.setState({isMount: false})
  }

     // la fecha viene con el formato aaaa/mm/dd t00:00
  // se va a mostrar lo siguiente: dd/mm/aaaa 
  formatearFecha(fecha) {
    return fecha.substr(0,10).split('-').reverse().join('/');
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

  formatearNroSolicitud = (id) => {
    return id.toString().padStart(5, "0");
  }
  
  armarFilaTabla(elemento){
    const recursos = elemento.recursos;
    return (
          //   <Tr key={elemento.id}>
          //     <Td>
          //             <div className="row">
          //               <div className="col-12 col-sm-12 col-md-12 col-lg-12">
          //                 <b>Nro de solicitud: </b> {this.formatearNroSolicitud(elemento.id)} 
          //               </div>
          //             </div>
          //       <div className="row">
          //               <div className="col-12 col-sm-12 col-md-12 col-lg-12">
          //                 <b>Fecha: </b> {this.formatearFecha(elemento.fecha_alta)} <b>Auto:</b> {elemento.modelo_auto.marca_auto.name} -  <b>Modelo:</b> {elemento.modelo_auto.name}
          //               </div>
          //             </div>
          //             <div className="row">
          //               <div className="col-12 col-sm-12 col-md-12 col-lg-12">
          //                 <b>Repuesto solicitado:</b> {elemento.repuesto.name}
          //               </div>
          //             </div>
          //             <div className="row">
          //               <div className="col-12 col-sm-12 col-md-12 col-lg-12">
          //                 <b>Observación:</b> {elemento.observacion}
          //               </div>
          //             </div>
          //             <div className="row">
          //               <div className="col-12 col-sm-12 col-md-12 col-lg-12">
          //                   <Collapsible title="Ver fotos" className="btn btn-secondary">
          //                     <hr></hr>
          //                     <div className="row">
          //                       <div className="col-12 col-sm-12 col-md-12 col-lg-12">
          //                         <p>Imagenes adjuntadas en la solicitud.</p>
          //                       </div>
          //                     </div>
          //                     <div className="row justify-content-center"> 
          //                     {
          //                       recursos.map(e=>{
          //                         return this.armarPrevisualizacionImagen(e,API_OBTENER_FOTO_REPUESTO)
          //                       })
          //                     }
          //                     </div>
          //                     <p>Haga click en las mismas para previsualizar.</p>
          //                     <hr></hr>
          //                   </Collapsible>
          //               </div>
          //             </div>
          //             <div className="row">
          //               <div 
          //                 className="col-12 col-sm-12 col-md-12 col-lg-12">
          //                     <Collapsible 
          //                       title="Ver cotizaciones"  
          //                       className="btn btn-warning"                       
          //                     >
          //                     {/*
          //                         <div className="row" align="center">
          //                           <div className="col-12 col-sm-12 col-md-12 col-lg-12">
          //                             <button type="button" 
          //                               disabled = {this.state.botonHabilitado}
          //                               // onClick={() => this.cancelarSolicitud(elemento.id)} 
          //                               className="btn btn-secondary">
          //                                 Actualizar listado
          //                             </button>              
          //                           </div>    
          //                         </div>
          //                       */}
          //                       <hr></hr> 
          //                       {
          //                         elemento.cotizaciones.length == 0 
          //                         ?
          //                         <b>No se encontraron cotizaciones para este pedido</b>
          //                         :
          //                         <>
          //                           {this.renderCotizacionesRecibidas(elemento.cotizaciones)}
          //                         </>
          //                       }
          //                       <hr></hr>
          //                     </Collapsible>
          //               </div>
          //             </div>
          //             <div className="row">
          //               <div className="col-12 col-sm-12 col-md-12 col-lg-12">
          //                     <Collapsible title="Cancelar"  className="btn btn-danger">
          //                       <hr></hr>
          //                       <p>¿Esta seguro de cancelar el pedido de cotizacion?</p>
          //                       <button type="button" 
          //                               disabled = {this.state.botonHabilitado}
          //                               onClick={() => this.cancelarSolicitud(elemento.id)} 
          //                               class="btn btn-danger">
          //                                 Cancelar pedido
          //                       </button>
          //                       <hr></hr>
          //                     </Collapsible>
          //               </div>
          //             </div>
          //   </Td>
          // </Tr>
          <div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              {this.formatearFecha(elemento.fecha_alta)}  - {elemento.repuesto.name} para {elemento.modelo_auto.marca_auto.name}  {elemento.modelo_auto.name}
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                {
                  elemento.cotizaciones.length == 0 
                  ?
                  <b>No se encontraron cotizaciones para este pedido</b>
                  :
                  <Carousel>
                    {this.renderCotizacionesRecibidas(elemento.cotizaciones)}
                  </Carousel>
                }
              </div>
            </div>
          </div>
    )
  }

  renderCotizacionesRecibidas = (cotizaciones) => {
    return (
      cotizaciones.map(elemento => {
        if(elemento.fecha_baja == null)
        {
          return ( 
              <Carousel.Item>
                <>
                  <hr></hr>
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                      <b>Monto informado por el vendedor: $ {elemento.monto}</b> <br></br>
                      <i>Fecha limite del presupuesto: {this.formatearFecha(elemento.fecha_limite_validez)}</i>
                    </div>        
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <p>Observaciones:&nbsp;
                          {
                            elemento.observacion == undefined
                            ?
                            <>-</>
                            :
                            <>{elemento.observacion}</>
                          }
                        </p>
                    </div>
                  </div>
                    {
                      this.renderImagenesAdjuntadasCotizacion(elemento.recurso_cotizacions)
                    }
                  <div className="row">
                      <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <br/>
                          <b>Importante</b>
                        <br/>
                        <p>
                          El único medio de pago habilitado actualmente es con MercadoPago.
                          Para adquirir el repuesto, sera dirigido a mercado pago para completar la operación.
                        </p> 
                        <p>
                          Una vez completada, le informaremos los datos de contacto (teléfono y domicilio) del vendedor para que pueda retirar su repuesto.
                        </p>
                      </div>
                    </div>
                    <div align="right">
                      <div className="col-12 col-sm-6 col-md-4 col-lg-4">
                        <form action="/procesar-pago" method="POST">
                          {/* <a href={'https://www.mercadopago.com.ar/checkout/v1/modal/?preference-id=' + elemento.preferencia } 
                            className="btn btn-primary btn-block"
                            target="_self">
                              PAGAR!
                          </a>    */}
                          <a href={elemento.preferencia } 
                            className="btn btn-primary btn-block"
                            target="_self">
                              PAGAR!
                          </a>   
                          <script
                            src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"
                            data-preference-id={elemento.preferencia}>
                          </script>
                        </form>
                      </div>
                    </div>
                </>
              </Carousel.Item>
            )
          }
        }
      ) 
    )
  }

  renderImagenesAdjuntadasCotizacion = (elemento) => {
    if(elemento.length == 0)
      return (
        <div className="row"> 
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <i>El vendedor no ha adjuntado imagenes para este presupuesto.</i>
          </div>
        </div>
      );
    return (
      <div className="row"> 
        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
          {
              elemento.map(e => {
                  return this.armarPrevisualizacionImagen(e,API_OBTENER_FOTO_COTIZACION)
              })
          }
        </div>
        <hr></hr>
      </div>
    );    
  }

  cancelarSolicitud = async(id) => {

    const config = {
      headers: { Authorization: `Bearer ${this.props.token}` }
    };
    if(id == "") {
      alert('fallo');
      return;
    }
    try 
    {
      this.setState({botonHabilitado: true});
      // Load async data from an inexistent endpoint.
      let url = API_CANCELAR_SOLICITUD + `${id}`;
      let response = await axios.delete(url,config);

      this.setState({isLoading: false});
      if(response.data.code == 200 && this.state.isMount == true) {
        this.props.reiniciar();
      }
      this.setState({botonHabilitado: false});
    } 
    catch (e) {
      this.setState({botonHabilitado: false});
      console.log(`😱 Axios request failed: ${e}`);
      // alert('Ocurrio un error inesperado, intente nuevamente mas tarde');
      this.setState({
        isLogin : false
      });
    }
  } 

  render() {
    return (
      <>{this.armarFilaTabla(this.props.elemento)}</>
    );
  }
}

export default Fila;