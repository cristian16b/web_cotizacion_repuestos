import React , { Component } from 'react';
import SubidaArchivos from '../subida Archivos/SubidaArchivos.js';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import {API_PROVINCIA,API_LOCALIDAD} from '../../Constantes/constantes';

class FormularioDatosComerciante extends React.Component {

  constructor(props){
    super(props);

    this.state = ({
        constanciaDni: '',
        constanciaAfip: '',
        calle: '',
        nro: '',
        localidad: '',
        provincia: '',
        errors: {},
    })
  }
  
  renderCalleNro(){
    const {handleChangeInput} = this.props;
    return(
      <div className="row">
        <div className="col-lg-9 col-12 col-md-12">
          <div className="form-group">
            <label htmlFor="calle">Calle</label>
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-user"></i></span>
                  {/* importante los elementos input deben terminar así: <input /> y no <input></input> porque genera error */}
                  <input type="text" className="form-control" name="nombre" 
                                              defaultValue={this.state.calle} onChange={handleChangeInput}
                                              placeholder="Ingrese su calle"/>
              </div>
              <span id="calledHelp" className="text-danger error_negrita">
                {/* {this.props.errors["calle"]} */}
              </span> 
            </div>
          </div>
          {/* fin primer columna */}
          <div className="col-lg-3 col-12 col-md-12">
            <div className="form-group">
            <label htmlFor="nro">Nro.</label>
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-user"></i></span>
                  {/* importante los elementos input deben terminar así: <input /> y no <input></input> porque genera error */}
                  <input type="text" className="form-control" name="nro" 
                                              defaultValue={this.state.nro} onChange={handleChangeInput}
                                              placeholder="Ej: 5746"/>
              </div>
              <span id="calledHelp" className="text-danger error_negrita">
                {/* {this.props.errors["calle"]} */}
              </span> 
            </div>
          </div>
          {/* fin segunda columna */}
      </div>
      // fin de la fila
    );
  }

  handleChangeSelectProvincia = (e) => {
    this.setState({ provincia: e });
    // console.log(`Option selected:`, e);
  }

  handleChangeSelectLocalidad = (e) => {
    this.setState({ localidad: e });
    // console.log(`Option selected:`, e);
  }

  loadProvincia = (name) => {
    let url = API_PROVINCIA + `?name=${name}`; 
    console.log(name);
    console.log(url);
    console.log()
    if(name.length > 4) {
      return this.getData(url)
    }
  }

  async getData(url){
    try 
    {
      // Load async data from an inexistent endpoint.
      const response = await axios.get(url);
      const { data } = await response;
      console.log(data);
      this.setState({peticionActiva: false});
      let lista = data.data.data;
      let options = lista.map(elemento => {    
        return { value:  `${elemento.id}`, label: `${elemento.name}` };
      });
      return options;
    } 
    catch (e) 
    {
      console.log(`😱 Axios request failed: ${e}`);
      this.setState({peticionActiva: false});
      if(e.response)
      {
          let error = '';
          error = e.response.data.message;
          console.log(error);
          // this.setState({errorApi: error});
      }
    }
  }

  loadLocalidad = (name) => {

  }

  renderProvinciaLocalidad = () => {
    return (
              <div className="row">
                <div className="col-lg-6">
                  <label forhtml="provincia">Provincia</label>
                  <AsyncSelect 
                    id="provincia"
                    cacheOptions 
                    value = { this.state.provincia }
                    loadOptions = {this.loadProvincia}
                    onChange={this.handleChangeSelectProvincia}
                    placeholder={<div>Escriba la provincia donde vive</div>}
                    noOptionsMessage= {() => "No se encontraron resultados"}
                  />
                  <span className="text-danger error_negrita">
                    {/* {this.state.errors["marcaSeleccionado"]} */}
                  </span>
                  {/* fin 1era columna */}
                </div>
                <div className="col-lg-6">
                  <label forhtml="localidad">Localidad</label>
                  <AsyncSelect 
                    id="localidad"
                    cacheOptions 
                    value = { this.state.localidad }
                    loadOptions = {this.loadLocalidad}
                    onChange={this.handleChangeSelectLocalidad}
                    placeholder={<div>Escriba la localidad donde vive</div>}
                    noOptionsMessage= {() => "No se encontraron resultados"}
                  />
                  <span className="text-danger error_negrita">
                    {/* {this.state.errors["modeloSeleccionado"]} */}
                  </span>
                  {/* fin 2da columna */}
                </div>
              </div>
    );
  }

  renderArchivos = () => {
    return(
        <div className="row">
          <div className="col-lg-5 col-12 col-md-12">
            <SubidaArchivos nombreBoton="Adjuntar una copia de su inscripción AFIP"></SubidaArchivos>
          </div>
          <hr/>
          <div className="col-lg-5 col-12 col-md-12">
            <SubidaArchivos nombreBoton="Adjuntar una copia de su inscripción AFIP"></SubidaArchivos>
          </div>
        </div>
    );
  }
  
  render() {
    const {handleChangeInput} = this.props;
    return (
      <div className="row">
        <div className="col-lg-11 col-12 col-md-12">
          <>{this.renderCalleNro()}</>
          <>{this.renderProvinciaLocalidad()}</>
          <>{this.renderArchivos()}</>
        </div>
      </div>
    );
  }
}

export default FormularioDatosComerciante;