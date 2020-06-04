import React from 'react';
// import ReactDOM from 'react-dom';
import './estilos.js';
import MultipleImageUploadComponent from './subcomponentes/MultipleImageUploadComponent';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import {API_REPUESTOS_FILTER,API_AUTO_MARCA_FILTER,API_AUTO_MODELO_FILTER,API_GUARDAR_SOLICITUD_REPUESTO} from '../../Constantes/constantes';
import axios from 'axios';
import ImageUploading from 'react-images-uploading';

class BuscarRepuesto extends React.Component {

  constructor(props){
    super(props);

    // nota usando this.props.getTokenPadre() me comunico con el componente padre APP
    // que tiene el metodo getToke y esta asociado a gettokenpadre
    // es la forma mas facil que encontre para obtener los datos
    this.state = ({
      token: this.props.getTokenPadre(),
      peticionActiva:false,
      repuestoSeleccionado: '',
      marcaSeleccionado: '',
      modeloSeleccionado: '',
      listadoImagenes: [],
      botonesHabilitados: false,
      errors: {},
      errorApi: '',
      isSignedUp: false, 
      observaciones: '',
    })
    
    this.loadRepuestos = this.loadRepuestos.bind(this);
    this.loadMarcas = this.loadMarcas.bind(this);
    this.loadModelos = this.loadModelos.bind(this);
    this.handleSubmit   = this.handleSubmit.bind(this); 
  }

  isHabilitado = () => { return this.state.botonesHabilitados}

  cambioHabilitado = () => { 
    if(this.state.botonesHabilitados == true) {
      this.setState({
        botonesHabilitados: false
      });
    }
    else {
      this.setState({
        botonesHabilitados: true
      });
    }
    // console.log(this.state.botonesHabilitados);
  }

  // evento change de las fotos subidas
  // onChange = (imageList) => {
  //   // data for submit
  //   console.log(imageList);
  //   this.setState({
  //     listadoImagenes: imageList
  //   })
  // }

  handleSubmit(event) {
    event.preventDefault();
    // this.habilitarBotones();
    // console.log('entra');
    if(this.validarFormulario() == true) {
      this.consumirApiGuardarSolicitud();
    } 
    // console.log('entra y falla');
    this.cambioHabilitado();
  }

  redirectToLogin = () => {
    if (this.state.isSignedUp) {
      // redirect to home if signed up
      return <Redirect to = {{ pathname: "/login" }} />;
    }
  }
  
  validarFormulario = () => {
    let formularioValido = true;
    let errors = {};

    if(this.state.token == '') {
      this.redirectToLogin();
    }

    if(this.state.modeloSeleccionado.length === 0) {
      errors["modeloSeleccionado"] = "Debe seleccionar el modelo de su auto";
      formularioValido = false;
    }

    if(this.state.marcaSeleccionado.length === 0) {
      errors["marcaSeleccionado"] = "Debe seleccionar la marca de su auto";
      formularioValido = false;
    }

    if(this.state.repuestoSeleccionado.length === 0) {
      errors["repuestoSeleccionado"] = "Debe seleccionar el repuesto que necesita";
      formularioValido = false;
    }

    if(this.state.observaciones.length === 0 || this.state.observaciones.length > 100 ) {
      errors["observaciones"] = "Debe agregar una descripción breve. Como minimo 10 caracteres y como maximo 100";
      formularioValido = false;
    }

    if(this.state.listadoImagenes.length === 0) {
      errors["listadoImagenes"] = "Debe cargar al menos una imagen del repuesto que necesita";
      formularioValido = false;
    }

    this.setState({
      errors: errors
    });

    return formularioValido;
  }

  consumirApiGuardarSolicitud(){
    const payload={
      "idMarca":this.state.marcaSeleccionado.value,
      "idModelo":this.state.modeloSeleccionado.value,
      "idRepuesto":this.state.repuestoSeleccionado.value,
      "imagenes":this.state.listadoImagenes,
      "observaciones":this.state.observaciones,
    }
    console.log(payload);
    const config = {
      headers: { Authorization: `Bearer ${this.state.token['token']}` }
    };
    axios.post(API_GUARDAR_SOLICITUD_REPUESTO,config,payload)
        .then(response => {
            let code = response.data.code;
            if(code == 200){
              this.setState({ isSignedUp: true }); // after signing up, set the state to true. This will trigger a re-render
            }
            this.mostrarErroresApi(response);
        })
        .catch(e => {
            alert('Ocurrio un error al consultar al servidor, intente nuevamente');
    });
    event.preventDefault();
  }
  
  mostrarErroresApi = (response) => {
    let mensajes = response.data;
    let errors = {};
    for (const prop in mensajes) {
      // console.log(`obj.${prop} = ${mensajes[prop]}`);
      errors[prop] = mensajes[prop];
    }
    this.setState({
      errors: errors
    });
  }

  mostrarToken = () => {
    console.log('mostramos token ');
    console.log(this.state.token);
  }

  // https://medium.com/@simonhoyos/ciclos-de-vida-de-los-componentes-de-react-e1bf48a5ff73

  componentDidMount() {
    // console.log('didmount');
    // this.mostrarToken();
  }

