import React , { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'

class Home extends React.Component {

  constructor(props){
    super(props);
  }
  // https://i.ibb.co/pzH2yTP/Eisen-Aplicativo03.jpg
  render() {
    return (        
      <div>
        <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=First slide&bg=373940"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Second slide&bg=282c34"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="holder.js/800x400?text=Third slide&bg=20232a"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-12 col-lg-9">
            <h5>Eisen Part</h5>
            <div className="card shadow-sm p-3 mb-5 bg-white rounded">
              <div className="card-body">
                <p className="card-text">Descripción... DEFINIR QUE SE VA A PONER</p>
              </div>
            </div>
          </div>
        </div> 
      </div>
    );
  }
}

export default Home;