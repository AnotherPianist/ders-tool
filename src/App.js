import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import ListaHerramientas from "./components/ListaHerramientas.js";
import TopBar from "./components/topBar.jsx";
import { Switch, Route } from "react-router-dom";
import Ders from "./components/ders/Ders";
import logo from './logo.svg';
import './App.css'; 
import PuntosFuncion from './Components/PuntosFuncion.js';
import { CssBaseline } from '@material-ui/core';
import Estructura from './components/estructura/Estructura.js';
import TablaAnalisisRepago from '../src/components/TablaAnalisisRepago';
import AnalisisRepago from '../src/Vistas/AnalisisRepago';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{display: "flex"}}>
        <CssBaseline />
        <Estructura />
        <main>
          <Switch>
            {/* Ejemplos de uso de Route path: */}
            <Route path="/ders">
              {/* Acá iría el componente de DERS, aunque no sé si eso deba ser un componente */}
              <div>
                <p>Ders</p>
              </div>{" "}
              {/* Reemplazable! */}
              <div>
                <Ders />
              </div>
              {/* Sus hijos deberían serlo, y esos deben llevar un path distinto */}
            </Route>
            <Route path="/requisitos">
              {/* Acá iría el componente de requisitos, aunque no sé si eso deba ser un componente */}
              <div>
                <p>Requisitos</p>
              </div>{" "}
              {/* Reemplazable! */}
              {/* Sus hijos deberían serlo, y esos deben llevar un path distinto */}
            </Route>
            <Route path="/tablas">
              {/* Acá iría el componente de tablas y calculos, aunque no sé si eso deba ser un componente */}
              <div>
                <p>Tablas</p>
              </div>{" "}
              {/* Reemplazable! */}
              <div>
                <PuntosFuncion/>
              </div>
              {/* Sus hijos deberían serlo, y esos deben llevar un path distinto */}
            </Route>
            <Route path="/repago">
              <div>
                <p>Análisis de Repago</p>
              </div>
              <div>
                <AnalisisRepago/>
              </div>
            </Route>
          </Switch>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default App;
