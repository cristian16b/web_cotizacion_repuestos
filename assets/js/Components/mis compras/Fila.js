import React , { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-Table';
import {Collapsible} from '../collapsible/Collapsible';
import ModalImage from "react-modal-image";
import {API_OBTENER_FOTO_REPUESTO, API_OBTENER_FOTO_COTIZACION, API_CANCELAR_SOLICITUD,API_MERCADO_PAGO_MOSTRAR_BOTON_PAGO} from '../../Constantes/constantes';
import axios from 'axios';

const multipreview = {
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
    const monto = elemento.monto;
    const descripcion = elemento.solicitud.repuesto.name;
    const id = elemento.id;
    const modelo = elemento.solicitud.modelo_auto.name;
    const marca = elemento.solicitud.modelo_auto.marca_auto.name;

    // console.log(elemento);
    return (
            <Tr key={id.toString()}>
              <Td className="tdFoto">
                <>{this.renderFoto(id,recursos)}</>
              </Td>
              <Td className="tdDescripcion">
                <>{this.renderDescripcion(id,descripcion,monto,marca,modelo)}</>
              </Td>
          </Tr>
    )
  }

  renderFoto = (id,recursos) => {
    if(recursos.length > 0) {
      const recurso = recursos[0];
      const url = API_OBTENER_FOTO_COTIZACION + `?fileName=${recurso.nombre_fisico}`;
      return (
        <img src={url} width="200" height="200" style={multipreview} alt="Ocurrio un problema al previsualizar..." 
              onClick={() => this.mostrarCotizacion(id)} 
        />
      )
    }
  }

  renderDescripcion = (id,descripcion,monto,marca,modelo) => {
    return(
        <div>
          <h6 onClick={() => this.mostrarCotizacion(id)}>Repuesto: {descripcion}</h6>
          <h6>Marca del vehículo: {marca} - Modelo: {modelo}</h6>
          <h5><b>$ {monto}</b></h5>
        </div>
    )
  }

  mostrarCotizacion = (id) => { this.props.mostrarCotizacion(id)  }

  render() {
    return (
      <>{this.armarFilaTabla(this.props.elemento)}</>
    );
  }
}

export default Fila;