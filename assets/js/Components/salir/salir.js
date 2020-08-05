import React , { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Salir extends React.Component {
  constructor(props){
    super(props);
    this.props.obtenerToken(false,'','',200);
  }

  render() {
    return <Redirect to = {{ pathname: "/login" }} />;
  }
}

export default Salir;