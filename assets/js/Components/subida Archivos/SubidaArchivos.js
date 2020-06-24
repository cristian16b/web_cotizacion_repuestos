import React, { Component } from 'react';

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
        <label className="custom-file-upload">
          <input type="file" multiple onChange={this.onChange} />
          <i className="glyphicon glyphicon-upload" /> Agregar
          <button type="button" class="btn btn-default btn-sm">
          <span class="glyphicon glyphicon-upload"></span>
        </button>
        </label>
        {this.state.files.map(x => 
           <div className="file-preview" onClick={this.removeFile.bind(this, x)}>{x.name}</div>
         )}
      </div>
    );
  }
}

export default SubidaArchivos;