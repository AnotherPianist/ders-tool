import React from 'react';
import BarraPDF from './BarraPDF';
import Visorpdf2 from './Visorpdf';
import './estilosvp.css';
import samplePDF from "./prueba.pdf";

class VistaPrevisualizacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DERS: false,
      ListadeRequisitos: false,
      TarjetasdeVolere: false,
      Casosdeuso: false,
      AjustesAmbientales: false,
      PuntosdeFunción: false,
      AnálisisdeRepago: false
    };
  }

  recibirEstados = () => (datoUno, ListadeRequisitos, TarjetasdeVolere, Casosdeuso, AjustesAmbientales, PuntosdeFunción, AnálisisdeRepago) =>  {
    
    this.setState({DERS: datoUno});
    this.setState({ListadeRequisitos: ListadeRequisitos});
    this.setState({TarjetasdeVolere: TarjetasdeVolere});
    this.setState({Casosdeuso: Casosdeuso});
    this.setState({AjustesAmbientales: AjustesAmbientales});
    this.setState({PuntosdeFunción: PuntosdeFunción});
    this.setState({AnálisisdeRepago: AnálisisdeRepago});
  }

  render() {
    return (
      <>

        <h1>VistaPrevisualizacion</h1>
        

        <div class="split left">
          <div class="centered">
            <BarraPDF recibirEstados={this.recibirEstados}/> 
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