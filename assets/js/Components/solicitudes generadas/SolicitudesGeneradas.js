import React , { Component } from 'react';

import Loading from '../loading/loading.js';
import {API_BUSCAR_SOLICITUDES,API_OBTENER_FOTO_REPUESTO,API_ULTIMAS_SOLICITUDES} from '../../Constantes/constantes';
import axios from 'axios';
import Tabla from './Tabla.js';
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
                <h5>Solicitudes</h5>
                <p>Listado de las últimas solicitudes que fueron generadas por los usuarios</p>
                <p>Para buscar solicitudes para un tipo de repuesto,marca o modelo debe seleccionar los filtros.</p>
                <hr/>
                <Filtros 
                  token = {this.props.token}
                  getSolicitudes = {this.getSolicitudes}
                  setIsLoading = {this.setIsLoading}
                />
                <hr/>
                <Tabla 
                  misSolicitudes = {this.state.misSolicitudes}
                  token = {this.props.token}
                  setIsLoading = {this.setIsLoading}
                />
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default SolicitudesGeneradas;