import React , { Component } from 'react';

class Contacto extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (        
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <h1 className="my-4">Formulario de contacto</h1>
        </div>
      </div>
    );
  }
}

export default Contacto;