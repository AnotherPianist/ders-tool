import React from "react";
import "./App.css";
import Estructura from "./components/estructura/Estructura.js";
import { Switch, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Ajustes from "./components/ajustes/Ajustes";
import ListaRequisitos from "./components/listaRequisitos/ListaRequisitos";
import PuntosFuncion from "./components/puntosFuncion/PuntosFuncion";
import Ders from "./components/ders/Ders";
import PestanasCasosDeUsos from "./components/casosDeUso/PestanasCasosDeUsos";
import AnalisisRepago from "./components/analisisRepago/AnalisisRepago";
import VistaPrevisualizacion from './components/previsualizacion/VistaPrevisualizacion';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreProyecto: "",
      tiposRequisitos: [
        {
          id: 0,
          nombre: "Funcional",
          descripcion: "Define una función del sistema",
        },
        {
          id: 1,
          nombre: "No Funcional",
          descripcion: "Define una característica del sistema",
        },
      ],
      textoDers: [],
      requisitos: [],
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
  };

  actualizarNombreProyecto = async (nombre) => {
    await this.setState({ nombreProyecto: nombre });
    document.title = this.state.nombreProyecto + " - Plantilla de DERS";
  };

  actualizarTiposRequisitos = (listaTipos) => {
    this.setState({ tiposRequisitos: listaTipos });
  };

  actualizarRequisitos = async listaRequisitos => {
    await this.setState({requisitos: listaRequisitos});
  }

  actualizarPuntosFuncion = (pf) => {
    this.setState({ puntosFuncion: pf });
  };

  actualizarTextoDers = (infoDers) => {
    this.setState({ textoDers: infoDers });
  };

  actualizarTablaAnalisisRepago = (tabla) => {
    this.setState({ tablaAnalisisRepago: tabla });
  };

  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Estructura
          nombreProyecto={this.state.nombreProyecto}
          actualizarNombreProyecto={this.actualizarNombreProyecto}
        />
        <main className="App-main">
          <Switch>
            {/* Ejemplos de uso de Route path: */}
            <Route path="/ders">
              <Ders
                textoDers={this.state.textoDers}
                actualizarInfoDers={this.actualizarTextoDers}
              />
            </Route>
            <Route path="/requisitos">
              <ListaRequisitos
                requisitos={this.state.requisitos}
                tiposRequisitos={this.state.tiposRequisitos}
                actualizar={this.actualizarRequisitos}
              />
            </Route>
            <Route path="/casos">
              <PestanasCasosDeUsos
                requisitos={this.state.requisitos}
                actualizarRequisitos={this.actualizarRequisitos}
              />
            </Route>
            <Route path="/tablas">
              {/* Acá iría el componente de tablas y calculos, aunque no sé si eso deba ser un componente */}
              <div>
                <p>Tablas</p>
              </div>{" "}
              {/* Reemplazable! */}
              {/* Sus hijos deberían serlo, y esos deben llevar un path distinto */}
            </Route>
            <Route path="/ajustes">
              <Ajustes
                tiposRequisitos={this.state.tiposRequisitos}
                actualizarTipos={this.actualizarTiposRequisitos}
              />
            </Route>
            <Route path="/previsualizar">
              <VistaPrevisualizacion/>
            </Route>
            <Route path="/puntosFuncion">
              <PuntosFuncion
                puntos={this.state.puntosFuncion}
                actualizar={this.actualizarPuntosFuncion}
              />
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
