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
          <TextField id="nombre" 
                      fullWidth 
                      defaultValue={this.state.nombre} 
                      placeholder="Nombre" 
                      onChange={this.onChangeNombre}
                      error={this.state.nombre === ""}
                      helperText={this.state.nombre === "" ? "Nombre vacío" : ""}/>
        </TableCell>
        <TableCell>
          <TextField id="descripcion" 
                      multiline
                      fullWidth 
                      rows={3}
                      variant="outlined" 
                      defaultValue={this.state.descripcion} 
                      placeholder="Descripción" 
                      onChange={this.onChangeDescripcion}
                      error={this.state.descripcion === ""}
                      helperText={this.state.descripcion === "" ? "Descripcion vacía" : ""}/>
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