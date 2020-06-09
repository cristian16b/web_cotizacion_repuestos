import React , { Component } from 'react';

class MisCotizaciones extends React.Component {

  constructor(props){
    super(props);
  }

  renderFiltrosBusqueda() {
    return(
      <div className="row">

      </div>
    );
  }

  renderTabla() {
    return (
        <div className="table-responsive-md table-responsive-sm">
          <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Repuesto</th>
              <th scope="col">Observaciones</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">01/09/2020</th>
              <td>Optica para Citroen V3</td>
              <td>Modelo 2020 lo necesito con urgencia</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-info" 
                            data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                      Ver fotos
                    </button>
                    <button type="button" className="btn btn-dark"
                            data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                      Ver cotizaciones
                    </button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-info">Ver fotos</button>
                    <button type="button" className="btn btn-dark">Ver cotizaciones</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="collapse" id="collapseExample">
          <div className="card card-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (        
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <div className="card shadow-sm p-3 mb-5 bg-white rounded">
              <div className="card-body">
                <h1 className="my-4">Mis Cotizaciones</h1>
                <h5>Listado de las últimas solicitudes generadas</h5>
                <>{ this.renderFiltrosBusqueda() }</>
                <>{ this.renderTabla() }</>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default MisCotizaciones;