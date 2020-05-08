import React , { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link, useHistory } from "react-router-dom";


class Salir extends React.Component {
  constructor(props){
    super(props);
    this.props.obtenerTokenPadre(false,'');
  }

  render() {
    return null;
  }
}

export default Salir;