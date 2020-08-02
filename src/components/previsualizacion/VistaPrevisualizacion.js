import React from 'react';
import BarraPDF from './BarraPDF';
import './estilosvp.css';

class VistaPrevisualizacion extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>

        <h1>VistaPrevisualizacion</h1>
        

        <div class="split left">
          <div class="centered">
            <BarraPDF />
          </div>
        </div>

        <div class="split right">
          <div class="centered">
            <h2>PDF</h2>
            <p>Aquí irá el previsualizador de pdf</p>
          </div>
        </div>

      </>
    );
  }

}

export default VistaPrevisualizacion;