import React, { Component } from 'react';

const hide  = {
  display: "none"
}
const custom_file_upload = {
  "borderRadius": "25px",   
  "textTransform": "uppercase",
  "background": "none",
  "border": "2px solid rgb(21, 61, 87)",
  "color": "rgb(21, 61, 87)"
}

const file_preview  ={
  margin: "0 10px"
}

const formatosAceptados = ["image/jpeg","image/gif","image/png","application/pdf","image/x-eps"];

class SubidaArchivos extends React.Component {
  constructor() {
    super();
    this.state = {
      // Initially, no file is selected 
      selectedFile: null,
      // inicialmente no hay error de formato de archivo (solo se aceptan imagenes o pdf)
      errorFormato: false,
    };
  }

  // On file select (from the pop up) 
  onFileChange = event => { 

    let tipoArchivoSubido = event.target.files[0].type;

    if(formatosAceptados.includes(tipoArchivoSubido)) {
      // Update the state 
      this.setState({ selectedFile: event.target.files[0] }); 
      this.setState({errorFormato: false});
      this.props.onChangeValue(event.target.files[0] );
    }
    else 
    {
      this.setState({errorFormato: true});
    }
  };
  
   // File content to be displayed after 
   // file upload is complete 
   fileData = () => { 
     
      if (this.state.selectedFile && this.state.errorFormato == false) { 
          
        return ( 
          <div> 
            <b>Archivo adjuntado:</b> 
            <p>Nombre: {this.state.selectedFile.name}</p> 
            {/* <p>File Type: {this.state.selectedFile.type}</p>  */}
            {/* <p> 
              Last Modified:{" "} 
              {this.state.selectedFile.lastModifiedDate.toDateString()} 
            </p>  */}
          </div> 
        ); 
      }
      else if(this.state.errorFormato) {
        return (
          <div> 
            <b>Solo se permiten subir archivos en formato PDF/PNG/JPEG</b> 
          </div> 
        )
      } 
      else 
      { 
        return ( 
          <div> 
            <b>No se han adjuntado ningun archivo</b> 
          </div> 
        ); 
      } 
  }; 

  render() {
    return (
      <div>
        <p>{this.props.nombreBoton}</p>
          <label className="btn btn-primary" style={custom_file_upload}>
              <input 
                  style={hide} 
                  type="file" 
                  onChange={this.onFileChange}
                  accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
              />
            <span className="glyphicon glyphicon-upload"> Subir</span>
          </label>
        {this.fileData()} 
      </div>
    );
  }
}

export default SubidaArchivos;