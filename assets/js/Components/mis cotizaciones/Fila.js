import React , { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-Table';
import {Collapsible} from '../collapsible/Collapsible';
import ModalImage from "react-modal-image";
import {API_OBTENER_FOTO_REPUESTO, API_LISTAR_MIS_COTIZACIONES, API_CANCELAR_SOLICITUD} from '../../Constantes/constantes';
import axios from 'axios';

class Fila extends React.Component {

  constructor(props){
    super(props);

    this.state = ({
      errors: '',
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
                            alt=""
                        />
            </div>
    );
  }

  armarFilaTabla(elemento){
    const recursos = elemento.recursos;
    return (
            <Tr key={elemento.id}>
              <Td>
                <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                          <b>Fecha: </b> {this.formatearFecha(elemento.fecha_alta)} <b>Auto:</b> {elemento.modelo_auto.marca_auto.name} -  <b>Modelo:</b> {elemento.modelo_auto.name}
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
                              <Collapsible title="Ver cotizaciones"  className="btn btn-warning">
                                <hr></hr>
                                <p>Aca se va a ver el listado de cotizaciones recibidas...en construcción!</p>
                                <hr></hr>
                              </Collapsible>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                              <Collapsible title="Cancelar"  className="btn btn-danger">
                                <hr></hr>
                                <p>¿Esta seguro de cancelar el pedido de cotizacion?</p>
                                <button type="button" 
                                        disabled = {this.state.botonHabilitado}
                                        onClick={() => this.cancelarSolicitud(elemento.id)} 
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
      let url = API_LISTAR_MIS_COTIZACIONES + `${id}`;
      let response = await axios.get(url,config);

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