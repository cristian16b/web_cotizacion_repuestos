import React , { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-Table';
import Fila from './Fila.js';

class Tabla extends React.Component {

  constructor(props){
    super(props);

    this.state = ({
      errors:{},
      monto: 0,
      fechaVencimiento: '',
    });
  }

  componentDidMount() {
    this.obtenerFechaVencimiento();
  }

  renderTabla() {
    return (
          <Table className="table table-striped">
            <Thead>
              <Tr>
                <Th>Solicitudes realizadas</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                this.props.misSolicitudes.map(elemento => {
                    return (
                      <Fila elemento = {elemento} fechaVencimiento = {this.state.fechaVencimiento}
                            token = {this.props.token}
                            setIsLoading = {this.setIsLoading}
                      />
                    )              
                  }
                )
              }
           </Tbody>
          </Table>
    );
  }

  obtenerFechaVencimiento = () => {
    let hoy = new Date();
    hoy.setDate(hoy.getDate()+7);
    let fechaFormateada = this.formatearFecha(hoy.toJSON().slice(0,10));
    this.setState({ fechaVencimiento :  fechaFormateada});
  }

    // la fecha viene con el formato aaaa/mm/dd t00:00
  // se va a mostrar lo siguiente: dd/mm/aaaa 
  formatearFecha(fecha) {
    return fecha.substr(0,10).split('-').reverse().join('/');
  }

  render() {
    return (
      <>{this.renderTabla()}</>
    );
  }
}

export default Tabla;