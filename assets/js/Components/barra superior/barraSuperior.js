import React , { Component } from 'react';

class BarraSuperior extends React.Component {

  constructor(props){
    super(props);
  }
  
  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Demo</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="./">¿Quienes somos?<span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="./repuesto">Buscar un repuesto</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="./cotizaciones">Mis cotizaciones</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="./perfil">Mi perfil</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="./registrarme">Registrarme</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="./contacto">¿Dudas? ¿Consultas?</a>
                </li>
                </ul>
            </div>
            </nav>
    );
  }
}

export default BarraSuperior;