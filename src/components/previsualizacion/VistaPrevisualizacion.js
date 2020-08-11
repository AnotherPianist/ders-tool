import React from 'react';
import BarraPDF from './BarraPDF';
import './estilosvp.css';
import { Container } from '@material-ui/core';
import draftToHtml from 'draftjs-to-html';
import jsPDF from 'jspdf';

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
      AnalisisdeRepago: true,
      pdfUrl : this.toPDF(true,true,true,true,true,true,true)
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
      AnalisisdeRepago: AnalisisdeRepago,
      pdfUrl : this.toPDF(datoUno, ListadeRequisitos,TarjetasdeVolere,Casosdeuso,AjustesAmbientales,PuntosdeFunción,AnalisisdeRepago)
    });
  }

  dersToHTML = () =>
  {
    const data = this.props.state.textoDers;
    let htmlContent = "<h3>DERS</h3>";
    for(const d of data)
      htmlContent += "<div>\n<h3>" + d.title + "</h3>\n\t" + draftToHtml(d.description) + "</div>\n";
    console.log(htmlContent);
    return htmlContent;
  }

  requisitosToHTML = () =>
  {
    const requisitos = this.props.state.requisitos;
    let htmlContent = "<h3> Requisitos </h3>\n<dl>\n";
    for (const requisito of requisitos)
    {
      if (requisito.isRU)
        htmlContent += `\t<dt>RU${requisito.id}: ${requisito.nombre} (${requisito.tipo})</dt>\n`;
      else
        htmlContent += `\t\t<dd>RS${requisito.id}: ${requisito.nombre} (${requisito.tipo})</dd>\n`;
    }
    htmlContent += "</dl>\n";
    //console.log(htmlContent);
    return htmlContent
  }

  puntosFuncionToHTML = () =>
  {
    const puntos = this.props.state.puntosFuncion;
    /*
    entradas: [0, 0, 0],
    salidas: [0, 0, 0],
    consultas: [0, 0, 0],
    ie: [0, 0, 0],
    ali: [0, 0, 0],
    */
    let htmlContent = "<h3>Puntos de Función</h3>\n<table>\n\t<tr>\n\t\t<th> </th>\n\n\t\t<th>Simple</th>\n\t\t<th>Media</th>\n\t\t<th>Compleja</th>\n\t</tr>\n";
    htmlContent += `\t<tr>\n\t\t<th>Entradas</th>\n\t\t<th>${puntos.entradas[0]}</th>\n\t\t<th>${puntos.entradas[1]}</th>\n\t\t<th>${puntos.entradas[2]}</th>\n\t</tr>\n`;
    htmlContent += `\t<tr>\n\t\t<th>Salidas</th>\n\t\t<th>${puntos.salidas[0]}</th>\n\t\t<th>${puntos.salidas[1]}</th>\n\t\t<th>${puntos.salidas[2]}</th>\n\t</tr>\n`;
    htmlContent += `\t<tr>\n\t\t<th>Consultas</th>\n\t\t<th>${puntos.consultas[0]}</th>\n\t\t<th>${puntos.consultas[1]}</th>\n\t\t<th>${puntos.consultas[2]}</th>\n\t</tr>\n`;
    htmlContent += `\t<tr>\n\t\t<th>Interfaces Externas</th>\n\t\t<th>${puntos.ie[0]}</th>\n\t\t<th>${puntos.ie[1]}</th>\n\t\t<th>${puntos.ie[2]}</th>\n\t</tr>\n`;
    htmlContent += `\t<tr>\n\t\t<th>Archivos Lógicos Internos</th>\n\t\t<th>${puntos.ali[0]}</th>\n\t\t<th>${puntos.ali[1]}</th>\n\t\t<th>${puntos.ali[2]}</th>\n\t</tr>\n</table>`;
    //console.log(htmlContent);
    return htmlContent;
  }

  repagoToHTML = () =>
  {
    //{ id: 0, texto: "Año " + 0, valores: generarValores() },
    const repago = this.props.state.tablaAnalisisRepago;
    let htmlContent = "<h3>Análisis de Repago</h3>\n<table>\n\t<tr>\n";
  
    for(const r of repago) 
      htmlContent += `\t\t<th>${r.texto}</th>\n`;
    
    htmlContent+= "\t</tr>\n";

    if (repago[0] !== undefined) {
      for(let i = 0; i < repago[0].valores.length; i++)
      {
        htmlContent += "\t<tr>\n";
        for(const r of repago)
          htmlContent += `\t\t<th>${r.valores[i]}</th>\n`;
        htmlContent += "\t</tr>\n";
      }
    }
    return htmlContent;
  }

  toPDF = (ders,requisito, volere, casos, ambiental, puntos, analisis) =>
  {
    var doc = new jsPDF("p", "mm", "a4", true, "smart");
    if(requisito === true)
    {
      doc.fromHTML
      ( this.requisitosToHTML(),
        15,
        5,
        {  'width': 170,}
      );
      doc.addPage();
    }
    if(puntos === true)
    {
      doc.fromHTML
      ( this.puntosFuncionToHTML(),
        15,
        5,
        {  'width': 170,}
      );
      doc.addPage();
    }
    if(analisis === true)
    {
      doc.fromHTML
      ( this.repagoToHTML(),
        15,
        5,
        {  'width': 170,}
      );
      doc.addPage();
    }
    if(ders === true)
    {
      doc.fromHTML
      ( this.dersToHTML(),
        15,
        5,
        {  'width': 170,}
      );
    }
    //doc.save(this.props.nombreProyecto + ".pdf");
    var pdfUrl = doc.output('datauristring');
    return pdfUrl;
  }

  render() {
    return (
      <>
        <Container class='left'>
          <BarraPDF recibirEstados={this.recibirEstados()}/> 
        </Container>
        <Container class='right'>
          <iframe title="pdf" src={this.state.pdfUrl} style={{width: "100%", height: "100%"}}/>
        </Container>
      </>
    );
  }

}

export default VistaPrevisualizacion;
