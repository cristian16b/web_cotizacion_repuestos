import React , { Component } from 'react';

class BarraSuperior extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
            <a className="navbar-brand" href="#">Demo</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="#">¿Quienes somos?
                    <span className="sr-only"></span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Buscar un repuesto</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Mis cotizaciones</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Mi perfil</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">¿Dudas? ¿Consultas?</a>
                </li>
                </ul>
            </div>
            </div>
        </nav>
    );
  }
}

export default BarraSuperior;