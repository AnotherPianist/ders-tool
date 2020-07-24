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
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button";

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
function crearElemento(nombre, editable) {
  return { nombre, editable };
}

/**
 * Se generan los valores para cada espacio de las columnas, por defecto tienen valor 0.
 *  */
function generarValores() {
  return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}
/**
 * Funcion que añade una columna y calcula el año automaticamente
 */
function crearColumna() {
  id = id + 1;
  const texto = "Año " + id;
  const minWidth = 150;
  const valores = generarValores();
  return { id, texto, minWidth, valores };
}

export default function TablaAnalisisRepago() {
  const classes = useStyles();
  const [columnas, setColumnas] = useState([
    { id: 0, texto: "Año " + 0, minWidth: 150, valores: generarValores() },
    { id: 1, texto: "Año " + 1, minWidth: 150, valores: generarValores() },
    { id: 2, texto: "Año " + 2, minWidth: 150, valores: generarValores() },
    { id: 3, texto: "Año " + 3, minWidth: 150, valores: generarValores() },
    { id: 4, texto: "Año " + 4, minWidth: 150, valores: generarValores() },
    { id: 5, texto: "Año " + 5, minWidth: 150, valores: generarValores() },
  ]);

  const filas = [
    crearElemento("Costo Desarrollo", true),
    crearElemento("Costo Operacion", true),
    crearElemento("Factor Ajuste", true),
    crearElemento("Costos Ajustados", false),
    crearElemento("Costo Acumulado", false),
    crearElemento("Beneficios", true),
    crearElemento("Factor Ajuste", true),
    crearElemento("Beneficio Ajustado", false),
    crearElemento("Beneficio Acumulado", false),
    crearElemento("Beneficio-Costo", false),
  ];

  /**
   * Funcion que luego de apretar el boton calcula los elementos haciendo las operaciones
   * columna por columna
   */
  function calcularValores() {
    let newArr = [...columnas];
    var costeTotal = 0;
    var beneficioTotal = 0;
    newArr.map((columna) => {
      //Calculos
      var costo =
        parseInt(newArr[columna.id].valores[1]) +
        parseInt(newArr[columna.id].valores[0]);
      var costoAño = costo * (newArr[columna.id].valores[2] / 100) + costo;
      var beneficio = parseInt(newArr[columna.id].valores[5]);
      var beneficioAño =
        parseInt(beneficio) -
        parseInt(beneficio) * (newArr[columna.id].valores[6] / 100);
      costeTotal += costoAño;
      beneficioTotal += parseInt(beneficioAño);
      //Verificar que sean valores validos para hacer los cambios en la tabla
      if (
        !isNaN(costeTotal) &&
        !isNaN(costoAño) &&
        !isNaN(beneficioTotal) &&
        !isNaN(beneficioAño)
      ) {
        newArr[columna.id].valores[3] = costoAño;
        newArr[columna.id].valores[4] = costeTotal;
        newArr[columna.id].valores[7] = beneficioAño;
        newArr[columna.id].valores[8] = beneficioTotal;
        newArr[columna.id].valores[9] = beneficioTotal - costeTotal;
        setColumnas(newArr);
      } else {
        console.log(
          "Hubo un error, posiblemente no hayan valores en las celdas de las columnas anteriores o ingresaste un valor invalido"
        );
      }
    });
  }

  /**
   * Añade una columna vacia al final
   */
  const agregarColumna = () => {
    let newState = [...columnas, crearColumna()];
    setColumnas(newState);
  };

  return (
    <Paper className={classes.root} key="Paper">
      <TableContainer className={classes.container} key="Contenedor">
        <Table stickyHeader aria-label="sticky table" key="Tabla">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <IconButton aria-label="add" onClick={agregarColumna}>
                  <AddIcon />
                </IconButton>
                <IconButton aria-label="remove" onClick={agregarColumna}>
                  <RemoveIcon />
                </IconButton>
                Elemento
              </StyledTableCell>
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
            {filas.map((fila, index) => {
              return (
                <StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <StyledTableCell component="th" scope="fila">
                    {fila.nombre}
                  </StyledTableCell>
                  {columnas.map((columna) => {
                    return (
                      <StyledTableCell key={columna.id}>
                        <TextField
                          id="standard-basic"
                          onChange={(e) => {
                            if (
                              parseInt(e.target.value) < 0 ||
                              isNaN(e.target.value)
                            ) {
                              let newArr = columnas;
                              newArr[columna.id].valores[index] =
                                e.target.value;
                              setColumnas(newArr);
                            } else {
                              let newArr = columnas;
                              newArr[columna.id].valores[index] =
                                e.target.value;
                              setColumnas(newArr);
                            }
                          }}
                          label={
                            !fila.editable
                              ? columnas[columna.id].valores[index]
                              : "Ingresar Valor"
                          }
                          disabled={!fila.editable}
                        />
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
          <Button variant="contained" color="primary" onClick={calcularValores}>
            Calcular
          </Button>
        </Table>
      </TableContainer>
    </Paper>
  );
}
