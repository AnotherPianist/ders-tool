import React from 'react';
import PropTypes from 'prop-types';
import Estructura from './components/estructura/Estructura.js';
import { Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import Ajustes from './components/ajustes/Ajustes';
import ListaRequisitos from './components/listaRequisitos/ListaRequisitos';
import PuntosFuncion from './components/puntosFuncion/PuntosFuncion';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      requisitosUsuario: [],
      requisitosSistema: [],
      puntosFuncion: {
        entradas: [0, 0, 0],
        salidas: [0, 0, 0],
        consultas: [0, 0, 0],
        ie: [0, 0, 0],
        ali: [0, 0, 0],
      }
    };
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

  render() {
    return (
      <div style={{display: "flex"}}>
        <CssBaseline />
        <Estructura />
        <main style={{marginTop: "4rem"}}>
          <Switch>
            {/* Ejemplos de uso de Route path: */}
            <Route path="/ders">
              {/* Acá iría el componente de DERS, aunque no sé si eso deba ser un componente */}
              <div><p>Ders</p></div> {/* Reemplazable! */}
              {/* Sus hijos deberían serlo, y esos deben llevar un path distinto */}
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
