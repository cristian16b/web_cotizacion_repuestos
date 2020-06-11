import React , { Component } from 'react';
import ReactCollapsingTable from 'react-collapsing-table';
import PopUpAlert from './PopUpAlert';
import ImageModal from './ImageModal';
import { Row, Col } from 'reactstrap';

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
    const show = (this.state.menu) ? "show" : "" ;
    return (
      <Row>
        <Col sm={{ size: 10, offset: 1 }}>
          { receipts.length > 0 && <PopUpAlert totalResults={ receipts.length } />}
          <h1>Table of Receipts</h1>
          <button onClick={ fetchAllReceipts }>All Receipts</button>
          <button onClick={ fetchLastMonthsReceipts }>Last Months Receipts</button>
          <ReactCollapsingTable columns={ columns }
                                rows={ receipts }
                                rowSize={ 5 }
                                column='email'
                                callbacks={ tableCallbacks }
                                showSearch={ true }
                                showPagination={ true } />
          <ImageModal isOpen={ imageModal.isOpen }
                      toggle={ toggleModal }
                      imageURL={ imageModal.imageURL } />
        </Col>
      </Row>
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