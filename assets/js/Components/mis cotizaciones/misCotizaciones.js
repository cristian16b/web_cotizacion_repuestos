import React , { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-Table';
import 'react-super-responsive-Table/dist/SuperResponsiveTableStyle.css';
import Loading from '../loading/loading.js';
import {API_MIS_SOLICITUDES} from '../../Constantes/constantes';
import axios from 'axios';

class MisCotizaciones extends React.Component {

  constructor(props){
    super(props);
    this.state = ({
      menu: false,
      token: this.props.getTokenPadre(),
      isMount: false,
    });
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount() {
    this.consumirApiMisCotizaciones();
    this.state.isMount = true;
  }

  componentWillUnmount() {
    this.state.isMount = false;
  }

  consumirApiMisCotizaciones() {
    const config = {
      headers: { Authorization: `Bearer ${this.state.token['token']}` }
    };
    // console.log(this.state.token['token']);
    this.setState({peticionActiva: true});
    //seteo peticionActiva true para evitar que se desaten continuas peticiones
    axios.get(API_MIS_SOLICITUDES,config)
          .then(response => {
              if(this.state.isMount) {
                // oculto el bucle de cargando
                this.setState({peticionActiva: false});

              }
              // let lista = response.data.data;
              // let options = lista.map(elemento => {    
              //   return { value:  `${elemento.id}`, label: `${elemento.name}` };
              // });
              // return options;
          })
          .catch(e => {
            this.setState({peticionActiva: false});
            if(e.response)
            {
                let error = '';
                error = e.response.data.message;
                console.log(error);
                // this.setState({errorApi: error});
            }
          });
  }

  toggleMenu(){
    this.setState({ menu: !this.state.menu });
    console.log(this.state.menu);
  }

  renderFilTrosBusqueda() {
    return(
      <div className="row">

      </div>
    );
  }

  renderTabla() {
    const show = (this.state.menu) ? "show" : "" ;
    return (
          <Table className="table table-sTriped">
          <Thead>
            <Tr>
              <th scope="col">Solicitud</th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    Optica para Citroen V3
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button" className="btn btn-info"  onClick={ this.toggleMenu } 
                              data-target="#accordion" aria-expanded="false" aria-controls="collapseExample">
                        Ver fotos
                      </button>
                      <button type="button" className="btn btn-dark"
                              data-target="#accordion" aria-expanded="false" aria-controls="collapseExample">
                        Ver cotizaciones
                      </button>
                    </div>
                    <div id="accordion" className={"collapse navbar-collapse " + show}>Hidden by default</div>
                  </div>
                  </div>
              </Td>
            </Tr>
            <Tr>
              <Td>
                  <div className="row">
                    Optica para Citroen V3
                  </div>
                  <div className="row">
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button" className="btn btn-info"  onClick={ this.toggleMenu } 
                              data-target="#accordion" aria-expanded="false" aria-controls="collapseExample">
                        Ver fotos
                      </button>
                      <button type="button" className="btn btn-dark"
                              data-target="#accordion" aria-expanded="false" aria-controls="collapseExample">
                        Ver cotizaciones
                      </button>
                  </div>
                  <div id="accordion" className={"collapse navbar-collapse " + show}>Hidden by default</div>
                  </div>
              </Td>
            </Tr>
            <Tr>
              <Td>
                  <div className="row">
                    Optica para Citroen V3
                  </div>
                  <div className="row">
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button" className="btn btn-info"  onClick={ this.toggleMenu } 
                              data-target="#accordion" aria-expanded="false" aria-controls="collapseExample">
                        Ver fotos
                      </button>
                      <button type="button" className="btn btn-dark"
                              data-target="#accordion" aria-expanded="false" aria-controls="collapseExample">
                        Ver cotizaciones
                      </button>
                  </div>
                  <div id="accordion" className={"collapse navbar-collapse " + show}>Hidden by default</div>
                  </div>
              </Td>
            </Tr>
            <Tr>
              <Td>
                  <div className="row">
                    Optica para Citroen V3
                  </div>
                  <div className="row">
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button" className="btn btn-info"  onClick={ this.toggleMenu } 
                              data-target="#accordion" aria-expanded="false" aria-controls="collapseExample">
                        Ver fotos
                      </button>
                      <button type="button" className="btn btn-dark"
                              data-target="#accordion" aria-expanded="false" aria-controls="collapseExample">
                        Ver cotizaciones
                      </button>
                  </div>
                  <div id="accordion" className={"collapse navbar-collapse " + show}>Hidden by default</div>
                  </div>
              </Td>
            </Tr>
          </Tbody>
        </Table>
    );
  }

  render() {
    if(this.state.isLoading == true)
      return  <Loading></Loading>
    return (        
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <div className="card shadow-sm p-3 mb-5 bg-white rounded">
              <div className="card-body">
                <h1 className="my-4">Mis Cotizaciones</h1>
                <h5>Listado de las últimas solicitudes generadas</h5>
                <>{ this.renderFilTrosBusqueda() }</>
                <>{ this.renderTabla() }</>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default MisCotizaciones;