import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hola! Este es el archivo <code>src/App.js</code>. En este archivo va el contenido principal de la aplicación.<br/>
          La estructura presentada aquí es la más simple, una <code>function</code> que solo renderiza HTML.<br/>
          Las estructuras <code>class</code> permiten guardar información adicional en su <code>state</code> y pasarla a sus componentes mediante <code>props</code>.
        </p>
        <p>
          Para crear nuevos componentes se crea un archivo <code>NombreComponente.js</code> en la carpeta <code>src/components</code>.<br/>
          CamelCase es un estándar de escritura de código en JavaScript.<br/>
          Idealmente los componentes asociados deben mantenerse juntos en un módulo (por ejemplo, los componentes de diagramación deberían ir en <code>src/components/graph</code>).
        </p>
        <p>
          Para que un componente pueda ser usado por otros componentes debe añadirse al final la línea <code>export default NombreComponente;</code>
        </p>
      </header>
    </div>
  );
}

export default App;
