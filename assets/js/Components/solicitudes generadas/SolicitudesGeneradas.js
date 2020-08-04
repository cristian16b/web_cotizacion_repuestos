import React , { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-Table';
import Loading from '../loading/loading.js';
import {API_BUSCAR_SOLICITUDES,API_OBTENER_FOTO_REPUESTO,API_ULTIMAS_SOLICITUDES} from '../../Constantes/constantes';
import axios from 'axios';
import {Collapsible} from '../collapsible/Collapsible';
import ModalImage from "react-modal-image";
import Salir from '../salir/salir.js';
import Filtros from './Filtros.js';

class SolicitudesGeneradas extends React.Component {

  constructor(props){
    super(props);
    this.state = ({
      peticionActiva:false,
      repuestoSeleccionado: '',
      marcaSeleccionado: '',
      modeloSeleccionado: '',
      menu: false,
      isMount: false,
      isLoading: true, // inicialmente esta cargando hasta que se monta el componente en componentdidmount()
      misSolicitudes: [],
      repuestoBuscar: '',
      errors:{},
      isLogin: true,
      monto: 0,
      fechaVencimiento: '',
    });

    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  obtenerFechaVencimiento = () => {
    let hoy = new Date();
    hoy.setDate(hoy.getDate()+7);
    let fechaFormateada = this.formatearFecha(hoy.toJSON().slice(0,10));
    this.setState({ fechaVencimiento :  fechaFormateada});
  }

  async componentDidMount() {
    const config = {
      headers: { Authorization: `Bearer ${this.props.token}` }
    };
    try 
    {
      // Load async data from an inexistent endpoint.
      let response = await axios.get(API_ULTIMAS_SOLICITUDES,config);
      this.setState({isLoading: false});
      if(response.data.code == 200) {
        this.obtenerFechaVencimiento();
        console.log(this.state.fechaVencimiento);
        // console.log('code 200')
        this.setState({misSolicitudes: response.data.data});
        // console.log(this.state.misSolicitudes);
      }
    } 
    catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
      // alert('Ocurrio un error inesperado, intente nuevamente mas tarde');
      this.setState({
        isLogin : false
      });
    }
    
    this.setState({
      isMount : true
    });
  }

  componentWillUnmount() {
    this.setState({
      isMount : false
    });
  }

  handleChangeInput = e => {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  // la fecha viene con el formato aaaa/mm/dd t00:00
  // se va a mostrar lo siguiente: dd/mm/aaaa 
  formatearFecha(fecha) {
    return fecha.substr(0,10).split('-').reverse().join('/');
  }

  obtenerFotos() {
    console.log('click');
  }

  armarPrevisualizacionImagen = (recurso) => {
    const url = API_OBTENER_FOTO_REPUESTO + `?fileName=${recurso.nombre_fisico}`;
    return (
            <div className="col-12 col-sm-12 col-md-3 col-lg-3">
                    <ModalImage
                            small={url}
                            large={url}
                            alt=" "
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
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                  <p>Imagenes adjuntadas en la solicitud.Haga click para previsualizar las imagenes</p>
                                </div>
                              </div>
                              <div className="row justify-content-center"> 
                              {
                                recursos.map(e=>{
                                  return this.armarPrevisualizacionImagen(e)
                                })
                              }
                              </div>
                            </Collapsible>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <Collapsible title="Enviar cotización"  className="btn btn-warning">
                              <hr></hr>
                              <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                  <p>Ingrese el monto que sera notificado al solicitante</p>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                                <div className="form-group">
                                  <label htmlFor="monto">Monto</label>
                                  <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                      <input type="text" className="form-control" name="monto" 
                                              defaultValue = {this.state.monto} onChange={this.handleChangeInput}
                                              placeholder="Ej: 200.10" />	
                                  </div>
                                  <span id="monto" className="text-danger error_negrita">
                                    {this.state.errors["monto"]}
                                  </span> 
                                </div>
                                </div>
                              </div>
                              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                              <p>Se informara que la cotización vence el {this.state.fechaVencimiento}</p>
                              </div>
                              <div className="row">
                                  <div className="col-6 col-sm-6 col-md-3 col-lg-2">
                                        <button
                                            type="submit" 
                                            onClick={() => this.enviarCotizacion(elemento.id)}
                                            className="btn btn-primary btn-block">
                                            Enviar
                                        </button>
                                  </div>
                              </div>
                              <hr></hr>
                            </Collapsible>
                        </div>
                      </div>
            </Td>
          </Tr>
    )
  }

  enviarCotizacion = (id) => {
    // console.log()
    console.log(id);
  }

  renderTabla() {
    return (
          <Table className="table table-striped">
            <Thead>
              <Tr>
                <Th>Solicitudes realizadas</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                this.state.misSolicitudes.map(elemento => {
                    return (
                      this.armarFilaTabla(elemento)
                    )              
                  }
                )
              }
           </Tbody>
          </Table>
    );
  }


  getSolicitudes = (solicitudesFiltradas) => {
    this.setState({misSolicitudes: solicitudesFiltradas});
    // console.log(this.state.misSolicitudes);
  }

  setIsLoading = (loading) => {
    this.setState({isLoading: loading})
  }

  render() {
    if(this.state.isLogin == false)
      return <Salir/>
    if(this.state.isLoading == true)
      return  <Loading></Loading>
    return (        
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-12 col-lg-9">
            <div className="card shadow-sm p-3 mb-5 bg-white rounded">
              <div className="card-body">
                <h5>Solicitudes generadas</h5>
                <p>Listado de las últimas solicitudes que fueron generadas por los usuarios</p>
                <p>Para buscar solicitudes para un tipo de repuesto,marca o modelo debe seleccionar los filtros.</p>
                <hr/>
                <Filtros 
                  token = {this.props.token}
                  getSolicitudes = {this.getSolicitudes}
                  setIsLoading = {this.setIsLoading}
                />
                <hr/>
                <>{ this.renderTabla() }</>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default SolicitudesGeneradas;