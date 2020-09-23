import React , { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';


class Home extends React.Component {

  constructor(props){
    super(props);
  }
  // https://i.ibb.co/pzH2yTP/Eisen-Aplicativo03.jpg
  render() {
    return (     
      <div>
        <div className="row justify-content-center altoCarruselImagenes">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
          <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://www.eisenparts.com/imagenes/Eisen_Aplicativo01.jpg"
                    alt="First slide"
                  />
                  {/* <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  </Carousel.Caption> */}
                </Carousel.Item>
                {/* <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://www.eisenparts.com/imagenes/Eisen_Aplicativo02.jpg"
                    alt="Second slide"
                  />
                </Carousel.Item> */}
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://www.eisenparts.com/imagenes/Eisen_Aplicativo03.jpg"
                    alt="Third slide"
                  />

                  {/* <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                  </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://www.eisenparts.com/imagenes/Logotipo_Eisen_Parts.png"
                    alt="Third slide"
                  />

                  {/* <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                  </Carousel.Caption> */}
                </Carousel.Item>
              </Carousel>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-12 col-lg-11">
            <div className="card shadow-sm p-3 mb-5 bg-white rounded">
            <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-12 col-lg-11">
          <h5>Eisen Part</h5>
              </div>
            </div>
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