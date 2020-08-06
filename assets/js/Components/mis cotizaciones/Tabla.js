import React , { Component } from 'react';
import Fila from './Fila.js';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-Table';

class Tabla extends React.Component {

  constructor(props){
    super(props);
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
                    <Fila elemento = {elemento} />
                  }
                )
              }
           </Tbody>
          </Table>
    );
  }

  render() {
    return (
      <>{ this.renderTabla() }</>
    );
  }
}

export default Tabla;