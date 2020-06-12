import React , { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-Table';
import 'react-super-responsive-Table/dist/SuperResponsiveTableStyle.css';
import Loading from '../loading/loading.js';
import {API_MIS_SOLICITUDES} from '../../Constantes/constantes';
import axios from 'axios';

class MisCotizaciones extends React.Component {

  constructor(props){
    super(props);
    this.state = ({
      menu: false,
      token: this.props.getTokenPadre(),
      isMount: false,
      isLoading: true, // inicialmente esta cargando hasta que se monta el componente en componentdidmount()
      misSolicitudes: [],
    });
  }

  async componentDidMount() {
    const config = {
      headers: { Authorization: `Bearer ${this.state.token['token']}` }
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

  armarFilaTabla(elemento){
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
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button" className="btn btn-info"
                                  data-target="#accordion" aria-expanded="false" aria-controls="collapseExample">
                            Ver fotos
                          </button>
                          <button type="button" className="btn btn-dark"
                                  data-target="#accordion" aria-expanded="false" aria-controls="collapseExample">
                            Ver cotizaciones
                          </button>
                        </div>
                        
                        </div>
                </div>
            </Td>
          </Tr>
    )
  }

  renderTabla() {
    const show = (this.state.menu) ? "show" : "" ;
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
        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <div className="card shadow-sm p-3 mb-5 bg-white rounded">
              <div className="card-body">
                <h1 className="my-4">Mis Cotizaciones</h1>
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