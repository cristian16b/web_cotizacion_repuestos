import React from 'react';
import './estilos.js';
import MultipleImageUploadComponent from './subcomponentes/MultipleImageUploadComponent';
import AsyncSelect from 'react-select/async';
import {API_REPUESTOS_FILTER,API_AUTO_MARCA_FILTER,API_AUTO_MODELO_FILTER,API_GUARDAR_SOLICITUD_REPUESTO} from '../../Constantes/constantes';
import axios from 'axios';
import Loading from '../loading/loading.js';
import { Redirect } from 'react-router';
import Salir from '../salir/salir.js';

class BuscarRepuesto extends React.Component {

  constructor(props){
    super(props);

    // nota usando this.props.getTokenPadre() me comunico con el componente padre APP
    // que tiene el metodo getToke y esta asociado a gettokenpadre
    // es la forma mas facil que encontre para obtener los datos
    this.state = ({
      peticionActiva:false,
      repuestoSeleccionado: '',
      marcaSeleccionado: '',
      modeloSeleccionado: '',
      listadoImagenes: [],
      errors: {},
      errorApi: '',
      isSignedUp: false, 
      observaciones: '',
      isLoading: false,
      isGuardado: false,
      isLogin: true,
      isMount: false,
    })
    
    this.loadRepuestos = this.loadRepuestos.bind(this);
    this.loadMarcas = this.loadMarcas.bind(this);
    this.loadModelos = this.loadModelos.bind(this);
    this.handleSubmit   = this.handleSubmit.bind(this); 
    this.handleChange = this.handleChange.bind(this);
    this.cancelar = this.cancelar.bind(this);
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
      errors["modeloSeleccionado"] = "Debe seleccionar el modelo de su Vehículo";
      formularioValido = false;
    }

    if(this.state.marcaSeleccionado.length === 0) {
      errors["marcaSeleccionado"] = "Debe seleccionar la marca de su Vehículo";
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
    const config = {
        headers: { 
            Authorization: `Bearer ${this.props.token}`
        }
    };
    // console.log(payload);
    this.setState({isLoading: true});
    axios.post(API_GUARDAR_SOLICITUD_REPUESTO,payload,config)
        .then(response => {
            this.setState({isLoading: false});
            let code = response.data.code;
            if(code == 200 && this.state.isMount == true){
              this.setState({ isGuardado: true }); // after signing up, set the state to true. This will trigger a re-render
            }
            else {
              this.mostrarErroresApi(response);
            }
        })
        .catch(e => {
          // si retorna que el jwt expiro por el tiempo que vuelva al login
          // if(e.code == 401) {
          //   this.redirectToLogin();
          // }
          this.setState({
            isLogin : false
          });
          //alert('Ocurrio un error al consultar al servidor, intente nuevamente');
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
    this.state.isMount = true;
    // console.log('token recibidos');console.log(this.state.token);
  }

  componentWillUnmount() {
    this.state.isMount = false;
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
        // console.log(config);
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
                    this.setState({
                      isLogin : false
                    });
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

  handleChange(event) { 
    this.setState({[event.target.name]: event.target.value}); 
    // console.log([event.target.name])  
  }

  renderSelectPrimerFila = () => {
    return (
              <div className="row">
                <div className="col-lg-6">
                  <label forhtml="marca">Marca del Vehículo</label>
                  <AsyncSelect 
                    id="marca"
                    cacheOptions 
                    value = { this.state.marcaSeleccionado }
                    loadOptions = {this.loadMarcas}
                    onChange={this.handleChangeSelectMarca}
                    placeholder={<div>Escriba la marca de su Vehículo</div>}
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
                    placeholder={<div>Escriba el modelo de su Vehículo</div>}
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

  renderObservaciones = () => {
    return(
                    <div className="row">
                      <div className="col-lg-12">
                        <label forhtml="message">Observaciones (año de su vehículo u otros detalles que considere importantes)</label>
                        <textarea onChange={this.handleChange} type="text" id="observaciones" name="observaciones" rows="2" className="form-control md-textarea">
                        </textarea>
                        <span className="text-danger error_negrita">
                          {this.state.errors["observaciones"]}
                        </span>
                      </div>
                    </div>
    );
  }

  cancelar = () => {
    this.setState({
      peticionActiva:false,
      repuestoSeleccionado: '',
      marcaSeleccionado: '',
      modeloSeleccionado: '',
      listadoImagenes: [],
      errors: {},
      errorApi: '',
      isSignedUp: false, 
      observaciones: '',
      isLoading: false,
      isGuardado: false,
      isLogin: true,
      isMount: false,
    });
  }

  renderBotones = () => {
    return (
      <div className="row">
        <div className="col-lg-6">
          <div className="form-group">
            <button type="submit" 
                    className="btn btn-primary btn-block"
                    onClick={this.handleSubmit}
                    >Enviar Pedido de cotización</button>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <button type="reset" 
                    onClick={this.cancelar}
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
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="form-group">
                    <p>Debe adjuntar al menos una foto del repuesto que usted esta necesitando.</p> 
                    <p><b>Como máximo se aceptarán cuatro y cada archivo no puede exeder los 5 megabytes.</b></p>
                    <p><i>Si el archivo no es cargado, se debe a que no es el formato valido(.jpg o .png) o que su tamaño es mayor al especificado</i></p>
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
    if(this.state.isLogin == false)
      return <Redirect to = {{ pathname: "/login" }} />
    if(this.state.isLoading == true)
      return  <Loading></Loading>
    if(this.state.isGuardado == true)
      return  <Redirect to = {{ pathname: "/cotizaciones" }} />
    else
      return (
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-12 col-lg-9">
            <div className="card  shadow-sm p-3 mb-5 bg-white rounded">
              <div className="card-body">
                <h5 className="my-4">Buscar un repuesto</h5>
                <hr/>
                <h6>Para solicitar cotizaciones sobre un repuesto debe cargar los siguientes datos</h6>
                    {this.renderSelectPrimerFila()}
                    {this.renderSelectSegundaFila()}
                    {this.renderObservaciones()}
                    {this.renderSubidaPrevisualizacionFotos()}
                  <form method="post" onSubmit={this.handleSubmit}>
                    {this.renderBotones()}
                    <hr/>
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


