import React , { Component } from 'react';
import {ROL_COMERCIANTE,ROL_USER} from '../../Constantes/constantes';
import FormularioDatosComunes from '../registrarme/FormularioDatosComunes.js';
import FormularioDatosComerciante from '../registrarme/FormularioDatosComerciante.js';
import {API_MI_PERFIL,API_OBTENER_CONSTANCIA} from '../../Constantes/constantes';
import Loading from '../loading/loading.js';
import axios from 'axios';
import Salir from '../salir/salir.js';

class MiPerfil extends React.Component {

  constructor(props){
    super(props);

    this.state = ({
      nombre:'',
      apellido: '',
      cod_area: '',
      telefono: '',
      email: '',
      //solo para vendedores
      esComerciante: false,
      cuitCuit: '',
      // datos del comerciante
      // en los siguientes se van a guardar las url de las constancias
      constanciaDni: '',
      constanciaAfip: '',
      // datos del domicilio
      calle: '',
      nro: '',
      localidad: '',
      provincia: '',
      //
      password:'',
      password2: '',
      // errores locales o retornados por la api
      errors: {},
      errorApi: '',
      soloLectura: true,
      isMount: false,
      isLoading: true, // inicialmente esta cargando hasta que se monta el componente en componentdidmount()
      isLogin: true
    });
  }

  async componentDidMount() {
    const config = {
      headers: { Authorization: `Bearer ${this.props.token}` }
    };
    try 
    {
      // Load async data from an inexistent endpoint.
      let response = await axios.get(API_MI_PERFIL,config);
      this.setState({isLoading: false});
      if(response.data.code == 200) {
        // console.log('code 200')
        // this.setState({misSolicitudes: response.data.data});
        // console.log(this.state.misSolicitudes);

        let data = response.data.data;
        console.log(data);
        this.setState({
          apellido : data.apellido
        });
        this.setState({
          nombre : data.nombre
        });
        this.setState({
          cod_area : data.cod_area
        });
        this.setState({
          telefono : data.telefono
        });
        this.setState({
          email : data.email
        });
        if(this.props.rol[0] == ROL_COMERCIANTE) {
          this.setState({
            calle : data.domicilio.calle
          });
          this.setState({
            nro : data.domicilio.numero
          });
          this.setState({
            localidad : data.domicilio.localidad.name
          });
          this.setState({
            provincia : data.domicilio.localidad.provincia.name
          });
          this.setState({
            constanciaAfip : API_OBTENER_CONSTANCIA + data.constancia_personas[0].nombre_fisico
          });
          this.setState({
            constanciaDni : API_OBTENER_CONSTANCIA +  data.constancia_personas[1].nombre_fisico
          });
        }
      }
    } 
    catch (e) {
      this.setState({isLoading: false});
      console.log(`😱 Axios request failed: ${e}`);
      // alert('Ocurrio un error inesperado, intente nuevamente mas tarde');
      this.setState({
        isLogin : false
      });
    }
    
    this.setState({
      isMount : true
    });
  }

  componentWillUnmount() {
    this.setState({
      isMount : false
    });
  }

  renderDatosPerfil() {
    if(this.props.rol[0] == ROL_COMERCIANTE) {
      return(
        <>
          <FormularioDatosComunes 
              handleChangeInput={this.handleChangeInput} 
              errors={this.state.errors}
              errorsApi={this.state.errorApi}
              nombre={this.state.nombre}
              apellido={this.state.apellido}
              codArea={this.state.cod_area}
              telefono={this.state.telefono}
              email={this.state.email}
              password={this.state.password}
              password2={this.state.password2}
              soloLectura={this.state.soloLectura}
            >
          </FormularioDatosComunes>
          <hr></hr>
          <FormularioDatosComerciante
              handleChangeInput={this.handleChangeInput} 
              handleChangeSelectLocalidad={this.handleChangeSelectLocalidad}
              handleChangeSelectProvincia={this.handleChangeSelectProvincia}
              constanciaDni={this.state.constanciaDni}
              constanciaAfip={this.state.constanciaAfip}
              calle={this.state.calle}
              nro={this.state.nro}
              provincia={this.state.provincia}
              localidad={this.state.localidad}
              errors={this.state.errors}
              errorsApi={this.state.errorApi}
              onChangeValueDni={this.handleChangeValueArchivoDni}
              onChangeValueAfip={this.handleChangeValueArchivoAfip}
              soloLectura={this.state.soloLectura}
            >
            </FormularioDatosComerciante>
            <hr></hr>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <a href={this.state.constanciaAfip} target="_blank" className="badge badge-primary btn-primary">Ver Inscripción en AFIP</a>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <a href={this.state.constanciaDni} target="_blank" className="badge badge-secondary btn-secondary">Ver D.N.I</a>
              </div>
            </div>     
            <hr></hr>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <button
                          className="btn btn-primary btn-block"
                          >Editar</button>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <button
                          className="btn btn-warning btn-block">Dar de baja
                  </button>
                </div>
              </div>  
            </div>     
        </>
      );
    }
    else if(this.props.rol[0] == ROL_USER) {
      return(
        <FormularioDatosComunes 
            handleChangeInput={this.handleChangeInput} 
            errors={this.state.errors}
            errorsApi={this.state.errorApi}
            nombre={this.state.nombre}
            apellido={this.state.apellido}
            codArea={this.state.codArea}
            telefono={this.state.telefono}
            email={this.state.email}
            password={this.state.password}
            password2={this.state.password2}
            soloLectura={this.state.soloLectura}
          >
        </FormularioDatosComunes>
      );
    }
    else {
      return(
          null
      );
    }
  }

  render() {
    if(this.state.isLogin == false)
      return <Salir/>
    if(this.state.isLoading == true)
      return  <Loading></Loading>
    return (        
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-12 col-lg-9">
            <div className="card shadow-sm p-3 mb-5 bg-white rounded">
              <div className="card-body">
                <h5>Mi perfil</h5>
                <hr/>
                <>{this.renderDatosPerfil()}</>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MiPerfil;