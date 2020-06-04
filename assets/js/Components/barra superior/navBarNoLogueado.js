import React from 'react';
import {NavLink, withRouter, Link}  from 'react-router-dom'
class NavbarNoLogueado extends React.Component {
    
    getNavLinkClass = (path) => {
        return this.props.location.pathname === path ? 'active' : '';
    }

    render() {
        return (
            <nav className="navbar-custom navbar navbar-expand-lg">
                <Link to="/" className="navbar-brand"><span className="navbar-brand"></span></Link>
                <button className="navbar-toggler ml-auto custom-toggler" type="button" data-toggle="collapse"  data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
                        {/* <li data-toggle="collapse" data-target=".navbar-collapse"  className={this.getNavLinkClass("/repuesto")}>
                            <Link to="/login" className="navbar-brand"><span className="nav-link">Buscar un repuesto</span></Link>
                        </li> */}
                        <li data-toggle="collapse" data-target=".navbar-collapse" className={this.getNavLinkClass("/login")}>
                            <Link to="/login" className="navbar-brand"><span className="nav-link">Ingresar</span></Link>
                        </li>
                        <li data-toggle="collapse" data-target=".navbar-collapse" className={this.getNavLinkClass("/registrarme")}>
                            <Link to="/registrarme" className="navbar-brand"><span className="nav-link">Registrarme</span></Link>
                        </li>
                        <li data-toggle="collapse" data-target=".navbar-collapse" className={this.getNavLinkClass("/contacto")}>
                            <Link to="/contacto" className="navbar-brand"><span className="nav-link">¿Dudas, Consultas?</span></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
};
NavbarNoLogueado = withRouter(NavbarNoLogueado);
export default NavbarNoLogueado;