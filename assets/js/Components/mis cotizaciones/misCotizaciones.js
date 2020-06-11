import React , { Component } from 'react';
import ReactCollapsingTable from 'react-collapsing-table';
import PopUpAlert from './PopUpAlert';
import ImageModal from './ImageModal';
import { Row, Col } from 'reactstrap';

const TablePhoto = ({ row, accessor }) => {
  return <span style={{height: 200, width: 200, backgroundColor: 'grey'}}>
          <img src={ row[accessor] } className="img-fluid" width="200" height="200" alt=''/>
        </span>
};

class MisCotizaciones extends React.Component {

clickedImage = ({ imageURL }) => {
    this.props.actions.clickedImage({ imageURL });
}

  constructor(props){
    super(props);

    this.state = ({
      rows : [
        { id: 1, firstName: 'Paul', lastName: 'Darragh', photoUrl: 'https://s3.amazonaws.com/react-collapsing-table-photos/5.jpeg' }
      ],columns : [
        { accessor: 'firstName', label: 'First Name', priorityLevel: 1, position: 1, minWidth: 150, },
        { accessor: 'lastName', label: 'Last Name', priorityLevel: 2, position: 2, minWidth: 150, },
        { accessor: 'photoUrl', label: 'Photo', priorityLevel: 3, position: 3, minWidth: 200, CustomComponent: TablePhoto },
      ]
    });
  }


  renderFiltrosBusqueda() {
    return(
      <div className="row">

      </div>
    );
  }

  // renderTabla() {
  //   return (
  //     const { receipts, columns, imageModal } = this.props;
  //     const tableCallbacks = { photo: this.clickedImage, email: this.getEmailLogo }
  //         <App receipts={ receipts }
  //              columns={ columns }
  //              imageModal={ imageModal }
  //              toggleModal={ this.clickedImage }
  //              tableCallbacks={ tableCallbacks }
  //              fetchAllReceipts={ this.fetchAllReceipts }
  //              fetchLastMonthsReceipts={ this.fetchLastMonthsReceipts }/>
  //   );
  // }

  render() {
    // const { rows, columns, } = this.props;
    const callbacks = { photoUrl: this.clickedImage }
    return (        
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            <div className="card shadow-sm p-3 mb-5 bg-white rounded">
              <div className="card-body">
                <h1 className="my-4">Mis Cotizaciones</h1>
                <h5>Listado de las últimas solicitudes generadas</h5>
                <>{ this.renderFiltrosBusqueda() }</>
                <ReactCollapsingTable 
                 rows={ this.state.rows }
                 columns={ this.state.columns }
                 callbacks={ callbacks } 
                 />
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default MisCotizaciones;