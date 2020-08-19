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

  onError = (errors, files) => {
    console.log(errors, files);
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
                    onError={this.onError}
                >
                    {({ imageList, onImageUpload, onImageRemoveAll , errors }) => (
                    // write your building UI
                        <div className="upload__image-wrapper">
                            <div className="row">
                                <div className="col-12 col-md-12 col-lg-12">
                                    <button className="btn btn-danger" onClick={onImageUpload}>Agregar</button>&nbsp;
                                    <button className="btn btn-secondary" onClick={onImageRemoveAll}>Borrar todas</button>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="col-12 col-md-12 col-lg-12">
                                    {errors.maxNumber && <span className="text-danger error_negrita">La cantidad de imagenes seleccionadas exede el limite.&nbsp;</span>}
                                    {errors.acceptType && <span className="text-danger error_negrita">Solo pueden subir archivos con formato (.png o .jpg).&nbsp;</span>}
                                    {errors.maxFileSize && <span className="text-danger error_negrita">El tamaño del archivo excede los 5 megabytes.&nbsp;</span>}
                                    {errors.resolution && <span className="text-danger error_negrita">Selected file is not match your desired resolution.&nbsp;</span>}
                                </div>
                            </div>
                            {imageList.map(image => (
                                <div className="row">
                                    <div className="col-12 col-md-12 col-lg-12">
                                        <div key={image.key} className="image-item">
                                            <img src={image.dataURL} style={multipreview} alt="Ocurrio un problema al previsualizar..." />
                                            <div className="image-item__btn-wrapper">
                                                <button className="btn btn-warning" onClick={image.onRemove}>Eliminar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ImageUploading>
            </div>
        )
    }
}

export default MultipleImageUploadComponent;