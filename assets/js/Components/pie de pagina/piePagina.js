import React , { Component } from 'react';

class PiePagina extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
        <footer className="py-5 bg-dark">
            <div className="container">
                <p className="m-0 text-center text-white">Copyright &copy; Your Website 2019</p>
            </div>
        </footer>
    );
  }
}

export default PiePagina;