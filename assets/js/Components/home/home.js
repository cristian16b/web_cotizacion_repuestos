import React , { Component } from 'react';

class Home extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
        <div className="container">
            <div className="row">
            <div class="col-lg-9">
            <h1 class="my-4">Nombre del sitio o marca o descripción (definir)</h1>
            <div class="card mt-4">
            <img class="card-img-top img-fluid" src="http://placehold.it/900x400" alt="">
            </img>
            <div class="card-body">
                <h3 class="card-title">Product Name</h3>
                <h4>$24.99</h4>
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente dicta fugit fugiat hic aliquam itaque facere, soluta. Totam id dolores, sint aperiam sequi pariatur praesentium animi perspiciatis molestias iure, ducimus!</p>
                <span class="text-warning">&#9733; &#9733; &#9733; &#9733; &#9734;</span>
                4.0 stars1
            </div>
            </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Home;