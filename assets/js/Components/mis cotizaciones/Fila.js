import React , { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-Table';
import {Collapsible} from '../collapsible/Collapsible';
import ModalImage from "react-modal-image";
import {API_OBTENER_FOTO_REPUESTO, API_OBTENER_FOTO_COTIZACION, API_CANCELAR_SOLICITUD,API_MERCADO_PAGO_MOSTRAR_BOTON_PAGO} from '../../Constantes/constantes';
import axios from 'axios';

const multipreview = {
  maxWidth: "200px",
  width: '90%',
  height: '90%',
  backgroundPosition: 'center center',
  background:'url(' + 'http://cliquecities.com/assets/no-image-e3699ae23f866f6cbdf8ba2443ee5c4e.jpg' + ')',
  backgroundColor: '#fff',
  backgroundSize: 'cover',
  backgroundRepeat:'no-repeat',
  display: 'inline-block',
  boxShadow: '0px -3px 6px 2px rgba(0,0,0,0.2)',
}

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
    const recursos = elemento.recurso_cotizacions;
    // console.log(recurso);
    return (
            <Tr key={elemento.id}>
              <Td className="tdFoto">
                <>{this.renderFoto(recursos)}</>
              </Td>
              <Td className="tdDescripcion">
                <>{this.renderDescripcion()}</>
              </Td>
          </Tr>
    )
  }

  renderFoto = (recursos) => {
    if(recursos.length > 0) {
      const recurso = recursos[0];
      const url = API_OBTENER_FOTO_COTIZACION + `?fileName=${recurso.nombre_fisico}`;
      return (
        <img src={url} style={multipreview} alt="Ocurrio un problema al previsualizar..." />
      )
    }
  }

  renderDescripcion = () => {
    return(
      <p>SOY UNA PRUEBA, ACA DEBE IR LA DESCRIPCION Y EL PRECIO Y ETC</p>
    )
  }

  render() {
    return (
      <>{this.armarFilaTabla(this.props.elemento)}</>
    );
  }
}

export default Fila;