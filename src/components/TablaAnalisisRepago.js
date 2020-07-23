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
import { Button } from "@material-ui/core";

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

var id = 5;

/**
 *
 * @param {Nombre que tendra el elemento de la fila} nombre
 * @param {Para ver si es que se puede editar, para el caso del costo acumulado, por ejemplo,
 *  no se deberia editar debido a que es un valor que se calcula automaticamente} editable
 * @param {Valor inicial que tendra la celda (por defecto deberia ser 0)} valor
 */
function crearElemento(nombre, editable, valor) {
  return { nombre, editable, valor };
}

/**
 * Funcion que añade una columna y calcula el año automaticamente
 */
function crearColumna() {
  id = id + 1;
  const texto = "Año " + id;
  const minWidth = 150;
  return { id, texto, minWidth };
}

// var valorCostoAcumulado = 0;
// var valorCostoDesarrollo = 0;

//Por defecto se llega al año 5
var columnas = [
  { id: 0, texto: "Año " + 0, minWidth: 150 },
  { id: 1, texto: "Año " + 1, minWidth: 150 },
  { id: 2, texto: "Año " + 2, minWidth: 150 },
  { id: 3, texto: "Año " + 3, minWidth: 150 },
  { id: 4, texto: "Año " + 4, minWidth: 150 },
  { id: 5, texto: "Año " + 5, minWidth: 150 },
];

//Datos que tendran las filas


export default function TablaAnalisisRepago() {
  const classes = useStyles();
  let [valorCostoAcumulado, setCostoD] = useState(0);
  let [valorBeneAcumulado, setBeneficioAc] = useState(0);
  let [velorBeneCosto, setBeneCosto] = useState(0);
  let filasCosto = [
    crearElemento("Costo Desarrollo", true, 0),
    crearElemento("Costo Operacion", true, 0),
    crearElemento("Factor Ajuste", true, 0),
    crearElemento("Costos Ajustados", true, 0),
    crearElemento("Costo Acumulado", false, valorCostoAcumulado),
  ];
  let filasBeneficio = [
    crearElemento("Beneficios", true, 0),
    crearElemento("Factor Ajuste", true, 0),
    crearElemento("Beneficio Ajustado", true, 0),
    crearElemento("Beneficio Acumulado", false, valorBeneAcumulado),
  ];
  let filaBeneCosto = [  
    crearElemento("Beneficio-Costo", false, velorBeneCosto),
  ];
  const cambioCosto = (event) => {
    valorCostoAcumulado = (valorCostoAcumulado)+parseInt(event.target.value);
    setCostoD(valorCostoAcumulado);   
    BeneficioCosto();
  };
  const cambioBeneficio = (event) => {
    valorBeneAcumulado = (valorBeneAcumulado)+parseInt(event.target.value);
    setBeneficioAc(valorBeneAcumulado);    
    BeneficioCosto();
  };
  const BeneficioCosto = () =>{
    setBeneCosto(valorBeneAcumulado-valorCostoAcumulado);
  }
  const agregarColumna = () => {
    columnas.push(crearColumna());
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Elemento</StyledTableCell>
              {columnas.map((columna) => (
                <StyledTableCell
                  key={columna.id}
                  align="center"
                  style={{ minWidth: columna.minWidth }}
                >
                  {columna.texto}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filasCosto.map((fila) => {
              return (
                <StyledTableRow hover role="checkbox" tabIndex={-1} key={fila}>
                  <StyledTableCell component="th" scope="fila">
                    {fila.nombre}
                  </StyledTableCell>
                  {columnas.map((columna) => {
                    return (
                      <StyledTableCell key={columna.id}>
                        <TextField
                          id="standard-basic"
                          onChange={cambioCosto}
                          label={!fila.editable ? fila.valor : "Ingresar Valor"}
                          disabled={!fila.editable}
                        />
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
            {filasBeneficio.map((fila) => {
              return (
                <StyledTableRow hover role="checkbox" tabIndex={-1} key={fila}>
                  <StyledTableCell component="th" scope="fila">
                    {fila.nombre}
                  </StyledTableCell>
                  {columnas.map((columna) => {
                    return (
                      <StyledTableCell key={columna.id}>
                        <TextField
                          id="standard-basic"
                          onChange={cambioBeneficio}
                          label={!fila.editable ? fila.valor : "Ingresar Valor"}
                          disabled={!fila.editable}
                        />
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
            {filaBeneCosto.map((fila) => {
              return (
                <StyledTableRow hover role="checkbox" tabIndex={-1} key={fila}>
                  <StyledTableCell component="th" scope="fila">
                    {fila.nombre}
                  </StyledTableCell>
                  {columnas.map((columna) => {
                    return (
                      <StyledTableCell key={columna.id}>
                        <TextField
                          id="standard-basic"                         
                          label={!fila.editable ? fila.valor : "Ingresar Valor"}
                          disabled={!fila.editable}
                        />
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={agregarColumna}>
        Boton en version inicial para agregar años(Hay que ingresar a otra
        pagina y volver a esta para ver cambios)
      </Button>
    </Paper>
  );
}
