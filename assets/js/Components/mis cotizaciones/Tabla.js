import React , { Component } from 'react';
import Fila from './Fila.js';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-Table';
import MostrarCotizacion from './mostrarCotizacion.js';
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
                    }
                  </Tbody>
                </Table>
              </div>
            </div>
    );
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

  render() {
    if(this.state.cotizacionSeleccionada != null) {
      return(
        <MostrarCotizacion></MostrarCotizacion>
      )
    }
    return (
      <>{ this.renderTabla() }</>
    );
  }
}

export default Tabla;