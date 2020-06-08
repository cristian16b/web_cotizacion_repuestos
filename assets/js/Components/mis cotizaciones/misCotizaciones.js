import React , { Component } from 'react';

class MisCotizaciones extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (        
      <div className="row justify-content-center shadow-sm p-3 mb-5 bg-white rounded">
        <div className="col-12 col-sm-12 col-md-12 col-lg-9">
          <h1 className="my-4">Mis Cotizaciones</h1>
        </div>
      </div>
    );
  }
}

export default MisCotizaciones;