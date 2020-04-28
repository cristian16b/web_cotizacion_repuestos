import React , { Component } from 'react';

class Home extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
        
      <div className="row">
        <div className="col-lg-9">
          <h1 className="my-4">Nombre del sitio o marca o descripción (definir)</h1>
          <img className="card-img-top img-fluid" src="http://placehold.it/900x400" alt=""></img>
          <div className="card">
            <div className="card-body">
              <p className="card-text">Descripción y demas .... (DEFINIR)</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;