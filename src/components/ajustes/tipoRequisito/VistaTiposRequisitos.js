import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TextField, Typography, Paper, Container } from '@material-ui/core';
import TipoRequisito from './TipoRequisito';

class VistaTiposRequisitos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 2,
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
      const nuevoTipo = {
        id: this.state.id,
        nombre: this.state.nuevoNombre,
        descripcion: this.state.nuevaDescripcion
      };
      const lista = this.props.tipos.slice();
      lista.push(nuevoTipo);
      this.props.actualizar(lista);
      this.setState({id: this.state.id + 1, nuevoNombre: "", nuevaDescripcion: ""});
    }
  }

  editar = (id, nombre, descripcion) => {
    const lista = this.props.tipos.slice();
    for (const tipo of lista) {
      if (tipo.id === id) {
        tipo.nombre = nombre;
        tipo.descripcion = descripcion;
      }
    }
    this.props.actualizar(lista);
  }

  eliminar = (id) => {
    const lista = [];
    for (const tipo of this.props.tipos) {
      if (tipo.id !== id)
        lista.push(tipo);
    }
    this.props.actualizar(lista);
  }

  render() {
    const lista = this.props.tipos.map((tipo) => {
      return (
        <TipoRequisito key={tipo.id} id={tipo.id} nombre={tipo.nombre} descripcion={tipo.descripcion} editar={this.editar} eliminar={this.eliminar}/>
      );
    });

    return(
      <Container>
        <Typography variant="h5" style={{float: "left"}} gutterBottom>Tipos de Requisitos</Typography>
        <Table component={Paper}>
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
                <TextField id="nombre" label="Nombre" value={this.state.nuevoNombre} onChange={this.onChangeNombre} onKeyDown={this.crear}/>
              </TableCell>
              <TableCell>
                <TextField id="descripcion" label="Descripción" value={this.state.nuevaDescripcion} fullWidth onChange={this.onChangeDescripcion} onKeyDown={this.crear}/>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
    );
  }
}

export default VistaTiposRequisitos;
