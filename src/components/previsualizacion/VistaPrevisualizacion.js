import React from 'react';
import BarraPDF from './BarraPDF';
import './estilosvp.css';
import prueba from './prueba.pdf';
import { Container } from '@material-ui/core';

class VistaPrevisualizacion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DERS: true,
      ListadeRequisitos: true,
      TarjetasdeVolere: true,
      Casosdeuso: true,
      AjustesAmbientales: true,
      PuntosdeFunción: true,
      AnalisisdeRepago: true
    };
  }

  recibirEstados = () => (datoUno, ListadeRequisitos, TarjetasdeVolere, Casosdeuso, AjustesAmbientales, PuntosdeFunción, AnalisisdeRepago) =>  {
    this.setState({
      DERS: datoUno,
      ListadeRequisitos: ListadeRequisitos,
      TarjetasdeVolere: TarjetasdeVolere,
      Casosdeuso: Casosdeuso,
      AjustesAmbientales: AjustesAmbientales,
      PuntosdeFunción: PuntosdeFunción,
      AnalisisdeRepago: AnalisisdeRepago
    });
  }

  render() {
    return (
      <>
        <Container class='left'>
          <BarraPDF recibirEstados={this.recibirEstados}/> 
        </Container>
        <Container class='right'>
          <iframe title="pdf" src={prueba} style={{width: "100%", height: "100%"}}/>
        </Container>
      </>
    );
  }

}

export default VistaPrevisualizacion;
