import React , { Component } from 'react';
import Loading from '../loading/loading.js';

class MiPerfil extends React.Component {

  constructor(props){
    super(props);

    this.state = ({
      menu: false,
      isMount: false,
      isLoading: true, // inicialmente esta cargando hasta que se monta el componente en componentdidmount()
      misSolicitudes: [],
      repuestoBuscar: '',
      errors:{},
    });

  }

  render() {
    // if(this.state.isLoading == true)
    //   return  <Loading></Loading>
    return (        
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-12 col-lg-9">
            <div className="card shadow-sm p-3 mb-5 bg-white rounded">
              <div className="card-body">
                <h3 className="my-4">Mi perfil</h3>
                <hr/>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MiPerfil;