import React from 'react';
import BarraPDF from './BarraPDF';
import Visorpdf2 from './Visorpdf';
import './estilosvp.css';
import samplePDF from "./prueba.pdf";

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
          <div class="cpdf">
            <Visorpdf2 pdf={samplePDF} />
          </div>
        </div>

      </>
    );
  }

}

export default VistaPrevisualizacion;