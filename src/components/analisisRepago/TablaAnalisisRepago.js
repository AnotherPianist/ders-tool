import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Button, TableFooter} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

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
  const valores = generarValores();
  return { id, texto, valores };
}

export default function TablaAnalisisRepago(props) {
  const classes = useStyles();

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
   * Cuando el componente se monta, revisa si el componente está vacío.
   * En ese caso, crea la tabla.
   */
  useEffect( () => {
    if (props.tablaAnalisisRepago.length === 0) 
      props.actualizar([
        { id: 0, texto: "Año " + 0, valores: generarValores() },
        { id: 1, texto: "Año " + 1, valores: generarValores() },
        { id: 2, texto: "Año " + 2, valores: generarValores() },
        { id: 3, texto: "Año " + 3, valores: generarValores() },
        { id: 4, texto: "Año " + 4, valores: generarValores() },
        { id: 5, texto: "Año " + 5, valores: generarValores() },
      ]);
  });

  /**
   * Funcion que luego de apretar el boton calcula los elementos haciendo las operaciones
   * columna por columna
   */
  function calcularValores() {
    let newArr = [...props.tablaAnalisisRepago];
    var costeTotal = 0;
    var beneficioTotal = 0;
    newArr.map((columna) => {
      // Calculos
      const ajusteCosto = newArr[columna.id].valores[2];
      const ajusteBeneficio = newArr[columna.id].valores[6];
      if (
        ajusteCosto >= 0 &&
        ajusteCosto <= 100 &&
        ajusteBeneficio >= 0 &&
        ajusteBeneficio <= 100
      ) {
        var costo =
          parseInt(newArr[columna.id].valores[1]) +
          parseInt(newArr[columna.id].valores[0]);
        var costoAño = costo * (ajusteCosto / 100) + costo;
        var beneficio = parseInt(newArr[columna.id].valores[5]);
        var beneficioAño =
          parseInt(beneficio) - parseInt(beneficio) * (ajusteBeneficio / 100);
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
          props.actualizar(newArr);
        } else {
          console.log("Hubo un error, posiblemente no hayan valores en las celdas de las columnas anteriores o ingresaste un valor invalido");
        }
      } else {
        console.log("Ingresaste un porcentaje invalido");
      }
      return null;
    });
  }

  /**
   * Añade una columna vacia al final
   */
  const agregarColumna = () => {
    let newState = [...props.tablaAnalisisRepago, crearColumna()];
    props.actualizar(newState)
  };

  /**
   * Elimina la ultima columna de la tabla, debe por lo menos estar siempre el año 0
   */
  const eliminarColumna = () => {
    if (id > 0) {
      id = id - 1;
      let newState = [...props.tablaAnalisisRepago];
      newState.pop();
      props.actualizar(newState);
    } else {
      console.log("Debe haber por lo menos 1 año en la tabla");
    }
  };

  return (
    <Paper className={classes.root} style={{margin: "3rem", width: "90%", overflowX: "auto"}}>
      <div style={{margin: "10px"}}>
        <IconButton aria-label="add" onClick={agregarColumna}>
          <AddIcon />
        </IconButton>
        <IconButton aria-label="remove" onClick={eliminarColumna}>
          <RemoveIcon />
        </IconButton>
      </div>
      <TableContainer className={classes.container} style={{padding: "1rem"}}>
        <Table stickyHeader aria-label="sticky table" key="Tabla">
          <TableHead>
            <TableRow>
              <StyledTableCell>Elemento</StyledTableCell>
              {props.tablaAnalisisRepago.map((columna) => (
                <StyledTableCell
                  key={columna.id}
                  align="center"
                  style={{ minWidth: 150 }}
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
                  {props.tablaAnalisisRepago.map((columna) => {
                    return (
                      <StyledTableCell key={columna.id}>
                        <TextField
                          id="standard-basic"
                          onChange={(e) => {
                            if (
                              parseInt(e.target.value) < 0 ||
                              isNaN(e.target.value)
                            ) {
                              console.log("El valor ingresado no es valido");
                            } else {
                              let newArr = props.tablaAnalisisRepago;
                              newArr[columna.id].valores[index] =
                                e.target.value;
                              props.actualizar(newArr);
                            }
                          }}
                          placeholder={
                            !fila.editable
                              ? props.tablaAnalisisRepago[columna.id].valores[index]
                              : "Ingrese valor"
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
          <TableFooter>
            <Button style={{marginTop: "2rem"}} variant="contained" color="primary" onClick={calcularValores}>Calcular</Button>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}
