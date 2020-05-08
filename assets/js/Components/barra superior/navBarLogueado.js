import React from 'react';
import {NavLink, withRouter, Link}  from 'react-router-dom'
class NavbarLogueado extends React.Component {
    
    getNavLinkClass = (path) => {
        return this.props.location.pathname === path ? 'active' : '';
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand"><span className="navbar-brand"></span></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"  data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        {/* 
                            los siguientes elemetos incrustados en los <li> son para que cuando
                            se haga click el menu se cierre

                            data-toggle="collapse" data-target=".navbar-collapse"
                        */}
                        <li data-toggle="collapse" data-target=".navbar-collapse" className={this.getNavLinkClass("/")}>
                            <Link to="/" className="navbar-brand"><span className="nav-link">¿Quienes somos?</span></Link>
                        </li>
                        <li data-toggle="collapse" data-target=".navbar-collapse"  className={this.getNavLinkClass("/repuesto")}>
                            <Link to="/repuesto" className="navbar-brand"><span className="nav-link">Buscar un repuesto</span></Link>
                        </li>
                        {/* nota: react por algun motivo raro (no se cual) no acepta e anidamiento de listas li (una dentro de otra) */}
                        <div className="nav-item dropdown">
                            <li data-toggle="collapse" className="dropdown-toggle" id="navbarDropdownMenuLink"  data-toggle="dropdown" >
                                <Link to="/perfil" className="navbar-brand"><span className="nav-link">Mis datos</span></Link>
                            </li>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li data-toggle="collapse" data-target=".navbar-collapse" className={this.getNavLinkClass("/cotizaciones")}>
                                    <Link to="/cotizaciones" className="navbar-brand"><span className="nav-link">Mis cotizaciones</span></Link>
                                </li>
                                <li data-toggle="collapse" data-target=".navbar-collapse" className={this.getNavLinkClass("/perfil")}>
                                    <Link to="/perfil" className="navbar-brand"><span className="nav-link">Mi perfil</span></Link>
                                </li>
                                <li data-toggle="collapse" data-target=".navbar-collapse" className={this.getNavLinkClass("/salir")}>
                                    <Link to="/salir" className="navbar-brand"><span className="nav-link">Salir</span></Link>
                                </li>
                            </div>
                        </div>
                        {/* <li data-toggle="collapse" data-target=".navbar-collapse" className={this.getNavLinkClass("/login")}>
                            <Link to="/login" className="navbar-brand"><span className="nav-link">Ingresar</span></Link>
                        </li>
                        <li data-toggle="collapse" data-target=".navbar-collapse" className={this.getNavLinkClass("/registrarme")}>
                            <Link to="/registrarme" className="navbar-brand"><span className="nav-link">Registrarme</span></Link>
                        </li> */}
                        <li data-toggle="collapse" data-target=".navbar-collapse" className={this.getNavLinkClass("/contacto")}>
                            <Link to="/contacto" className="navbar-brand"><span className="nav-link">¿Dudas, Consultas?</span></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
};
NavbarLogueado = withRouter(NavbarLogueado);
export default NavbarLogueado;