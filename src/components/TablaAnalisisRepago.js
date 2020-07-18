import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const filas = [
  "Costo Desarrollo",
  "Costo Operacion",
  "Factor Ajuste",
  "Costos Ajustados",
  "Costo Acumulado",
  "Beneficios",
  "Factor Ajuste",
  "Beneficio Ajustado",
  "Beneficio Acumulado",
  "Beneficio-Costo",
];

export default function TablaAnalisisRepago() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Elemento</TableCell>
            <TableCell align="right">Año 0</TableCell>
            <TableCell align="right">Año 1</TableCell>
            <TableCell align="right">Año 2</TableCell>
            <TableCell align="right">Año 3</TableCell>
            <TableCell align="right">Año 4</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filas.map((fila) => (
            <TableRow key={fila}>
              <TableCell component="th" scope="fila">
                {fila}
              </TableCell>
              <TableCell align="right">{}</TableCell>
              <TableCell align="right">{}</TableCell>
              <TableCell align="right">{}</TableCell>
              <TableCell align="right">{}</TableCell>
              <TableCell align="right">{}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
