import React, { Component } from 'react';
import '../estilos.js';
import ImageUploading from 'react-images-uploading';

const maxNumber = 4;
const maxMbFileSize = 5 * 1024 * 1024; // 5Mb

const multipreview = {
    maxWidth: "300px",
    width: '90%',
    height: '90%',
    backgroundPosition: 'center center',
    background:'url(' + 'http://cliquecities.com/assets/no-image-e3699ae23f866f6cbdf8ba2443ee5c4e.jpg' + ')',
    backgroundColor: '#fff',
    backgroundSize: 'cover',
    backgroundRepeat:'no-repeat',
    display: 'inline-block',
    boxShadow: '0px -3px 6px 2px rgba(0,0,0,0.2)',
}

const imgAdd = 
{
  width:'30px',
  height:'30px',
  borderRadius:'50%',
  backgroundColor:'#4bd7ef',
  color:'#fff',
  boxShadow:'0px 0px 2px 1px rgba(0,0,0,0.2)',
  textAlign:'center',
  lineHeight:'30px',
  marginTop:'0px',
  cursor:'pointer',
  fontSize:'15px'
}

const divPrevisualizacion = {
    padding: '5%'
}

class MultipleImageUploadComponent extends React.Component {

  onChangeI = (imageList) => {
    this.props.onChangeI(imageList);
  }

  getImagenes = () => { return this.state.listadoImagenes }

    render() {
        return (
<div className="App">
  <ImageUploading 
    onChange={this.onChangeI}
    maxNumber={maxNumber}
    multiple
    maxFileSize={maxMbFileSize}
    acceptType={["jpg", "gif", "png"]}
  >
    {({ imageList, onImageUpload, onImageRemoveAll }) => (
      // write your building UI
      <div className="upload__image-wrapper">
        <button className="btn btn-danger" onClick={onImageUpload}>Agregar</button>&nbsp;
        <button className="btn btn-secondary" onClick={onImageRemoveAll}>Borrar todas</button>
        {imageList.map(image => (
          <div key={image.key} className="image-item">
            <img src={image.dataURL} style={multipreview} alt="Ocurrio un problema al previsualizar..." />
            <div className="image-item__btn-wrapper">
                <button className="btn btn-warning" onClick={image.onRemove}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    )}
  </ImageUploading>
</div>
            // <div className="row justify-content-center">
            //     <br/>
            //     <br/>
            //     <div className="col-12 col-sm-12 col-md-12 col-lg-12">
            //         <div className="form-group">
            //             <ImageUploading
            //                 onChange={this.onChangeI}
            //                 maxNumber={maxNumber}
            //                 multiple
            //                 maxFileSize={maxMbFileSize}
            //                 acceptType={["jpg", "gif", "png"]}
            //             >
            //                 {({ imageList, onImageUpload, onImageRemoveAll }) => (
            //                 // write your building UI
            //                     <div>
            //                         <div className="row">
            //                             <div className="col-lg-12">
            //                                 <button className="btn btn-danger" onClick={onImageUpload}>Agregar</button>
            //                                 <button className="btn btn-secondary" onClick={onImageRemoveAll}>Borrar todas</button>
            //                             </div>
            //                         </div>
                                    
            //                         <div className="row">
            //                             <div className="col-lg-12">
            //                                 {imageList.map((image) => (
            //                                     <div key={image.key}>
            //                                         <img src={image.dataURL} style={multipreview} alt="Ocurrio un problema al previsualizar..." />
            //                                         {/* <button style={boton_carga_imagen} onClick={image.onUpdate}>Update</button> */}
            //                                         <button className="btn btn-warning" onClick={image.onRemove}>Eliminar</button>
            //                                     </div>
            //                                 ))}
            //                             </div>
            //                         </div>
            //                     </div>
            //                 )}
            //             </ImageUploading>
            //         </div>
            //     </div>
            // </div>
        )
    }
}

export default MultipleImageUploadComponent;