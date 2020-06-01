import React, { Component } from 'react';
import './estilos.js';

const multipreview = {
    maxWidth: "500px",
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
//   style="width: 0px;height: 0px;overflow: hidden;"
  const boton_carga_imagen = {
    width: '0px',
    height: '0px',
    overflow: 'hidden'
  }

  const boton_subir_fotos = {
    display:'block',
    borderRadius:'0px',
    boxShadow:'0px 4px 6px 2px rgba(0,0,0,0.2)',
    marginTop:'-5px'
  }

export default class MultipleImageUploadComponent extends Component {

    fileObj = [];
    fileArray = [];

    constructor(props) {
        super(props)
        this.state = {
            file: [null]
        }
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
    }

    uploadMultipleFiles(e) {
        this.fileObj.push(e.target.files)
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
        }
        this.setState({ file: this.fileArray })
    }

    uploadFiles(e) {
        e.preventDefault()
        console.log(this.state.file)
    }

    render() {
        return (
            <form>
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="form-group">
                            {(this.fileArray || []).map(url => (
                                <div className="row">
                                    <div className="col-lg-12">
                                        <img src={url} style={multipreview} alt="Ocurrio un problema al previsualizar..." />
                                        <label className="btn btn-danger" style={ boton_subir_fotos }>
                                    Agregar foto
                                    <input  key={url} style={boton_carga_imagen} type="file" className="uploadFile img" onChange={this.uploadMultipleFiles} multiple />
                                </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="row">
                        <div className="col-lg-5">
                            <div className="form-group">
                                <label className="btn btn-danger" style={ boton_subir_fotos }>
                                    Agregar foto
                                    <input style={boton_carga_imagen} type="file" className="uploadFile img" onChange={this.uploadMultipleFiles} multiple />
                                </label>
                            </div>
                        </div>
                </div>
                {/* <button type="button" className="btn btn-danger btn-block" onClick={this.uploadFiles}>Upload</button> */}
            </form >
        )
    }
}