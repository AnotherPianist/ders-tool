import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TextField, Typography } from '@material-ui/core';
import TipoRequisito from './TipoRequisito';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class VistaTiposRequisitos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  crearTipo = (e) => {
    if (e.key === "Enter" && this.state.nuevoNombre.length !== 0 && this.state.nuevaDescripcion.length !== 0) {
      this.props.crear(this.state.nuevoNombre, this.state.nuevaDescripcion);
      this.setState({nuevoNombre: "", nuevaDescripcion: ""});
    }
  }

  render() {
    const lista = this.props.tipos.map((tipo) => {
      return (
        <TipoRequisito key={tipo.id} id={tipo.id} nombre={tipo.nombre} descripcion={tipo.descripcion} actualizar={this.props.actualizar} eliminar={this.props.eliminar}/>
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
