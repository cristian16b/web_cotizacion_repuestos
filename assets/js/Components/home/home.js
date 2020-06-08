import React , { Component } from 'react';

class Home extends React.Component {

  constructor(props){
    super(props);
  }
  // https://i.ibb.co/pzH2yTP/Eisen-Aplicativo03.jpg
  render() {
    return (        
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-12 col-lg-9">
          <h1 className="my-4">Eisen Part</h1>
            <img  className="card-img-top img-fluid"
                  src="https://i.ibb.co/pzH2yTP/Eisen-Aplicativo03.jpg" 
                  alt="Cargando..." 
                  border="0">
            </img> 
          <div className="card shadow-sm p-3 mb-5 bg-white rounded">
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