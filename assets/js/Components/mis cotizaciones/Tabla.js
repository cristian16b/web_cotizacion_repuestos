import React , { Component } from 'react';
import Fila from './Fila.js';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-Table';

class Tabla extends React.Component {

  constructor(props){
    super(props);
  }

  renderTabla() {
    return (
          // <Table className="table">
          //   <Thead>
          //     <Tr>
          //       <Th>Solicitudes realizadas</Th>
          //     </Tr>
          //   </Thead>
          //   <Tbody>
          //     {
          //       this.props.misSolicitudes.map(elemento => {
          //           return (
          //             <Fila 
          //                 elemento = {elemento} 
          //                 token = {this.props.token} 
          //                 reiniciar = {this.reiniciar}
          //             />
          //           )
          //         }
          //       )
          //     }
          //  </Tbody>
          // </Table>
          <>
            {
              this.props.misSolicitudes.map(elemento => {
                    return (
                      <>
                        <Fila 
                              elemento = {elemento} 
                              token = {this.props.token} 
                              reiniciar = {this.reiniciar}
                        />
                        <hr></hr>
                      </>
                  )
                }
              )
            }
          </>
    );
  }

  reiniciar = () => { this.props.reiniciar(); }

  render() {
    return (
      <>{ this.renderTabla() }</>
    );
  }
}

export default Tabla;