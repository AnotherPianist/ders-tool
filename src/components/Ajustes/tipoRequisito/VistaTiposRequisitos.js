import React from 'react';
import { Divider, Table, TableHead, TableRow, TableCell, TableBody, TextField, Typography } from '@material-ui/core';
import TipoRequisito from './TipoRequisito';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class VistaTiposRequisitos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {listaTipos: [], id: 0, nuevoNombre: "", nuevaDescripcion: ""};
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeDescripcion = this.onChangeDescripcion.bind(this);
    this.crearTipo = this.crearTipo.bind(this);
    this.actualizarTipo = this.actualizarTipo.bind(this);
    this.eliminarTipo = this.eliminarTipo.bind(this);
  }

  onChangeNombre(e) {
    this.setState({nuevoNombre: e.target.value});
  }

  onChangeDescripcion(e) {
    this.setState({nuevaDescripcion: e.target.value});
  }

  crearTipo(e) {
    if (e.key === "Enter" && this.state.nuevoNombre.length !== 0 && this.state.nuevaDescripcion.length !== 0) {
      const lista = this.state.listaTipos.slice();
      lista.push({
        id: this.state.id,
        nombre: this.state.nuevoNombre,
        descripcion: this.state.nuevaDescripcion
      });
      this.setState({listaTipos: lista, id: this.state.id + 1, nuevoNombre: "", nuevaDescripcion: ""});
    }
  }

  actualizarTipo(id, nombre, descripcion) {
    const lista = this.state.listaTipos.slice();
    for (const tipo of lista) {
      if (tipo.id === id) {
        tipo.nombre = nombre;
        tipo.descripcion = descripcion;
      }
    }
    this.setState({listaTipos: lista});
  }

  eliminarTipo(id) {
    const lista = [];
    for (const tipo of this.state.listaTipos) {
      if (tipo.id !== id)
        lista.push(tipo);
    }
    this.setState({listaTipos: lista});
  }

  render() {
    const lista = this.state.listaTipos.map((tipo) => {
      return (
        <TipoRequisito key={tipo.id} id={tipo.id} nombre={tipo.nombre} descripcion={tipo.descripcion} actualizar={this.actualizarTipo} eliminar={this.eliminarTipo}/>
      );
    });

    return(
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" color="textSecondary" style={{float: "left"}} gutterBottom> Tipo de Requisitos </Typography>
          <Table padding="default">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lista}
              <TableRow>
                <TableCell>
                  <TextField id="nombre" label="Nombre" value={this.state.nuevoNombre} onChange={this.onChangeNombre} onKeyDown={this.crearTipo}/>
                </TableCell>
                <TableCell>
                  <TextField id="descripcion" label="Descripción" value={this.state.nuevaDescripcion} fullWidth onChange={this.onChangeDescripcion} onKeyDown={this.crearTipo}/>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
}

export default VistaTiposRequisitos;