import React , { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-Table';
import 'react-super-responsive-Table/dist/SuperResponsiveTableStyle.css';
import Loading from '../loading/loading.js';
import {API_MIS_SOLICITUDES,API_OBTENER_FOTO_REPUESTO} from '../../Constantes/constantes';
import axios from 'axios';
import {Collapsible} from './Collapsible';
import ModalImage from "react-modal-image";

class MisCotizaciones extends React.Component {

  constructor(props){
    super(props);
    this.state = ({
      menu: false,
      isMount: false,
      isLoading: true, // inicialmente esta cargando hasta que se monta el componente en componentdidmount()
      misSolicitudes: [],
    });
  }

  async componentDidMount() {
    const config = {
      headers: { Authorization: `Bearer ${this.props.token}` }
    };
    try 
    {
      // Load async data from an inexistent endpoint.
      let response = await axios.get(API_MIS_SOLICITUDES,config);
      this.setState({isLoading: false});
      if(response.data.code == 200) {
        // console.log('code 200')
        this.setState({misSolicitudes: response.data.data});
        // console.log(this.state.misSolicitudes);
      }
    } 
    catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
      alert('Ocurrio un error inesperado, intente nuevamente mas tarde');
    }
    
    this.state.isMount = true;
  }

  componentWillUnmount() {
    this.state.isMount = false;
  }

  renderFilTrosBusqueda() {
    return(
      <div className="row">
        <p>Aca va a estar el filtro de busqueda por nombre del respuesto</p>
      </div>
    );
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
                            <Collapsible title="Ver fotos" className="btn btn-info btn-lg btn-block">
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
                              <Collapsible title="Ver cotizaciones"  className="btn btn-dark btn-lg btn-block">
                                    <div> <p>Aca se va a ver el listado de cotizaciones recibidas...en construcción!</p>
                                    </div>
                              </Collapsible>
                        </div>
                      </div>
            </Td>
          </Tr>
    )
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

  render() {
    if(this.state.isLoading == true)
      return  <Loading></Loading>
    return (        
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-12 col-lg-9">
            <div className="card shadow-sm p-3 mb-5 bg-white rounded">
              <div className="card-body">
                <h3 className="my-4">Mis Cotizaciones</h3>
                <h5>Listado de las últimas solicitudes generadas</h5>
                <>{ this.renderFilTrosBusqueda() }</>
                <>{ this.renderTabla() }</>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default MisCotizaciones;