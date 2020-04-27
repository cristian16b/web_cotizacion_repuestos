import React from 'react';
import ReactDOM from 'react-dom';
import BarraSuperior from './Components/barra superior/barraSuperior';
require("../css/app.css");
import 'bootstrap/dist/css/bootstrap.css';
import PiePagina from './Components/pie de pagina/piePagina';
 
class App extends React.Component {

  // ref: https://gist.github.com/darklilium/183ce1405788f2aef7e8
    render() {
      return (
        <div>
            <div className="container">
              <div className="row">
                <p></p>
              </div>
            </div>
        </div>
      );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

ReactDOM.render(
  <BarraSuperior />,
  document.getElementById('barraSuperior')
);

ReactDOM.render(
  <PiePagina />,
  document.getElementById('piePagina')
);