  consumirApi = (name,url,minimaCantLetras) => {
      // if(name.length > minimaCantLetras && this.state.peticionActiva == true)
      if(name.length > minimaCantLetras) {
        const config = {
          headers: { Authorization: `Bearer ${this.state.token['token']}` }
        };
        // console.log(this.state.token['token']);
        this.setState({peticionActiva: true});
        //seteo peticionActiva true para evitar que se desaten continuas peticiones
        return  axios.get(url,config)
              .then(response => {
                  this.setState({peticionActiva: false});
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
                    // this.setState({errorApi: error});
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
    return this.consumirApi(name,url,2) 
  } 
  
  loadModelos = (name) => { 
    // console.log(this.state.marcaSeleccionado);
    let id = this.state.marcaSeleccionado.value;
    let url = API_AUTO_MODELO_FILTER + `?name=${name}&idMarca=${id}`; 
    return this.consumirApi(name,url,2);
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

  handleChangeObservaciones = (e) => {
    this.setState({ observaciones: e });
    // console.log(`Option selected:`, e);
  }

  renderSelectPrimerFila = () => {
    return (
              <div className="row">
                <div className="col-lg-6">
                  <label forhtml="marca">Marca del auto</label>
                  <AsyncSelect 
                    id="marca"
                    cacheOptions 
                    value = { this.state.marcaSeleccionado }
                    loadOptions = {this.loadMarcas}
                    onChange={this.handleChangeSelectMarca}
                    placeholder={<div>Escriba la marca de su auto</div>}
                    noOptionsMessage= {() => "No se encontraron resultados"}
                  />
                  <span className="text-danger error_negrita">
                    {this.state.errors["marcaSeleccionado"]}
                  </span>
                  {/* fin 1era columna */}
                </div>
                <div className="col-lg-6">
                  <label forhtml="modelo">Modelo</label>
                  <AsyncSelect 
                    id="modelo"
                    cacheOptions 
                    value = { this.state.modeloSeleccionado }
                    loadOptions = {this.loadModelos}
                    onChange={this.handleChangeSelectModelo}
                    placeholder={<div>Escriba el modelo de su auto</div>}
                    noOptionsMessage= {() => "No se encontraron resultados"}
                  />
                  <span className="text-danger error_negrita">
                    {this.state.errors["modeloSeleccionado"]}
                  </span>
                  {/* fin 2da columna */}
                </div>
              </div>
    );
  }

  renderSelectSegundaFila = () => {
    return (
      <div className="row">
        <div className="col-lg-8">
          <label forhtml="repuesto">Tipo repuesto</label>  
          <AsyncSelect 
            id="repuesto"
            cacheOptions 
            value = { this.state.repuestoSeleccionado }
            loadOptions = {this.loadRepuestos}
            onChange={this.handleChangeSelectRepuesto}
            placeholder={<div>Escriba el nombre del respuesto que esta buscando</div>}
            noOptionsMessage= {() => "No se encontraron resultados"}
          />
          <span className="text-danger error_negrita">
            {this.state.errors["repuestoSeleccionado"]}
          </span>
        </div>
      </div>
    );
  }

  keydown = (e) => {
    console.log(e);
  }


  renderObservaciones = () => {
    return(
                    <div className="row">
                      <div className="col-lg-12">
                        <label forhtml="message">Observaciones</label>
                        <textarea onChange={this.handleChangeObservaciones} type="text" id="message" name="message" rows="2" className="form-control md-textarea">
                        </textarea>
                        <span className="text-danger error_negrita">
                          {this.state.errors["observaciones"]}
                        </span>
                      </div>
                    </div>
    );
  }

  renderBotones = () => {
    return (
      <div className="row">
        <div className="col-lg-6">
          <div className="form-group">
            <button type="submit" 
                    className="btn btn-primary btn-block"
                    disabled={this.isHabilitado()}
                    onClick={this.cambioHabilitado}
                    >Enviar Pedido de cotización</button>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <button type="reset" 
                    disabled={this.isHabilitado()}
                    className="btn btn-light btn-block">Cancelar
            </button>
          </div>
        </div>  
      </div> 
    );
  }

  getImagen = (imagenes) => {
    this.setState({listadoImagenes: imagenes});
  }
  
  renderSubidaPrevisualizacionFotos = () => {
    return (
            <div className="row justify-content-center">
              <div className="col-lg-12">
                  <div className="form-group">
                    <p>Debe adjuntar al menos una foto del repuesto solicitado. Como máximo se aceptarán cuatro.</p>
                      <MultipleImageUploadComponent onChangeI={this.getImagen}></MultipleImageUploadComponent>
                      <span className="text-danger error_negrita">
                        {this.state.errors["listadoImagenes"]}
                      </span>
                  </div>
              </div>
            </div>
      );
  }

  // ref: https://gist.github.com/darklilium/183ce1405788f2aef7e8
    render() {
      return (
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card">
              <div className="card-body">
                <h1 className="my-4">Buscar un repuesto</h1>
                <h6>Para solicitar cotizaziones sobre un repuesto debe cargar los siguientes datos</h6>
                  {this.renderSelectPrimerFila()}
                  {this.renderSelectSegundaFila()}
                  {this.renderObservaciones()}
                  {this.renderSubidaPrevisualizacionFotos()}
                    {/* Nota: si el html <form> engloba todos los campos, me genera un error
                        al pulsar sobre <agregar imagen>, se valida el form y no es lo que se espera
                        con esta modificacion funciona correctamente
                    */}
                    <form onSubmit={this.handleSubmit}>
                      {this.renderBotones()}
                    </form>
                {/* FIN CARDBODY */}
              </div>
              {/* FIN CARD */}
            </div>
            {/* fin dela columna */}
          </div>
          {/* fin de la fila */}
        </div>
      );
    }
}

export default BuscarRepuesto;


