import React , { Component } from 'react';
import Fila from './Fila.js';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-Table';
import MostrarCompras from './mostrarCompras.js';
import ModalImage from "react-modal-image";

class Tabla extends React.Component {

  constructor(props){
    super(props);

    this.state = ({
      cotizacionSeleccionada: null,
    })
  }

  renderTabla() {
    return (
            <div className="card">
              <div className="card-body">
                <Table className="table">
                  {/* <Thead>
                    <Tr>
                      <Th>Solicitudes realizadas</Th>
                    </Tr>
                  </Thead> */}
                  <Tbody>
                    {
                      this.props.misSolicitudes.length == 0 ?
                      <Tr>
                        <Td><b>No se encontraron compras</b></Td>
                      </Tr>
                      :
                      <>{this.mostrarCotizacion()}</>
                    }
                  </Tbody>
                </Table>
              </div>
            </div>
    );
  }

  mostrarCotizaciones = () => {
    return(
        this.props.misSolicitudes.map(elemento => {
          return (
            <Fila 
                elemento = {elemento} 
                token = {this.props.token} 
                reiniciar = {this.reiniciar}
                mostrarCotizacion = {this.mostrarCotizacion}
            />
          )
        }
      )
    )
  }

  mostrarCotizacion = (id) => { 
    // alert('soy el padre y me piden mostrar id=' + id);  ç
    for(let element of this.props.misSolicitudes) {
        if(element.id == id) {
          // console.log(element); 
          this.setState({cotizacionSeleccionada: element});
          break;
        }
      }
  }

  reiniciar = () => { this.props.reiniciar(); }

  mostrarListado = () => { this.setState({cotizacionSeleccionada: null}); }

  render() {
    if(this.state.cotizacionSeleccionada != null) {
      return(
        <MostrarCompras mostrarListado={this.mostrarListado} cotizacion={this.state.cotizacionSeleccionada}></MostrarCompras>
      )
    }
    return (
      <>{ this.renderTabla() }</>
    );
  }
}

export default Tabla;