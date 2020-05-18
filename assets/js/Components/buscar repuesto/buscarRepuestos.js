import React from 'react';
import ReactDOM from 'react-dom';
// import './buscar repuesto/buscarRepuestos.css';
// no funciona la importacion
// require("../buscar repuesto/buscarRepuestos.css");

// 
const boton_carga_imagen = {
  width: '0px',
  height: '0px',
  overflow: 'hidden'
}

const imagePreview = {
  width: '100%',
  height: '100px',
  backgroundPosition: 'center center',
  background:'url(' + 'http://cliquecities.com/assets/no-image-e3699ae23f866f6cbdf8ba2443ee5c4e.jpg' + ')',
  backgroundColor: '#fff',
  backgroundSize: 'cover',
  backgroundRepeat:'no-repeat',
  display: 'inline-block',
  boxShadow: '0px -3px 6px 2px rgba(0,0,0,0.2)',
}

const imgUp =
{
  marginBottom: '15px',
}
const del = 
{
  position:'absolute',
  top:'0px',
  right:'15px',
  width:'30px',
  height:'30px',
  textAlign:'center',
  lineHeight:'30px',
  backgroundColor:'rgba(255,255,255,0.6)',
  cursor:'pointer',
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
const btnPrimary =
{
  display:'block',
  borderRadius:'0px',
  boxShadow:'0px 4px 6px 2px rgba(0,0,0,0.2)',
  marginTop:'-5px'
}
// 
class BuscarRepuesto extends React.Component {

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
            // <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-6 imgUp">
                {/* <div className="col-lg-12" style={imgUp}> */}
                  <div className="imagePreview" style={imagePreview}>
                  </div>
                    <label className="btn btn-info" style={ btnPrimary }>
                      Agregar foto
                      <input  
                          type="file" 
                          className="uploadFile img"
                          style = {boton_carga_imagen}
                      />
                    </label>
                    <i className="fa fa-plus imgAdd"></i>
                  </div>
                {/* <i className="fa fa-plus imgAdd" style={imgAdd}></i> */}
              </div>
            // </div>
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


