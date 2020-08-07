import React from 'react';
import { TableRow, TableCell, TextField, IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

class Actor extends React.Component {
  constructor(props) {
    super(props);
    this.state={nombre: this.props.nombre, descripcion: this.props.descripcion};
  }

  onChangeNombre = (e) => {
    this.setState({nombre: e.target.value});
    this.actualizarActor();
  }

  onChangeDescripcion = (e) => {
    this.setState({descripcion: e.target.value});
    this.actualizarActor();
  }

  actualizarActor = () => {
    this.props.editar(this.props.id, this.state.nombre, this.state.descripcion);
  }

  eliminarActor = () => {
    this.props.eliminar(this.props.id);
  }

  render() {
    return(
      <TableRow>
        <TableCell>
          <TextField id="nombre" defaultValue={this.state.nombre} placeholder="Nombre" onChange={this.onChangeNombre}/>
        </TableCell>
        <TableCell>
          <TextField id="descripcion" defaultValue={this.state.descripcion} placeholder="Descripción" onChange={this.onChangeDescripcion}/>
        </TableCell>
        <TableCell>
          <IconButton color="secondary" onClick={this.eliminarActor}>
            <HighlightOffIcon/>
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }
}

export default Actor;