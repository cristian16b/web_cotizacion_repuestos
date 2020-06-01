import React from 'react';
import ReactDOM from 'react-dom';
import './estilos.js';
// no funciona la importacion
// require("../buscar repuesto/buscarRepuestos.css");
import MultipleImageUploadComponent from './MultipleImageUploadComponent';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

// 

// 
class BuscarRepuesto extends React.Component {

  constructor(props){
    super(props);

    // nota usando this.props.getTokenPadre() me comunico con el componente padre APP
    // que tiene el metodo getToke y esta asociado a gettokenpadre
    // es la forma mas facil que encontre para obtener los datos
    this.state = ({
      'token': this.props.getTokenPadre()
    })
    
    // this.mostrarToken();
  }

  mostrarToken = () => {
    console.log('mostramos token ');
    console.log(this.state.token);
  }

  // https://medium.com/@simonhoyos/ciclos-de-vida-de-los-componentes-de-react-e1bf48a5ff73

  componentDidMount() {
    console.log('didmount');
    this.mostrarToken();
  }

  renderSelect = () => {
    return (
            <div className="row">
              <div className="col-lg-4">
                <select className="browser-default custom-select">
                  <option defaultValue>Seleccione la marca</option>
                  <option value="1">Bmw</option>
                  <option value="2">Audi</option>
                  <option value="3">Ejemplo</option>
                </select>
                {/* fin 1era columna */}
              </div>
              <div className="col-lg-4">
                <select className="browser-default custom-select">
                  <option defaultValue>Seleccione el modelo</option>
                  <option value="1">2020</option>
                  <option value="2">Uno xx</option>
                  <option value="3">Ejemplo modelo</option>
                </select>
                {/* fin 2da columna */}
              </div>
              <div className="col-lg-4">  
                <select className="browser-default custom-select">
                  <option defaultValue>Seleccione tipo de repuesto</option>
                  <option value="1">Bujia</option>
                  <option value="2">Correa</option>
                  <option value="3">Bateria</option>
                </select>
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


