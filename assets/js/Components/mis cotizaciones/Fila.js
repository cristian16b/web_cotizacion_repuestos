import React , { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-Table';
import {Collapsible} from '../collapsible/Collapsible';
import ModalImage from "react-modal-image";
import {API_OBTENER_FOTO_REPUESTO, API_OBTENER_FOTO_COTIZACION, API_CANCELAR_SOLICITUD,API_MERCADO_PAGO_MOSTRAR_BOTON_PAGO} from '../../Constantes/constantes';
import axios from 'axios';

class Fila extends React.Component {

  constructor(props){
    super(props);

    this.state = ({
      errors: '',
      isMount: false,
      botonHabilitado: false,
      misCotizaciones: [],
    });
  }

  componentDidMount() {
    this.setState({isMount: true});
  }

  componentWillUnmount() {
    this.setState({isMount: false})
  }

  armarFilaTabla(elemento){
    const recursos = elemento.recursos;
    return (
            <Tr key={elemento.id}>
              <Td className="tdFoto">
                
              </Td>
              <Td className="tdDescripcion">
                
              </Td>
          </Tr>
    )
  }

  render() {
    return (
      <>{this.armarFilaTabla(this.props.elemento)}</>
    );
  }
}

export default Fila;