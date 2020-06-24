import React from 'react';
import {useDropzone} from 'react-dropzone';

function SubidaArchivos(props) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>{props.descripcion}</p>
      </div>
      <aside>
        <h5>Archivo</h5>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

export default SubidaArchivos;