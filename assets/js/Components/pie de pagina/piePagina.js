import React , { Component } from 'react';

class PiePagina extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
        <footer class="py-5 bg-dark">
            <div class="container">
                <p class="m-0 text-center text-white">Copyright &copy; Your Website 2019</p>
            </div>
        </footer>
    );
  }
}

export default PiePagina;