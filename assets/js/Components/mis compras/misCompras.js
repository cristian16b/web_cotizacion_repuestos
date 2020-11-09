import React , { Component } from 'react';

import Loading from '../loading/loading.js';
import {API_LISTAR_MIS_COMPRAS} from '../../Constantes/constantes';
import axios from 'axios';
import Tabla from './Tabla.js';
import { Redirect } from 'react-router';

class MisCompras extends React.Component {

  constructor(props){
    super(props);
    this.state = ({
      menu: false,
      isMount: false,
      isLoading: true, // inicialmente esta cargando hasta que se monta el componente en componentdidmount()
      misSolicitudes: [],
      repuestoBuscar: '',
      errors:{},
      isLogin: true
    });

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.reiniciar = this.reiniciar.bind(this);
  }

  async componentDidMount() {
    const config = {
      headers: { Authorization: `Bearer ${this.props.token}` }
    };
    this.setState({
      isMount : true
    });
    try 
    {
      // Load async data from an inexistent endpoint.
      let response = await axios.get(API_LISTAR_MIS_COMPRAS,config);
      this.setState({isLoading: false});
      if(response.data.code == 200 && this.state.isMount == true) {
        // console.log('code 200')
        this.setState({misSolicitudes: response.data.data});
        // console.log(this.state.misSolicitudes);
      }
    } 
    catch (e) {
      console.log(`😱 Axios request failed`);
      // alert('Ocurrio un error inesperado, intente nuevamente mas tarde');
      this.setState({
        isLogin : false
      });
    }
  }

  componentWillUnmount() {
    this.setState({
      isMount : false
    });
  }

  handleChangeInput = e => {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  buscarRepuestoSolicitado = e => {
    const config = {
      headers: { Authorization: `Bearer ${this.props.token}` }
    };
    let repuestoBuscar = this.state.repuestoBuscar;
    if(repuestoBuscar.length >= 3) {
      this.setState({errors: {}});
      this.setState({isLoading: true});
      let url = API_LISTAR_MIS_COMPRAS + `?name=${this.state.repuestoBuscar}`;
      this.getData(url,config);
    }
    else {
      let error = {};
      error["buscar"] = "Debes escribir al menos 3 caracteres";
      this.setState({errors: error});
    }
  }

  async getData(url,headers){
    try 
    {
      // Load async data from an inexistent endpoint.
      const response = await axios.get(url,headers);
      const { data } = await response;
  
      let code = response.data.code;
      if(code == 200){
        this.setState({misSolicitudes: response.data.data});
      }
      this.setState({isLoading: false});
    } 
    catch (e) 
    {
      console.log(`😱 Axios request failed: ${e}`);
      this.setState({isLoading: false});
      // alert('Ocurrio un error inesperado, intente nuevamente mas tarde!');
      this.setState({
        isLogin : false
      });
    }
  }

  reiniciar = (e) => {
    const config = {
      headers: { Authorization: `Bearer ${this.props.token}` }
    };
    this.setState({isLoading: true});
    this.setState({repuestoBuscar: ''});
    this.setState({errors: {}});
    let url = API_LISTAR_MIS_COMPRAS;
    if(this.state.isMount == true)
      this.getData(url,config);
  }

  // renderFilTrosBusqueda() {
  //   return(
  //     <>
  //       <div className="row">
  //         <div className="col-6 col-sm-6 col-md-6 col-lg-6">
  //           <div className="form-group">
  //             {/* <label htmlFor="password">Buscar repuesto solicitado</label> */}
  //             <div className="input-group">
  //               <span className="input-group-addon"></span>
  //                 <input type="text" className="form-control" name="repuestoBuscar" 
  //                                             defaultValue = {this.state.repuestoBuscar} onChange={this.handleChangeInput}
  //                                             placeholder="Escriba el repuesto que solicitaste" />	
  //               </div>
  //               <span id="buscar" className="text-danger error_negrita">
  //                 {this.state.errors["buscar"]}
  //               </span> 
  //           </div>
  //         </div>
  //         <div className="col-3 col-sm-3 col-md-3 col-lg-3">
  //             <button type="submit" onClick={this.buscarRepuestoSolicitado}
  //               className="btn btn-primary btn-block">Buscar</button>
  //         </div>
  //         <div className="col-3 col-sm-3 col-md-3 col-lg-3">
  //             <button 
  //               onClick={this.reiniciar}
  //               className="btn btn-light btn-block">Reiniciar</button>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

  render() {
    if(this.state.isLogin == false)
      return <Redirect to = {{ pathname: "/login" }} />
    if(this.state.isLoading == true)
      return  <Loading></Loading>
    return (  
      <div>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-12 col-lg-9">
            <h5>Mis compras</h5>
          </div>     
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-12 col-lg-9">
                <Tabla
                      misSolicitudes = {this.state.misSolicitudes}
                      token = {this.props.token}
                      reiniciar = {this.reiniciar}
                    >
                  </Tabla>
          </div>
        </div>
    </div>
    );
  }
}

export default MisCompras;