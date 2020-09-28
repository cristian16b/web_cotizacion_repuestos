import React , { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';


class Home extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (     
      <div>
        <div className="row justify-content-center containerCentral">
          <div className="col-8 col-sm-8 col-md-8 col-lg-8">
          <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://www.eisenparts.com/imagenes/Eisen_Aplicativo01.jpg"
                  />
                </Carousel.Item>
                {/* <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://www.eisenparts.com/imagenes/Eisen_Aplicativo02.jpg"
                  />
                </Carousel.Item> */}
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://www.eisenparts.com/imagenes/Eisen_Aplicativo03.jpg"
                  />

                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://www.eisenparts.com/imagenes/Logotipo_Eisen_Parts_icono.png"
                  />
                </Carousel.Item>
              </Carousel>
          </div>
        </div>
        {/* <div className="row justify-content-center">
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
        </div>  */}
      </div>
    );
  }
}

export default Home;