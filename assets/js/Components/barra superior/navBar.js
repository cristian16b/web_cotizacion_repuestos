import React from 'react';
import {NavLink, withRouter, Link}  from 'react-router-dom'
class Navbar extends React.Component {
    
    getNavLinkClass = (path) => {
        return this.props.location.pathname === path ? 'active' : '';
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand"><span className="navbar-brand"></span></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className={this.getNavLinkClass("/")}>
                            <Link to="/" className="navbar-brand"><span className="nav-link">¿Quienes somos?</span></Link>
                        </li>
                        <li className={this.getNavLinkClass("/repuesto")}>
                            <Link to="/repuesto" className="navbar-brand"><span className="nav-link">Buscar un repuesto</span></Link>
                        </li>
                        <li className="nav-item dropdown">
                            <li className="dropdown-toggle" id="navbarDropdownMenuLink"  data-toggle="dropdown" >
                                <Link to="/" className="navbar-brand"><span className="nav-link">Mis datos</span></Link>
                            </li>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li className={this.getNavLinkClass("/cotizaciones")}>
                                    <Link to="/cotizaciones" className="navbar-brand"><span className="nav-link">Mis cotizaciones</span></Link>
                                </li>
                                <li className={this.getNavLinkClass("/perfil")}>
                                    <Link to="/perfil" className="navbar-brand"><span className="nav-link">Mi perfil</span></Link>
                                </li>
                            </div>
                        </li>
                        <li className={this.getNavLinkClass("/registrarme")}>
                            <Link to="/registrarme" className="navbar-brand"><span className="nav-link">Registrarme</span></Link>
                        </li>
                        <li className={this.getNavLinkClass("/contacto")}>
                            <Link to="/contacto" className="navbar-brand"><span className="nav-link">¿Dudas, Consultas?</span></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
};
Navbar = withRouter(Navbar);
export default Navbar;