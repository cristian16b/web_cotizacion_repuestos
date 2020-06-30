import React , { Component } from 'react';

class Contacto extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (        
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-12 col-lg-5">
          
            <div className="card shadow-sm p-3 mb-5 bg-white rounded">
              <div className="card-body">
              <section className="mb-4">
                <h3 className="my-4">Formulario de contacto</h3>
                <p className="text-center w-responsive mx-auto mb-5">¿Tenes alguna consulta?</p>

                <div className="row">

                    {/* <!--Grid column--> */}
                    <div className="col-md-9 mb-md-0 mb-5">
                        <form id="contact-form" name="contact-form">

                            {/* <!--Grid row--> */}
                            <div className="row">

                                {/* <!--Grid column--> */}
                                <div className="col-md-6">
                                    <div className="md-form mb-0">
                                      <label forhtml="name" className="">Nombre y apellido</label>
                                      <input type="text" id="name" name="name" className="form-control" />
                                    </div>
                                </div>
                                {/* <!--Grid column--> */}

                                {/* <!--Grid column--> */}
                                <div className="col-md-6">
                                    <div className="md-form mb-0">
                                      <label forhtml="email" className="">Email</label>
                                      <input type="text" id="email" name="email" className="form-control" />
                                    </div>
                                </div>
                                {/* <!--Grid column--> */}
                            </div>
                            {/* <!--Grid row-->

                            <!--Grid row--> */}
                            <div className="row">

                                {/* <!--Grid column--> */}
                                <div className="col-md-12">

                                    <div className="md-form">
                                        <label forhtml="message">Tu pregunta</label>
                                        <textarea type="text" id="message" name="message" rows="2" className="form-control md-textarea"></textarea>
                                        
                                    </div>

                                </div>
                            </div>
                            {/* <!--Grid row--> */}
                            <div className="row">

                                {/* <!--Grid column--> */}
                                <div className="col-md-6">

                                    <div className="md-form">
                                      <br />
                                      <button type="submit" className="btn btn-primary login-btn btn-block">Enviar</button>
                                    </div>

                                </div>
                            </div>

                        </form>

                        
                        
                        <div className="status"></div>
                    </div>
                    {/* <!--Grid column--> */}

                    {/* <!--Grid column--> */}
                    <div className="col-md-3 text-center">
                        <ul className="list-unstyled mb-0">
                            <li><i className="fas fa-map-marker-alt fa-2x"></i>
                                <p>Santa fe ...</p>
                            </li>

                            <li><i className="fas fa-phone mt-4 fa-2x"></i>
                                <p>342 .....</p>
                            </li>

                            <li><i className="fas fa-envelope mt-4 fa-2x"></i>
                                <p>contacto@correo.com</p>
                            </li>
                        </ul>
                    </div>
                    {/* <!--Grid column--> */}

                </div>

                </section>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Contacto;