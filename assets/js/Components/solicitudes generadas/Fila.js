import React , { Component } from 'react';
import {  Tr, Td } from 'react-super-responsive-Table';
import {Collapsible} from '../collapsible/Collapsible';
import ModalImage from "react-modal-image";
import {API_OBTENER_FOTO_REPUESTO,API_ENVIAR_COTIZACION} from '../../Constantes/constantes';
import axios from 'axios';

class Fila extends React.Component {

  constructor(props){
    super(props);

    this.state = ({
      errors: '',
      monto: '',
      fechaVencimiento: '',
      notificacionEnviada: false,
      isMount: false,
      botonHabilitado: false,
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

  armarPrevisualizacionImagen = (recurso) => {
    const url = API_OBTENER_FOTO_REPUESTO + `?fileName=${recurso.nombre_fisico}`;
    return (
            <div className="col-12 col-sm-12 col-md-3 col-lg-3">
                    <ModalImage
                            small={url}
                            large={url}
                            alt="Ocurrio un error inesperado y no es posible visualizar la imagen"
                        />
            </div>
    );
  }

  enviarCotizacion = (id) => {
    let patron =  /^[0-9]+([,][0-9]{1,2})?$/;

    if(this.state.monto == '') {
      this.setState({errors: 'Debe completar el monto'});
    }
    else if(patron.test(this.state.monto) == false){
      this.setState({errors: 'Debe ingresar un numero positivo. Ejemplo 1200'});
    }
    else {
      this.setState({errors: ''});
      const payload={
        "idSolicitud":id,
        "monto":this.state.monto,
      }
      const config = {
          headers: { 
              Authorization: `Bearer ${this.props.token}`
          }
      };
      this.setState({botonHabilitado: true});
      axios.post(API_ENVIAR_COTIZACION,payload,config)
        .then(response => {
            let code = response.data.code;
            if(code == 200 && this.state.isMount == true){
              this.setState({notificacionEnviada: true});
              // alert('todo ok,  salida = ' + this.state.notificacionEnviada);        
            }
            else {
              this.setState({errors: response.data.error });
            }
            this.props.setIsLoading(false);
            this.setState({botonHabilitado: false});
        })
        .catch(e => {
          this.props.setIsLoading(false);
          alert('Ocurrio un error al consultar al servidor, intente nuevamente');
        });
    }
  }

  handleChangeInput = e => {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  formatearNroSolicitud = (id) => {
    return id.toString().padStart(5, "0");
  }


  armarFilaTabla(elemento){
    const recursos = elemento.recursos;
    return (
            <Tr key={elemento.id}>
              <Td>
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                          <b>Nro de solicitud: </b> {this.formatearNroSolicitud(elemento.id)} 
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                          <b>Fecha de solicitud: </b> {this.formatearFecha(elemento.fecha_alta)} <b>Auto:</b> {elemento.modelo_auto.marca_auto.name} -  <b>Modelo:</b> {elemento.modelo_auto.name}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                          <b>Repuesto solicitado:</b> {elemento.repuesto.name}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                          <b>Observación:</b> {elemento.observacion}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <Collapsible title="Ver fotos" className="btn btn-secondary">
                              <hr></hr>
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                  <p>Imagenes adjuntadas en la solicitud.</p>
                                </div>
                              </div>
                              <div className="row justify-content-center"> 
                              {
                                recursos.map(e=>{
                                  return this.armarPrevisualizacionImagen(e)
                                })
                              }
                              </div>
                              <p>Haga click en las mismas para previsualizar.</p>
                              <hr></hr>
                            </Collapsible>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12"> 
                          { 
                            this.state.notificacionEnviada == false 
                            ?
                            <Collapsible title="Enviar cotización"  className="btn btn-warning">
                              <hr></hr>
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                  <p>Ingrese el monto que sera notificado al solicitante</p>
                                </div>
                                <div className="col-6 col-sm-4 col-md-4 col-lg-4">
                                <div className="form-group">
                                  <label htmlFor="monto">Monto en pesos</label>
                                  <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                      <input type="number" className="form-control" name="monto" 
                                              defaultValue = {this.state.monto} onChange={this.handleChangeInput}
                                              placeholder="Ej: 200" />	
                                  </div>
                                  <span id="monto" className="text-danger error_negrita">
                                    {this.state.errors}
                                  </span> 
                                </div>
                                </div>
                              </div>
                              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                              <p>Se informara que la cotización vence el {this.props.fechaVencimiento}</p>
                              </div>
                              <div className="row">
                                  <div className="col-6 col-sm-6 col-md-3 col-lg-2">
                                        <button
                                            disabled = {this.state.botonHabilitado}
                                            type="submit" 
                                            onClick={() => this.enviarCotizacion(elemento.id)}
                                            className="btn btn-primary btn-block">
                                            Enviar
                                        </button>
                                  </div>
                              </div>
                              <hr></hr>
                            </Collapsible>
                            : 
                            <b>La cotización por un monto de $ {this.state.monto} fue enviada al usuario.</b>
                          }
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                              <Collapsible title="Cancelar"  className="btn btn-danger">
                                <hr></hr>
                                <p>¿Esta seguro de cancelar el pedido de cotizacion?</p>
                                <button type="button" 
                                        onClick={() => this.enviarCotizacion(elemento.id)} 
                                        class="btn btn-danger">
                                          Cancelar pedido
                                </button>
                                <hr></hr>
                              </Collapsible>
                        </div>
                      </div>
            </Td>
          </Tr>
    )
  }

  render() {
    return (
      <>{this.armarFilaTabla(this.props.elemento)}</>
    );
  }
}

export default Fila;