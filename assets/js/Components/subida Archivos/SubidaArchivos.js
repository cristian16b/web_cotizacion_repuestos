import React, { Component } from 'react';

const hide  = {
  display: "none"
}
const custom_file_upload = {
  "border-radius": "25px",   
  "text-transform": "uppercase",
  "background": "none",
  "border": "2px solid rgb(21, 61, 87)",
  "color": "rgb(21, 61, 87)"
}

const file_preview  ={
  margin: "0 10px"
}

class SubidaArchivos extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      files: [],
    };
  }

  onChange(e) {
    var files = e.target.files;
    console.log(files);
    var filesArr = Array.prototype.slice.call(files);
    console.log(filesArr);
    this.setState({ files: [...this.state.files, ...filesArr] });
  }
  
  removeFile(f) {
       this.setState({ files: this.state.files.filter(x => x !== f) }); 
  }

  render() {
    return (
      <div>
        <p>{this.props.nombreBoton}</p>
        <label className="btn btn-primary" style={custom_file_upload}>
           <input style={hide} type="file" multiple onChange={this.onChange} />
           <i className="glyphicon glyphicon-upload" /> Subir
        </label>
        {
        this.state.files.map
              (x => 
                <div id={x} className="file-preview" onClick={this.removeFile.bind(this, x)}>
                  {x.name}
                </div>
              )
        }
      </div>
    );
  }
}

export default SubidaArchivos;