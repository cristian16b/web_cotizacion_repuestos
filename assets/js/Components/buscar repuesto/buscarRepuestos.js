import React from 'react';
import ReactDOM from 'react-dom';
import './estilos.js';
import MultipleImageUploadComponent from './MultipleImageUploadComponent';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import {API_REPUESTOS_FILTER} from '../../Constantes/constantes';
import axios from 'axios';

class BuscarRepuesto extends React.Component {

  constructor(props){
    super(props);

    // nota usando this.props.getTokenPadre() me comunico con el componente padre APP
    // que tiene el metodo getToke y esta asociado a gettokenpadre
    // es la forma mas facil que encontre para obtener los datos
    this.state = ({
      'token': this.props.getTokenPadre(),
      'peticionActiva':false
    })
    
    // this.mostrarToken();
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

  promiseOptionsRepuestos = name =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(this.filterRepuestos(name));
    }, 2000);
  });

  filterRepuestos = (name) => {
      // console.log(inputValue);
      if(name.length > 3 && this.state.peticionActiva !== true) {
        let url = API_REPUESTOS_FILTER;

        this.consumirAxios(url,name);
      }
  }

  consumirAxios = (urlBase,name) => {
    const config = {
      headers: { Authorization: `Bearer ${this.state.token['token']}` }
    };

    const bodyParameters = {
      name: name
    };
    let url = urlBase + `?name=${name}`;
    // console.log(this.state.token['token']);
    this.setState({peticionActiva: true});
    //seteo peticionActiva true para evitar que se desaten continuas peticiones
      axios.get(url,config)
        .then(response => {
            this.setState({peticionActiva: false});
            console.log(response.data.data);
            return response.data.data;
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
      

  renderSelect = () => {
    return (
            <div className="row">
              <div className="col-lg-4">
                {/* <AsyncSelect cacheOptions defaultOptions loadOptions={this.promiseOptionsMarcaAuto} /> */}
                {/* fin 1era columna */}
              </div>
              <div className="col-lg-4">
                
                {/* fin 2da columna */}
              </div>
              <div className="col-lg-4">  
                <AsyncSelect label="Ingrese el repuesto que necesita" cacheOptions defaultOptions loadOptions={this.promiseOptionsRepuestos} />
                {/* fin 3era columna */}
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
            <div className="row">
              <div className="col-lg-12 col-md-8">
                <div className="card">
                  <div className="card-body">
                    <p>Debe adjuntar al menos una foto del repuesto solicitado. Como máximo se aceptarán cuatro.</p>
                    {/* <MultipleImageUploadComponent /> */}
                  </div>
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
                <>{this.renderSelect()}</>
                <>{this.renderObservaciones()}</>
                <>{this.renderSubidaPrevisualizacionFotos()}</>
                <>{this.renderBotones()}</>
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


