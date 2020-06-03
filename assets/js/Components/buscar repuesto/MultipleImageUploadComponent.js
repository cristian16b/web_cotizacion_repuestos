import React, { Component } from 'react';
import './estilos.js';
import ImageUploading from 'react-images-uploading';

const maxNumber = 10;
const maxMbFileSize = 5 * 1024 * 1024; // 5Mb

class MultipleImageUploadComponent extends React.Component {

    // fileObj = [];
    // fileArray = [];

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         file: [null]
    //     }
    //     this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
    //     this.uploadFiles = this.uploadFiles.bind(this)
    // }

    // uploadMultipleFiles(e) {
    //     this.fileObj.push(e.target.files)
    //     for (let i = 0; i < this.fileObj[0].length; i++) {
    //         this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
    //     }
    //     this.setState({ file: this.fileArray })
    // }

    // uploadFiles(e) {
    //     e.preventDefault()
    //     console.log(this.state.file)
    // }

    onChange = (imageList) => {
        // data for submit
        console.log(imageList);
    };

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <div className="form-group">
                        <ImageUploading
                            onChange={this.onChange}
                            maxNumber={maxNumber}
                            multiple
                            maxFileSize={maxMbFileSize}
                            acceptType={["jpg", "gif", "png"]}
                        >
                            {({ imageList, onImageUpload, onImageRemoveAll }) => (
                            // write your building UI
                            <div className="row">
                                <div className="col-lg-12">
                                    <button className="btn btn-danger" onClick={onImageUpload}>Agregar</button>
                                    <button className="btn btn-info" onClick={onImageRemoveAll}>Borrar todas</button>
                        
                                    {imageList.map((image) => (
                                    <div key={image.key}>
                                        <img src={image.dataURL}   alt="Ocurrio un problema al previsualizar..." />
                                        {/* <button style={boton_carga_imagen} onClick={image.onUpdate}>Update</button> */}
                                        <button className="btn btn-info" onClick={image.onRemove}>Borrar</button>
                                    </div>
                                    ))}
                                </div>
                            </div>
                            )}
                        </ImageUploading>
                    </div>
                </div>
            </div>
            // <form>
            //     <div className="row justify-content-center">
            //         <div className="col-lg-12">
            //             <div className="form-group">
            //                 {(this.fileArray || []).map(url => (
            //                     <div className="row">
            //                         <div className="col-lg-12">
            //                             <img src={url} style={multipreview} alt="Ocurrio un problema al previsualizar..." />
            //                             <label className="btn btn-danger" style={ boton_subir_fotos }>
            //                         Agregar foto
            //                         <input  key={url} style={boton_carga_imagen} type="file" className="uploadFile img" onChange={this.uploadMultipleFiles} multiple />
            //                     </label>
            //                         </div>
            //                     </div>
            //                 ))}
            //             </div>
            //         </div>
            //     </div>
            //     <div className="row">
            //             <div className="col-lg-5">
            //                 <div className="form-group">
            //                     <label className="btn btn-danger" style={ boton_subir_fotos }>
            //                         Agregar foto
            //                         <input style={boton_carga_imagen} type="file" className="uploadFile img" onChange={this.uploadMultipleFiles} multiple />
            //                     </label>
            //                 </div>
            //             </div>
            //     </div>
            //     {/* <button type="button" className="btn btn-danger btn-block" onClick={this.uploadFiles}>Upload</button> */}
            // </form >
        )
    }
}

export default MultipleImageUploadComponent;