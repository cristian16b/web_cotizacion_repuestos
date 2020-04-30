import React from 'react';
import {NavLink, withRouter, Link}  from 'react-router-dom'
class Navbar extends React.Component {
    
    getNavLinkClass = (path) => {
        return this.props.location.pathname === path ? 'active' : '';
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/" className="navbar-brand"><span className="navbar-brand">Demo</span></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className={this.getNavLinkClass("/")}>
                            <Link to="/" className="navbar-brand">¿Quienes somos?</Link>
                        </li>
                        <li className={this.getNavLinkClass("/repuesto")}>
                            <Link to="/repuesto" className="navbar-brand">Buscar un repuesto</Link>
                        </li>
                        <li className={this.getNavLinkClass("/cotizaciones")}>
                            <Link to="/cotizaciones" className="navbar-brand">Mis cotizaciones</Link>
                        </li>
                        <li className={this.getNavLinkClass("/perfil")}>
                            <Link to="/perfil" className="navbar-brand">Mi perfil</Link>
                        </li>
                        <li className={this.getNavLinkClass("/registrarme")}>
                            <Link to="/registrarme" className="navbar-brand">Registrarme</Link>
                        </li>
                        <li className={this.getNavLinkClass("/contacto")}>
                            <Link to="/contacto" className="navbar-brand">¿Dudas, Consultas?</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
};
Navbar = withRouter(Navbar);
export default Navbar;