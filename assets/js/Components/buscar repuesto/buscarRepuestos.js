import React from 'react';
// import ReactDOM from 'react-dom';
import './estilos.js';
// import MultipleImageUploadComponent from './MultipleImageUploadComponent';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import {API_REPUESTOS_FILTER,API_AUTO_MARCA_FILTER,API_AUTO_MODELO_FILTER} from '../../Constantes/constantes';
import axios from 'axios';
import ImageUploading from 'react-images-uploading';

const maxNumber = 4;
const maxMbFileSize = 5 * 1024 * 1024; // 5Mb

const multipreview = {
    maxWidth: "300px",
    width: '90%',
    height: '90%',
    backgroundPosition: 'center center',
    background:'url(' + 'http://cliquecities.com/assets/no-image-e3699ae23f866f6cbdf8ba2443ee5c4e.jpg' + ')',
    backgroundColor: '#fff',
    backgroundSize: 'cover',
    backgroundRepeat:'no-repeat',
    display: 'inline-block',
    boxShadow: '0px -3px 6px 2px rgba(0,0,0,0.2)',
}

const imgAdd = 
{
  width:'30px',
  height:'30px',
  borderRadius:'50%',
  backgroundColor:'#4bd7ef',
  color:'#fff',
  boxShadow:'0px 0px 2px 1px rgba(0,0,0,0.2)',
  textAlign:'center',
  lineHeight:'30px',
  marginTop:'0px',
  cursor:'pointer',
  fontSize:'15px'
}

class BuscarRepuesto extends React.Component {

  constructor(props){
    super(props);

    // nota usando this.props.getTokenPadre() me comunico con el componente padre APP
    // que tiene el metodo getToke y esta asociado a gettokenpadre
    // es la forma mas facil que encontre para obtener los datos
    this.state = ({
      'token': this.props.getTokenPadre(),
      'peticionActiva':false,
      'repuestoSeleccionado': '',
      'marcaSeleccionado': '',
      'modeloSeleccionado': '',
      'listadoImagenes': [],
    })
    
    this.loadRepuestos = this.loadRepuestos.bind(this);
  }

  // evento change de las fotos subidas
  onChange = (imageList) => {
    // data for submit
    console.log(imageList);
    this.setState({
      listadoImagenes: imageList
    })
  };

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
      if(name.length > minimaCantLetras && this.state.peticionActiva !== true) {
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
        </div>
      </div>
    );
  }

  renderObservaciones = () => {
    return(
                    <div className="row">
                      <div className="col-lg-12">
                        <label forhtml="message">Observaciones</label>
                        <textarea type="text" id="message" name="message" rows="2" className="form-control md-textarea">
                        </textarea>
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
                    >Enviar</button>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <button type="reset" 
                    // disabled={this.state.botonesHabilitados}
                    className="btn btn-light btn-block">Cancelar</button>
          </div>
        </div>  
      </div> 
    );
  }

// {/* <br><div class="container">
//   <div class="row">
//   <div class="col-sm-2 imgUp">
//     <div class="imagePreview"></div>
// <label class="btn btn-primary">
// 										    			Upload<input type="file" class="uploadFile img" value="Upload Photo" style="width: 0px;height: 0px;overflow: hidden;">
// 				</label>
//   </div><!-- col-2 -->
//   <i class="fa fa-plus imgAdd"></i>
//  </div><!-- row -->
// </div><!-- container --></div> */}

  renderSubidaPrevisualizacionFotos = () => {
    return (
            <div className="row justify-content-center">
              <div className="col-lg-12">
                  <div className="form-group">
                    <p>Debe adjuntar al menos una foto del repuesto solicitado. Como máximo se aceptarán cuatro.</p>
                      <ImageUploading
                          onChange={this.onChange}
                          maxNumber={maxNumber}
                          multiple
                          maxFileSize={maxMbFileSize}
                          acceptType={["jpg", "gif", "png"]}
                      >
                          {({ imageList, onImageUpload, onImageRemoveAll }) => (
                          // write your building UI
                              <div>
                                  <div className="row">
                                      <div className="col-lg-12">
                                          <button className="btn btn-danger" onClick={onImageUpload}>Agregar</button>
                                          <button className="btn btn-secondary" onClick={onImageRemoveAll}>Borrar todas</button>
                                      </div>
                                  </div>
                                  
                                  <div className="row">
                                      <div className="col-lg-12">
                                          {imageList.map((image) => (
                                              <div key={image.key}>
                                                  <img src={image.dataURL} style={multipreview} alt="Ocurrio un problema al previsualizar..." />
                                                  {/* <button style={boton_carga_imagen} onClick={image.onUpdate}>Update</button> */}
                                                  <button className="btn btn-warning" onClick={image.onRemove}>Eliminar</button>
                                              </div>
                                          ))}
                                      </div>
                                  </div>
                              </div>
                          )}
                      </ImageUploading>
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
                  {this.renderBotones()}
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


