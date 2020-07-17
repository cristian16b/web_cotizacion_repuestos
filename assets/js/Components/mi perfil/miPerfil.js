import React , { Component } from 'react';
import {ROL_COMERCIANTE,ROL_USER} from '../../Constantes/constantes';
import FormularioDatosComunes from '../registrarme/FormularioDatosComunes.js';
import FormularioDatosComerciante from '../registrarme/FormularioDatosComerciante.js';
import {API_MI_PERFIL} from '../../Constantes/constantes';

class MiPerfil extends React.Component {

  constructor(props){
    super(props);

    this.state = ({
      nombre:'',
      apellido: '',
      codArea: '',
      telefono: '',
      email: '',
      //solo para vendedores
      esComerciante: false,
      cuitCuit: '',
      // datos del comerciante
      constanciaDni: '',
      constanciaAfip: '',
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
    });
  }

  async componentDidMount() {
    const config = {
      headers: { Authorization: `Bearer ${this.props.token}` }
    };
    // try 
    // {
    //   // Load async data from an inexistent endpoint.
    //   let response = await axios.get(API_MI_PERFIL,config);
    //   this.setState({isLoading: false});
    //   if(response.data.code == 200) {
    //     // console.log('code 200')
    //     this.setState({misSolicitudes: response.data.data});
    //     console.log(this.state.misSolicitudes);
    //   }
    // } 
    // catch (e) {
    //   console.log(`😱 Axios request failed: ${e}`);
    //   alert('Ocurrio un error inesperado, intente nuevamente mas tarde');
    // }
    
    this.state.isMount = true;
  }

  componentWillUnmount() {
    this.state.isMount = false;
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
              codArea={this.state.codArea}
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
              calle={this.props.calle}
              nro={this.props.nro}
              provincia={this.state.provincia}
              localidad={this.state.localidad}
              errors={this.state.errors}
              errorsApi={this.state.errorApi}
              onChangeValueDni={this.handleChangeValueArchivoDni}
              onChangeValueAfip={this.handleChangeValueArchivoAfip}
            >
            </FormularioDatosComerciante>        
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
    return (        
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-12 col-lg-9">
            <div className="card shadow-sm p-3 mb-5 bg-white rounded">
              <div className="card-body">
                <h5>Mi perfil</h5>
                <h4>en construcciòn...</h4>
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