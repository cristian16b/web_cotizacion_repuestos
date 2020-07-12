import React , { Component } from 'react';
import {ROL_COMERCIANTE,ROL_USER} from '../../Constantes/constantes';

class MiPerfil extends React.Component {

  constructor(props){
    super(props);

    this.state = ({
    });

  }

  renderDatosPerfil() {
    console.log(this.props.rol);
    if(this.props.rol == ROL_COMERCIANTE) {

    }
    else if(this.props.rol == ROL_USER) {

    }
    else {

    }
  }

  render() {
    return (        
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-12 col-lg-9">
            <div className="card shadow-sm p-3 mb-5 bg-white rounded">
              <div className="card-body">
                <h3 className="my-4">Mi perfil</h3>
                <hr/>
                <>{this.renderDatosPerfil()}</>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MiPerfil;