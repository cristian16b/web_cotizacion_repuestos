import React from 'react';
import {NavLink, withRouter}  from 'react-router-dom'
class Navbar extends React.Component {
    getNavLinkClass = (path) => {
        return this.props.location.pathname === path ? 'active' : '';
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
                    <a className="nav-link" href="/">¿Quienes somos?<span className="sr-only">(current)</span></a>
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


            // <nav className="navbar navbar-inverse" >
            //     <div className="container-fluid">
            //         <div className="navbar-header">
            //             <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            //                 <span className="sr-only">Toggle navigation</span>
            //                 <span className="icon-bar"></span>
            //                 <span className="icon-bar"></span>
            //                 <span className="icon-bar"></span>
            //             </button>
            //             <a className="navbar-brand" href="./repuesto">Al trote</a>
            //         </div>
            //         <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            //             <ul className="nav navbar-nav navbar-right">
            //                <li className={this.getNavLinkClass("/")}><NavLink to="/" >Listar</NavLink></li>
            //                <li className={this.getNavLinkClass("/repuesto")}><NavLink to="/repuesto">Agregar</NavLink></li>
            //             </ul>
            //         </div>
            //     </div>
            // </nav>
        )
    }
};
Navbar = withRouter(Navbar);
export default Navbar;