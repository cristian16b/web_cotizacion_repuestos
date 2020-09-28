import React from 'react';
import {NavLink, withRouter, Link}  from 'react-router-dom';
import {ROL_COMERCIANTE} from '../../Constantes/constantes';

class NavbarLogueado extends React.Component {
    
    getNavLinkClass = (path) => {
        return this.props.location.pathname === path ? 'active' : '';
    }

    render() {
        if(this.props.rol == ROL_COMERCIANTE)
            return(
                <nav className="navbar navbar-custom navbar-fixed-top navbar-expand-md">
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
                        {/* <li data-toggle="collapse" data-target=".navbar-collapse" className={this.getNavLinkClass("/")}>
                            <Link to="/" className="navbar-brand"><span className="nav-link">¿Quienes somos?</span></Link>
                        </li> */}
                        <li data-toggle="collapse" data-target=".navbar-collapse" className={this.getNavLinkClass("/cotizaciones")}>
                            <Link to="/solicitudes" className="navbar-brand">
                            <span className="nav-link"><i className="fa fa-file-text-o iconoColor">
                                            </i>&nbsp;
                                            Solicitudes</span></Link>
                        </li>
                        <li data-toggle="collapse" data-target=".navbar-collapse" className={this.getNavLinkClass("/perfil")}>
                            
                            <Link to="/perfil" className="navbar-brand">
                            <span className="nav-link"><i className="fa fa-drivers-license iconoColor">
                                </i>&nbsp;
                                Mi perfil</span>
                            </Link>
                        </li>
                        {/* <li data-toggle="collapse" data-target=".navbar-collapse" className={this.getNavLinkClass("/contacto")}>
                            <Link to="/contacto" className="navbar-brand"><span className="nav-link">¿Dudas, Consultas?</span></Link>
                        </li> */}
                        <li data-toggle="collapse" data-target=".navbar-collapse" className={this.getNavLinkClass("/salir")}>
                            <Link to="/salir" className="navbar-brand">
                            <span className="nav-link"><i className="fa fa-sign-out iconoColor">
                                            </i>&nbsp;
                                            Salir</span></Link>
                        </li>
                    </ul>
                </div>
            </nav>
            )
        return (
            <nav className="navbar navbar-custom navbar-fixed-top navbar-expand-md">
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
                        {/* <li data-toggle="collapse" data-target=".navbar-collapse" className={this.getNavLinkClass("/")}>
                            <Link to="/" className="navbar-brand"><span className="nav-link">¿Quienes somos?</span></Link>
                        </li> */}
                        <li data-toggle="collapse" data-target=".navbar-collapse" className={this.getNavLinkClass("/home")}>
                            <Link to="/home" className="navbar-brand">
                            <span className="nav-link"><i className="fa fa-car iconoColor">
                            </i>&nbsp;
                            Cotizaciones</span>
                            </Link>
                        </li>
                        <li data-toggle="collapse" data-target=".navbar-collapse"  className={this.getNavLinkClass("/repuesto")}>
                            <Link to="/repuesto" className="navbar-brand">
                            <span className="nav-link"><i className="fa fa-search iconoColor">
                                            </i>&nbsp;
                                Buscar un repuesto</span></Link>
                        </li>
                        <li data-toggle="collapse" data-target=".navbar-collapse" className={this.getNavLinkClass("/cotizaciones")}>
                            <Link to="/cotizaciones" className="navbar-brand">
                            <span className="nav-link"><i className="fa fa-file-text-o iconoColor">
                                            </i>&nbsp;
                                Mis pedidos</span></Link>
                        </li>
                        <li data-toggle="collapse" data-target=".navbar-collapse" className={this.getNavLinkClass("/perfil")}>
                            <Link to="/perfil" className="navbar-brand">                            
                            <span className="nav-link"><i className="fa fa-drivers-license iconoColor">
                                            </i>&nbsp;Mi perfil</span></Link>
                        </li>
                        {/* <li data-toggle="collapse" data-target=".navbar-collapse" className={this.getNavLinkClass("/contacto")}>
                            <Link to="/contacto" className="navbar-brand"><span className="nav-link">¿Dudas, Consultas?</span></Link>
                        </li> */}
                        <li data-toggle="collapse" data-target=".navbar-collapse" className={this.getNavLinkClass("/salir")}>
                            <Link to="/salir" className="navbar-brand">
                            <span className="nav-link"><i className="fa fa-sign-out iconoColor">
                                            </i>&nbsp;    
                                Salir</span></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
};
NavbarLogueado = withRouter(NavbarLogueado);
export default NavbarLogueado;