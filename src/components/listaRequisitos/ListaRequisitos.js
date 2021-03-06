import React from 'react';
import RequisitoUsuario from './RequisitoUsuario';
import RequisitoSistema from './RequisitoSistema';
import CrearRU from './CrearRU';
import CrearRS from './CrearRS';
import VistaActores from './actores/VistaActores';
import { Container, Typography, Card, CardContent, TextField, Grid } from '@material-ui/core';

class ListaRequisitos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {keyCounter: 0};
  }

  crearRU = (n, t) => {
    const requisitos = [];
    let idCounter = 1;
    for (const r of this.props.requisitos) {
      requisitos.push(r);
      if (r.isRU)
        idCounter++;
    }
    requisitos.push({
      key: `${this.state.keyCounter}-${new Date().getTime()}`,
      isRU: true,
      id: idCounter,
      nombre: n,
      tipo: t,
    });
    this.setState({ keyCounter: this.state.keyCounter + 1 });
    this.props.actualizar(requisitos);
  }

  onChangeSuposicion = (n) => {
    this.props.actualizarSuposiciones(n.target.value);
  }

  actualizarActores = (listaActores) => {
    this.props.actualizarActores(listaActores);
  }

  crearRS = (nombre, tipo, ru, invocaA) => {
    const requisitos = [];
    let idCounter = 1;
    let pushed = false;
    for (const r of this.props.requisitos) {
      if (r.isRU) {
        if (!pushed && r.id > ru.id) {
          requisitos.push({
            key: `${this.state.keyCounter}-${new Date().getTime()}`,
            refRU: ru.id,
            id: idCounter++,
            nombre:
              !invocaA ? nombre :
                `Invocar a R${invocaA.isRU ? "U" : "S"}${invocaA.id}: ${invocaA.nombre}`,
            tipo: tipo,
            invocaA: invocaA
          });
          pushed = true;
        }
        requisitos.push(r);
      } else {
        idCounter++;
        requisitos.push(r.refRU <= ru.id ? r : { ...r, id: r.id + 1 });
      }
    }
    if (!pushed)
      requisitos.push({
        key: `${this.state.keyCounter}-${new Date().getTime()}`,
        refRU: ru.id,
        id: idCounter++,
        nombre:
          !invocaA ? nombre :
            `Invocar a R${invocaA.isRU ? "U" : "S"}${invocaA.id}: ${invocaA.nombre}`,
        tipo: tipo,
        invocaA: invocaA
      });
    this.setState({keyCounter: this.state.keyCounter + 1});
    this.props.actualizar(this.actualizarInvocaciones(requisitos));
  }

  editarR = (req, nombre, tipo) => {
    const requisitos = this.props.requisitos.slice();
    for (const r of requisitos) {
      if (r.key === req.key) {
        r.nombre = nombre;
        r.tipo = tipo;
      } else if (r.invocaA && r.invocaA.key === req.key) {
        r.nombre = `Invocar a R${req.isRU ? "U" : "S"}${req.id}: ${nombre}`;
        r.tipo = tipo;
      }
    }
    this.props.actualizar(requisitos);
  }

  eliminarRU = (req) => {
    const requisitos = [];
    let keys = [];
    let rsCounter = 1;
    for (const r of this.props.requisitos) {
      if (!r.isRU && r.refRU === req.id)
        keys.push(r.key);
    }
    for (const r of this.props.requisitos) {
      if (r.isRU && r.key !== req.key)
        requisitos.push(r.id < req.id ? r : {...r, id: r.id - 1});
      else if (!r.isRU && r.refRU !== req.id && (!r.invocaA || r.invocaA.key !== req.key) && (!r.invocaA || !keys.includes(r.invocaA.key))) 
        requisitos.push(r.refRU < req.id ? {...r, id: rsCounter++} : {...r, id: rsCounter++, refRU: r.refRU - 1});
    }
    this.props.actualizar(this.actualizarInvocaciones(requisitos));
  }

  eliminarRS = (req) => {
    const requisitos = [];
    let rsCounter = 1;
    for (const r of this.props.requisitos) {
      if (r.isRU)
        requisitos.push(r);
      else if (r.key !== req.key && (!r.invocaA || r.invocaA.key !== req.key))
        requisitos.push({ ...r, id: rsCounter++ });
    }
    this.props.actualizar(this.actualizarInvocaciones(requisitos));
  }

  obtenerRequisitosSistema = (ru) => {
    const requisitos = this.props.requisitos.map((r) => {
      if (!r.isRU && r.refRU === ru.id)
        return (
          <RequisitoSistema
            key={r.key}
            rs={r}
            tiposRequisitos={this.props.tiposRequisitos}
            editar={this.editarR}
            eliminar={this.eliminarRS}
          />
        );
      return null;
    });
    return requisitos;
  }

  obtenerRequisitosParaInvocar = (req) => {
    const requisitos = [];
    for (const r of this.props.requisitos) {
      if (r.isRU && r.key !== req.key) {
        let canPush = true;
        for (const _r of this.props.requisitos) {
          if (!_r.isRU && _r.invocaA && _r.refRU === req.id && _r.invocaA.id === r.id) {
            canPush = false;
            break;
          }
        }
        if (canPush)
          requisitos.push(r);
      } else if (!r.isRU && r.refRU !== req.id && !r.invocaA)
        requisitos.push(r);
    }
    return requisitos;
  }
  
  actualizarInvocaciones = (requisitos) => {
    const reqs = requisitos.slice();
    for (const r of reqs) {
      if(r.invocaA && reqs.find(requisito => requisito.key === r.invocaA.key)) {
        const req = reqs.find(requisito => requisito.key === r.invocaA.key);
        var invocaA = r.invocaA;
        invocaA.id = req.id;
        r.nombre = `Invocar a R${req.isRU ? "U" : "S"}${req.id}: ${req.nombre}`;
        r.invocaA = invocaA;
      }
    }
    return reqs;
  }

  render() {
    const reqsUsuario = this.props.requisitos.map((r) => {
      if (r.isRU)
        return (
          <Card style={{ marginTop: "1rem", padding: "1rem" }}>
            <RequisitoUsuario
              key={r.key}
              ru={r}
              editar={this.editarR}
              eliminar={this.eliminarRU}
              tiposRequisitos={this.props.tiposRequisitos}
            />
            <CardContent>
              {this.obtenerRequisitosSistema(r)}
              <CrearRS
                key={`crear${r.key}`}
                ru={r}
                crear={this.crearRS}
                tiposRequisitos={this.props.tiposRequisitos}
                requisitosInvocar={this.obtenerRequisitosParaInvocar(r)}
                invocarRequisito={this.invocarRequisito}
              />
            </CardContent>
          </Card>
        );
      else
        return null;
    });

    return (
      <Container style={{margin: "3rem"}}>
        <Typography variant="h2" style={{margin: "3rem"}}>Actores</Typography>
        <VistaActores actores={this.props.actores} actualizar={this.actualizarActores}/>
        <Typography variant="h2" style={{margin: "3rem"}}>Suposiciones</Typography>
        <Grid item xs={13} style={{paddingTop: "1rem", paddingRight: "1rem"}}>
          <TextField id="outlined-multiline-static"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              variant="outlined"
              onChange={this.onChangeSuposicion}
              error={this.props.suposicion === ""}
              value={this.props.suposicion}
              helperText={this.props.suposicion === "" ? "Suposicion vacía" : ""}/>
        </Grid>
        <Typography variant="h2" style={{margin: "3rem"}}>Lista de Requisitos</Typography>
        {reqsUsuario}
        <CrearRU crear={this.crearRU} tiposRequisitos={this.props.tiposRequisitos} />
      </Container>
    );
  }
}

export default ListaRequisitos;
