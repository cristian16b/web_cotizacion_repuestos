import React , { Component } from 'react';

class PiePagina extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
        <footer className="py-1 bg-dark fixed-bottom">
            <div className="container">
                <p className="m-0 text-center text-white"></p>
            </div>
        </footer>
    );
  }
}

export default PiePagina;