import React , { Component } from 'react';
import MisCotizaciones from '../mis cotizaciones/misCotizaciones';

const div = {
  height: "100%",
}

const divListado = {
  height: "49%",
  // backgroundColor: "#6A737C",
  margin: "1% 1%",
  paddingTop: "3%",
  paddingBottom: "3%", 
}

const divBotones = {

}

class HomeUsuario extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    // console.log(this.props);
    return (
      <div className="row justify-content-center" style={div}>
        <div className="col-12 col-sm-12 col-md-12 col-lg-11">
          <div className="card shadow-sm p-3 mb-5 bg-white rounded">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-12 col-md-12 col-lg-11">
                <h5>Eisen Part</h5>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12 col-sm-12 col-md-12 col-lg-11">
                {/* <h5>Eisen Part</h5> */}
                {/* <p>Ultimas cotizaciones recibidas recibidas</p> */}
                <MisCotizaciones 
                  token={this.props.token} 
                  rol={this.props.rol}>
                </MisCotizaciones>
              </div>
            </div>
            <div className="row justify-content-center" style={divListado}>
              <div className="col-12 col-sm-12 col-md-12 col-lg-11">
                {/* <h5>Eisen Part</h5> */}
              </div>
            </div>
            <div className="row justify-content-center" style={divListado}>
              <div className="col-12 col-sm-12 col-md-12 col-lg-11">
                {/* <h5>Eisen Part</h5> */}
              </div>
            </div>
          </div>
        </div>
      </div> 
    );
  }
}

export default HomeUsuario;