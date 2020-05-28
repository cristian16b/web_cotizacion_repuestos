import React , { Component } from 'react';

class Home extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (        
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <h1 className="my-4">Eisen Part</h1>
            <img  className="card-img-top img-fluid"
                  src="public\Eisen_Aplicativo03.jpg" 
                  alt="Cargando..." 
                  border="0">
            </img> 
          <div className="card">
            <div className="card-body">
              <p className="card-text">Descripción</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;