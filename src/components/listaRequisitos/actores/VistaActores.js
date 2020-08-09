import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TextField, Typography, Paper, Container } from '@material-ui/core';
import Actor from './Actor';

class VistaActores extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      nuevoNombre: "", 
      nuevaDescripcion: "",
    };
  }

  onChangeNombre = (e) => {
    this.setState({nuevoNombre: e.target.value});
  }

  onChangeDescripcion = (e) => {
    this.setState({nuevaDescripcion: e.target.value});
  }

  crear = (e) => {
    if (e.key === "Enter" && this.state.nuevoNombre.length !== 0 && this.state.nuevaDescripcion.length !== 0) {
      const nuevoActor = {
        id: this.state.id,
        nombre: this.state.nuevoNombre,
        descripcion: this.state.nuevaDescripcion
      };
      const lista = this.props.actores.slice();
      lista.push(nuevoActor);
      this.props.actualizar(lista);
      this.setState({id: this.state.id + 1, nuevoNombre: "", nuevaDescripcion: ""});
    }
  }

  editar = (id, nombre, descripcion) => {
    const lista = this.props.actores.slice();
    for (const actor of lista) {
      if (actor.id === id) {
        actor.nombre = nombre;
        actor.descripcion = descripcion;
      }
    }
    this.props.actualizar(lista);
  }

  eliminar = (id) => {
    const lista = [];
    for (const actor of this.props.actores) {
      if (actor.id !== id)
        lista.push(actor);
    }
    this.props.actualizar(lista);
  }

  render() {
    const actores = this.props.actores.map((actor) => {
      return (
        <Actor key={actor.id} id={actor.id} nombre={actor.nombre} descripcion={actor.descripcion} editar={this.editar} eliminar={this.eliminar}/>
      );
    });
    return(
      <Container>
        <Typography variant="h5" style={{float: "left"}} gutterBottom>Actores</Typography>
        <Table component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {actores}
            <TableRow>
              <TableCell>
                <TextField id="nombre" label="Nombre" value={this.state.nuevoNombre} onChange={this.onChangeNombre} onKeyDown={this.crear}/>
              </TableCell>
              <TableCell>
                <TextField multiline rowsMax={3} id="descripcion" label="Descripción" value={this.state.nuevaDescripcion} onChange={this.onChangeDescripcion} onKeyDown={this.crear}/>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
    );
  }
}

export default VistaActores;
