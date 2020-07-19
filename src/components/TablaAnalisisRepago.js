import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function crearElemento(nombre, editable, valor) {
  return { nombre, editable, valor };
}

var valorCostoAcumulado = 0;
var valorCostoDesarrollo = 0;

var filas = [
  crearElemento("Costo Desarrollo", true, valorCostoDesarrollo),
  crearElemento("Costo Operacion", true, 0),
  crearElemento("Factor Ajuste", true, 0),
  crearElemento("Costos Ajustados", true, 0),
  crearElemento("Costo Acumulado", false, valorCostoAcumulado),
  crearElemento("Beneficios", true, 0),
  crearElemento("Factor Ajuste", true, 0),
  crearElemento("Beneficio Ajustado", true, 0),
  crearElemento("Beneficio Acumulado", false, 0),
  crearElemento("Beneficio-Costo", false, 0),
];

export default function TablaAnalisisRepago() {
  const classes = useStyles();

  const cambioCosto = (event) => {
    console.log(event.target.value);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Elemento</StyledTableCell>
            <StyledTableCell align="center">Año 0</StyledTableCell>
            <StyledTableCell align="center">Año 1</StyledTableCell>
            <StyledTableCell align="center">Año 2</StyledTableCell>
            <StyledTableCell align="center">Año 3</StyledTableCell>
            <StyledTableCell align="center">Año 4</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filas.map((fila) => (
            <StyledTableRow key={fila}>
              <StyledTableCell component="th" scope="fila">
                {fila.nombre}
              </StyledTableCell>

              <StyledTableCell align="center">
                <TextField
                  id="standard-basic"
                  onChange={cambioCosto}
                  label={!fila.editable ? fila.valor : "Ingresar Valor"}
                  disabled={!fila.editable}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  id="standard-basic"
                  label={!fila.editable ? fila.valor : "Ingresar Valor"}
                  disabled={!fila.editable}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  id="standard-basic"
                  label={!fila.editable ? fila.valor : "Ingresar Valor"}
                  disabled={!fila.editable}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  id="standard-basic"
                  label={!fila.editable ? fila.valor : "Ingresar Valor"}
                  disabled={!fila.editable}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  id="standard-basic"
                  label={!fila.editable ? fila.valor : "Ingresar Valor"}
                  disabled={!fila.editable}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
