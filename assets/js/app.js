import React from 'react';
import ReactDOM from 'react-dom';
import Otro from './Components/otro';
require("../css/app.css");
 

class App extends React.Component {

  // ref: https://gist.github.com/darklilium/183ce1405788f2aef7e8
    render() {
      return (
        <div>
          <h1>Hola soy el amigo</h1>
          <Otro></Otro>
        </div>
      );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);