import React , { Component } from 'react';
import AsyncSelect from 'react-select/async';
import {API_BUSCAR_SOLICITUDES,API_REPUESTOS_FILTER,API_AUTO_MODELO_FILTER,API_AUTO_MARCA_FILTER,API_ULTIMAS_SOLICITUDES} from '../../Constantes/constantes';
import axios from 'axios';
import Loading from '../loading/loading.js';


class Filtros extends React.Component {

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
    });

    this.reiniciar = this.reiniciar.bind(this);
    this.loadRepuestos = this.loadRepuestos.bind(this);
    this.loadMarcas = this.loadMarcas.bind(this);
    this.loadModelos = this.loadModelos.bind(this);
  }

  componentDidMount() {
    this.setState({
      isMount : true
    });
  }

  componentWillUnmount() {
    this.setState({
      isMount : false
    });
  }

  renderFilTrosBusqueda() {
    return(
      <>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <span id="buscar" className="text-danger error_negrita">
                    {this.state.errors["buscar"]}
                  </span> 
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                  <label forhtml="marca">Marca del Vehículo</label>
                  <AsyncSelect 
                    id="marca"
                    cacheOptions 
                    value = { this.state.marcaSeleccionado }
                    loadOptions = {this.loadMarcas}
                    onChange={this.handleChangeSelectMarca}
                    placeholder={<div>Escriba la marca del Vehículo</div>}
                    noOptionsMessage= {() => "No se encontraron resultados"}
                  />
                  <span className="text-danger error_negrita">
                    {this.state.errors["marcaSeleccionado"]}
                  </span>
                  {/* fin 1era columna */}
            </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                  <label forhtml="modelo">Modelo</label>
                  <AsyncSelect 
                    id="modelo"
                    cacheOptions 
                    value = { this.state.modeloSeleccionado }
                    loadOptions = {this.loadModelos}
                    onChange={this.handleChangeSelectModelo}
                    placeholder={<div>Escriba el modelo del Vehículo</div>}
                    noOptionsMessage= {() => "No se encontraron resultados"}
                  />
                  <span className="text-danger error_negrita">
                    {this.state.errors["modeloSeleccionado"]}
                  </span>
                  {/* fin 2da columna */}
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                  <label forhtml="repuesto">Tipo repuesto</label>  
                  <AsyncSelect 
                    id="repuesto"
                    cacheOptions 
                    value = { this.state.repuestoSeleccionado }
                    loadOptions = {this.loadRepuestos}
                    onChange={this.handleChangeSelectRepuesto}
                    placeholder={<div>Escriba el nombre del respuesto</div>}
                    noOptionsMessage= {() => "No se encontraron resultados"}
                  />
                  <span className="text-danger error_negrita">
                    {this.state.errors["repuestoSeleccionado"]}
                  </span>
                </div>
          </div>
          <br></br>
          <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <button type="submit" onClick={this.buscarRepuestoSolicitado}
                  className="btn btn-primary btn-block">Buscar
                </button>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
              <button 
                onClick={this.reiniciar}
                className="btn btn-light btn-block">Actualizar listado</button>
          </div>
        </div>
      </>
    );
  }


  buscarRepuestoSolicitado = e => {
    const config = {
      headers: { Authorization: `Bearer ${this.props.token}` }
    };
    if(this.state.repuestoSeleccionado == '' && this.state.modeloSeleccionado == '' && this.state.marcaSeleccionado == '') {
      let error = {};
      error["buscar"] = "Debes seleccionar al menos uno de los filtros";
      this.setState({errors: error});
    }
    else {
      this.setState({errors: {}});
      this.props.setIsLoading(true);
      let url = API_BUSCAR_SOLICITUDES + `?repuesto=${this.state.repuestoSeleccionado.value}&marca=${this.state.marcaSeleccionado.value}&modelo=${this.state.modeloSeleccionado.value}`;
      this.getData(url,config);
    }
  }

  reiniciar = (e) => {
    const config = {
      headers: { Authorization: `Bearer ${this.props.token}` }
    };
    this.props.setIsLoading(true);
    this.setState({repuestoBuscar: ''});
    this.setState({errors: {}});
    this.setState({repuestoSeleccionado: ''});
    this.setState({modeloSeleccionado: ''});
    this.setState({marcaSeleccionado: ''});
    let url = API_ULTIMAS_SOLICITUDES;
    this.getData(url,config);
  }

  consumirApi = (name,url,minimaCantLetras) => {
    // revisar evento onkey
    // if(name.length > minimaCantLetras && this.state.peticionActiva == true)
    if(name.length > minimaCantLetras) {
      const config = {
        headers: { 
          Authorization: `Bearer ${this.props.token}`
        }
      };
      //seteo peticionActiva true para evitar que se desaten continuas peticiones
      return  axios.get(url,config)
            .then(response => {
                this.setState({peticionActiva: false});
                this.props.setIsLoading(false);
                let lista = response.data.data;
                let options = lista.map(elemento => {    
                  return { value:  `${elemento.id}`, label: `${elemento.name}` };
                });
                return options;
            })
            .catch(e => {
              this.setState({peticionActiva: false});
              if(e.response)
              {
                  let error = '';
                  error = e.response.data.message;
                  console.log(error);
                  this.props.setIsLoading(false);
              }
            });
    }
  }

  loadRepuestos = (name) => { 
    let url = API_REPUESTOS_FILTER + `?name=${name}`; 
    return this.consumirApi(name,url,3) 
  }

  loadMarcas = (name) => { 
    let url = API_AUTO_MARCA_FILTER + `?name=${name}`; 
    return this.consumirApi(name,url,1) 
  } 

  loadModelos = (name) => { 
    // console.log(this.state.marcaSeleccionado);
    let id = this.state.marcaSeleccionado.value;
    let url = API_AUTO_MODELO_FILTER + `?name=${name}&idMarca=${id}`; 
    return this.consumirApi(name,url,1);
  }


  handleChangeSelectRepuesto = (e) => {
    this.setState({ repuestoSeleccionado: e });
    // console.log(`Option selected:`, e);
  }

  handleChangeSelectMarca = (e) => {
    this.setState({ marcaSeleccionado: e });
    // console.log(`Option selected:`, e);
  }

  handleChangeSelectModelo = (e) => {
    this.setState({ modeloSeleccionado: e });
    // console.log(`Option selected:`, e);
  }

  async getData(url,headers){
    try 
    {
      // Load async data from an inexistent endpoint.
      const response = await axios.get(url,headers);
      const { data } = await response;
  
      let code = response.data.code;
      if(code == 200){
        // this.setState({misSolicitudes: response.data.data});
        this.props.getSolicitudes(response.data.data);
      }
      this.props.setIsLoading(false);
    } 
    catch (e) 
    {
      console.log(`😱 Axios request failed: ${e}`);
      this.setState({isLoading: false});
      // alert('Ocurrio un error inesperado, intente nuevamente mas tarde!');
      this.props.setIsLoading(false);
    }
  }
  

  render() {
    return (
      <>{ this.renderFilTrosBusqueda() }</>
    );
  }
}

export default Filtros;