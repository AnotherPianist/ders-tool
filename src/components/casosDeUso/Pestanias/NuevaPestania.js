import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import InfoDiagrama from "./InfoDiagrama";
import AlertDialog from "../AlertDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  button: {
    color: theme.palette.text.secondary,
  },
  card: {
    maxWidth: 345,
  },
  typography: {
    height: 140,
    alignItems: "center",
  },
}));

export default function NuevaPestania(props) {
  const {
    nuevoDiagrama,
    diagramas,
    cargarDiagrama,
    actualizarDiagramas,
  } = props;
  const [alerta, setAlerta] = useState(false);
  const [option, setOption] = useState(false);
  const [posicionDelDiagrama, setPosicionDelDiagrama] = useState(0);

  const classes = useStyles();

  const eliminarDiagrama = useCallback(
    (posicion) => {
      /**
       * Borra un diagrama
       */
      const borrar = async () => {
        if (option) {
          console.log("entre");
          actualizarDiagramas(
            diagramas
              .slice(0, posicion)
              .concat(diagramas.slice(posicion + 1, diagramas.length))
          );
          setAlerta(false); // cierra la alerta
          setOption(false);
        }
      };

      setAlerta(true); // abre la alerta
      setPosicionDelDiagrama(posicion); // posicion del diagrama a eliminar
      borrar(); // borra el diagrama si presiono aceptar en la alerta.
    },
    [option, diagramas, actualizarDiagramas]
  );

  useEffect(() => {
    if (option) eliminarDiagrama(posicionDelDiagrama);
  }, [eliminarDiagrama, option, posicionDelDiagrama]);

  return (
    <div className={classes.root}>
      <AlertDialog
        open={alerta}
        setOpen={setAlerta}
        title={"¿Desea Borrar el diagrama seleccionado?"}
        description={
          "El diagrama sera eliminado definitivamente de los diagramas"
        }
        setOption={setOption}
      />
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Card className={classes.card}>
            <CardActionArea onClick={nuevoDiagrama}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  align="center"
                  className={classes.typography}
                >
                  Nueva Pestaña
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        {diagramas.map((diagrama, index) => (
          <Grid item xs={4} key={diagrama.nombre + index}>
            <InfoDiagrama
              eliminar={eliminarDiagrama}
              diagrama={diagrama}
              index={index}
              cargarDiagrama={cargarDiagrama}
            ></InfoDiagrama>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

NuevaPestania.propTypes = {
  nuevoDiagrama: PropTypes.func.isRequired,
  diagramas: PropTypes.array.isRequired,
  cargarDiagrama: PropTypes.func.isRequired,
  actualizarDiagramas: PropTypes.func.isRequired,
};
