import React from 'react';
import './App.css';
import Estructura from './components/estructura/Estructura.js';
import { Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import Ajustes from './components/ajustes/Ajustes';
import ListaRequisitos from './components/listaRequisitos/ListaRequisitos';
import PuntosFuncion from './components/puntosFuncion/PuntosFuncion';
import Ders from './components/ders/Ders';
import AnalisisRepago from './components/analisisRepago/AnalisisRepago';
import draftToHtml from 'draftjs-to-html';
import jsPDF from 'jspdf';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreProyecto: "",
      tiposRequisitos: [
        {
          id: 0,
          nombre: "Funcional",
          descripcion: "Define una función del sistema"
        },
        {
          id: 1,
          nombre: "No Funcional",
          descripcion: "Define una característica del sistema"
        }
      ],
      textoDers: [],
      requisitosUsuario: [],
      requisitosSistema: [],
      puntosFuncion: {
        entradas: [0, 0, 0],
        salidas: [0, 0, 0],
        consultas: [0, 0, 0],
        ie: [0, 0, 0],
        ali: [0, 0, 0],
      },
      tablaAnalisisRepago: [],
    };
  }

  componentDidMount = () => {
    document.title = this.state.nombreProyecto + " - Plantilla de DERS";
  }

  actualizarNombreProyecto = async nombre => {
    await this.setState({nombreProyecto: nombre});
    document.title = this.state.nombreProyecto + " - Plantilla de DERS";
  }

  actualizarTiposRequisitos = listaTipos => {
    this.setState({tiposRequisitos: listaTipos})
  }

  actualizarRequisitosUsuario = listaRequisitos => {
    this.setState({requisitosUsuario: listaRequisitos});
  }

  actualizarRequisitosSistema = listaRequisitos => {
    this.setState({requisitosSistema: listaRequisitos});
  }

  actualizarPuntosFuncion = pf => {
    this.setState({puntosFuncion: pf});
  }

  actualizarTextoDers = infoDers => {
    this.setState({textoDers: infoDers});
  }

  actualizarTablaAnalisisRepago = tabla => {
    this.setState({tablaAnalisisRepago: tabla});
  }

  dersToHTML = () =>
  {
    var data = this.state.textoDers;
    var htmlContent = "<h3>DERS</h3>";
    for(var i = 0; i< data.length; i++)
      htmlContent += "<div> <h3>" + data[i].title + "</h3>" + draftToHtml(data[i].description) + "</div>";
    return htmlContent;
  }

  requisitosToHTML = () =>
  {
    var usuario = this.state.requisitosUsuario;
    var sistema = this.state.requisitosSistema;
    var htmlContent = "<h3> Requisitos </h3>\n<dl>\n";
    for(var i=0; i<usuario.length; i++)
    {
      htmlContent += "\t<dt> RU:" + usuario[i].id + usuario[i].nombre + "( " + usuario.tipo + " )</dt>\n";
      for(var j=0; j<sistema.length;j++)
        if (sistema[j].refRU === usuario[i].id)
          htmlContent += "\t\t<dd> RS:" + sistema[i].id + sistema[i].nombre + "( " + sistema.tipo + " )</dd>\n";
    }
    htmlContent += "</dl>\n";
    console.log(htmlContent);
    return htmlContent
  }

  puntosFuncionToHTML = () =>
  {
    var puntos = this.state.puntosFuncion;
    /*
    entradas: [0, 0, 0],
    salidas: [0, 0, 0],
    consultas: [0, 0, 0],
    ie: [0, 0, 0],
    ali: [0, 0, 0],
    */
    var htmlContent = "<h3>Puntos de Función</h3>\n<table>\n\t<tr>\n\t\t<th> </th>\n\n\t\t<th>Simple</th>\n\t\t<th>Media</th>\n\t\t<th>Compleja</th>\n\t</tr>\n";
    htmlContent += "\t<tr>\n\t\t<th>Entradas</th>\n\t\t<th>" + puntos.entradas[0] + "</th>\n\t\t<th>" + puntos.entradas[1] + "</th>\n\t\t<th>" + puntos.entradas[2] + "</th>\n\t</tr>\n";
    htmlContent += "\t<tr>\n\t\t<th>Salidas</th>\n\t\t<th>" + puntos.salidas[0] + "</th>\n\t\t<th>" + puntos.salidas[1] + "</th>\n\t\t<th>" + puntos.salidas[2] + "</th>\n\t</tr>\n";
    htmlContent += "\t<tr>\n\t\t<th>Consultas</th>\n\t\t<th>" + puntos.consultas[0] + "</th>\n\t\t<th>" + puntos.consultas[1] + "</th>\n\t\t<th>" + puntos.consultas[2] + "</th>\n\t</tr>\n";
    htmlContent += "\t<tr>\n\t\t<th>Interfaces Externas</th>\n\t\t<th>" + puntos.ie[0] + "</th>\n\t\t<th>" + puntos.ie[1] + "</th>\n\t\t<th>" + puntos.ie[2] + "</th>\n\t</tr>\n";
    htmlContent += "\t<tr>\n\t\t<th>Archivos Lógicos Internos</th>\n\t\t<th>" + puntos.ali[0] + "</th>\n\t\t<th>" + puntos.ali[1] + "</th>\n\t\t<th>" + puntos.ali[2] + "</th>\n\t</tr>\n</table>";
    console.log(htmlContent);
    return htmlContent;
  }

  repagoToHTML = () =>
  {
    //{ id: 0, texto: "Año " + 0, valores: generarValores() },
    var repago = this.state.tablaAnalisisRepago;
    var htmlContent = "<h3>Análisis de Repago</h3>\n<table>\n\t<tr>\n";
  
    for(var i=0; i<repago.length; i++) 
      htmlContent += "\t\t<th>" + repago[i].texto + "</th>\n";
    
    htmlContent+= "\t</tr>\n";

    for(var i =0; i<repago[0].valores.length; i++)
    {
      htmlContent += "\t<tr>\n";
      for(var j=0; j<repago.length; j++)
        htmlContent += "\t\t<th>" + repago[j].valores[i] + "</th>\n";
      htmlContent += "\t</tr>\n";
    }
    return htmlContent;
  }

  toPDF = () =>
  {
    var doc = new jsPDF("p", "mm", "a4", true, "smart");
    doc.fromHTML
    ( this.requisitosToHTML(),
      15,
      5,
      {  'width': 170,}
    );
    doc.addPage();
    doc.fromHTML
    ( this.puntosFuncionToHTML(),
      15,
      5,
      {  'width': 170,}
    );
    doc.addPage();
    doc.fromHTML
    ( this.repagoToHTML(),
      15,
      5,
      {  'width': 170,}
    );
    doc.addPage();
    doc.fromHTML
    ( this.dersToHTML(),
      15,
      5,
      {  'width': 170,}
    );
    doc.save(this.state.nombreProyecto + ".pdf");
  }

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Estructura nombreProyecto={this.state.nombreProyecto} actualizarNombreProyecto={this.actualizarNombreProyecto} toPDF = {this.toPDF}/>
        <main className="App-main">
          <Switch>
            {/* Ejemplos de uso de Route path: */}
            <Route path="/ders">
              <Ders 
                textoDers={this.state.textoDers}
                actualizarInfoDers={this.actualizarTextoDers}
              />
            </Route>
            <Route path="/requisitos" >
              <ListaRequisitos
                requisitosUsuario={this.state.requisitosUsuario}
                requisitosSistema={this.state.requisitosSistema}
                tiposRequisitos={this.state.tiposRequisitos}
                actualizarRequisitosUsuario={this.actualizarRequisitosUsuario}
                actualizarRequisitosSistema={this.actualizarRequisitosSistema}
              />
            </Route>
            <Route path="/tablas" >
              {/* Acá iría el componente de tablas y calculos, aunque no sé si eso deba ser un componente */}
              <div><p>Tablas</p></div> {/* Reemplazable! */}
              {/* Sus hijos deberían serlo, y esos deben llevar un path distinto */}
            </Route>
            <Route path="/ajustes">
              <Ajustes tiposRequisitos={this.state.tiposRequisitos} actualizarTipos={this.actualizarTiposRequisitos}
              />
            </Route>
            <Route path="/puntosFuncion">
              <PuntosFuncion puntos={this.state.puntosFuncion} actualizar={this.actualizarPuntosFuncion}/>
            </Route>
            <Route path="/analisisRepago">
              <AnalisisRepago 
                tablaAnalisisRepago={this.state.tablaAnalisisRepago}
                actualizar={this.actualizarTablaAnalisisRepago}
              />
            </Route>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
