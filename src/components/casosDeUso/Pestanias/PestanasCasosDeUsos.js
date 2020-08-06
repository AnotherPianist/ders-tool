/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CasoDeUso from "../CasoDeUso";
import AlertDialog from "../AlertDialog";
import TabPanel from "./TabPanel";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import NuevaPestania from "./NuevaPestania";
import { isEqual, now, isEmpty } from "lodash";
import PropTypes from "prop-types";

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: "1rem",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const dataDefault = [{ title: "Nueva Pestaña", id: "" }];

export default function PestanasCasosDeUsos(props) {
  const classes = useStyles();
  const [pestanias, setPestanias] = useState(
    isEmpty(props.casosDeUso) ? dataDefault : props.casosDeUso.pestanias
    /* Aqui deberia recibir el prop de casos de usos guardados anteriormente */
  );
  const [casosDeUsos, setCasosDeUsos] = useState(
    isEmpty(props.casosDeUso) ? [] : props.casosDeUso.diagramas
    /* Aqui deberia recibir el prop de casos de usos guardados anteriormente */
  );
  const [countPestanias, setCountPestanias] = useState(0);
  const [alerta, setAlerta] = useState(false);
  const [cerrarPestania, setCerrarPestania] = useState(false);
  const [pestaniaActual, setpestaniaActual] = useState(0);

  const handleClose = useCallback(
    async (event, indiceTab) => {
      var copiaPestanias = [];

      /**
       *  Calcula la posicion en que se cuentra un diagrama en la lista de casos de uso.
       * @param {object} infoPestania
       */
      const calcularPosicionDiagrama = (infoPestania) => {
        let indice = -1;

        casosDeUsos.forEach((element, index) => {
          if (isEqual(element.nombre, infoPestania.title)) {
            if (isEqual(element.key, infoPestania.clave)) {
              indice = index;
            }
          }
        });
        return indice;
      };

      /**
       * Cierra una ventana
       */
      const cerrar = async () => {
        if (cerrarPestania) {
          pestanias.forEach((value, index) => {
            if (index === pestanias.length - 1) {
              copiaPestanias.push({ title: "Nueva Pestaña", id: "" });
            } else if (index !== indiceTab) {
              copiaPestanias.push(value);
            }
          });

          setPestanias(copiaPestanias); // actualiza el estado de pestanias, con su nuevo valor.
          setCerrarPestania(false); // resetea al valor de cerrar pestaña
          setAlerta(false); // cierra la alerta

          let copiaDiagramas = casosDeUsos;

          // Cambia la opcion de activo al cerrar la pestania
          copiaDiagramas[
            calcularPosicionDiagrama(pestanias[indiceTab])
          ].activo = false;

          // guarda el diagrama de casos de uso, al cerrar una pestaña
          setCasosDeUsos(copiaDiagramas);
        }
      };

      setpestaniaActual(indiceTab); // actualiza el indice de la pestana actual
      setAlerta(true); // abre la alerta
      cerrar(); // cierra la pestaña si presiono aceptar en la alerta.
    },
    [cerrarPestania, pestanias, casosDeUsos]
  );
  /**
   * Crea una pestaña nueva en la vista de pestañas casos de usos.
   * @param {string} nombre
   * @param {object} diagrama
   * @param {number} posicion
   * @param {number} clave
   */
  const nuevaPestania = (nombre, diagrama, posicion, clave) => {
    var copiaPestanias = [];
    pestanias.map((valor, index) =>
      index === pestanias.length - 1
        ? copiaPestanias.push({
            title: nombre,
            id: countPestanias + 1,
            diagrama: diagrama,
            posicion: posicion,
            clave: clave,
          })
        : copiaPestanias.push(valor)
    );
    copiaPestanias.push({ title: "Nueva Pestaña", id: "" });
    setPestanias(copiaPestanias); // carga las pestañas, agregando la nueva pestaña
    setCountPestanias(countPestanias + 1); // aumenta el count de las pestañas
  };

  const handleChange = (event, newValue) => {
    setpestaniaActual(newValue);
  };

  const cargarDiagrama = (diagrama, posicion) => {
    // crea una nueva pestaña
    nuevaPestania(diagrama.nombre, diagrama.diagrama, posicion, diagrama.key);
    // actualiza el caso de uso de activo a desactivo para abrir.
    setCasosDeUsos(
      casosDeUsos
        .slice(0, posicion)
        .concat({
          nombre: diagrama.nombre,
          diagrama: diagrama.diagrama,
          activo: true,
          key: diagrama.key,
        })
        .concat(casosDeUsos.slice(posicion + 1, casosDeUsos.length))
    );
  };

  /**
   * Crea un nuevo diagrama de casos de usos
   */
  const nuevoDiagrama = () => {
    const key = now(); // crea una clave con el metodo now, que trae la hora y la fecha en formato de number
    // crea una nueva pestaña
    nuevaPestania(
      "Diagrama " + (countPestanias + 1),
      {},
      casosDeUsos.length,
      key
    );
    // Agrega eñ nuevo diagrama creado al state de casosDeUsos
    setCasosDeUsos(
      casosDeUsos.concat({
        nombre: "Diagrama " + (countPestanias + 1),
        diagrama: {},
        activo: true,
        key: key,
      })
    );
  };

  useEffect(() => {
    if (cerrarPestania) handleClose(() => {}, pestaniaActual);
  }, [cerrarPestania, pestaniaActual, handleClose]);

  /**
   * Actualiza el estado del diagrama que esta siendo renderizado en la pestaña actual.
   * @param {object} casoDeUSo
   */
  const actualizarEstado = (casoDeUSo) => {
    let copiaPestanias = pestanias;

    // guarda la nueva información en la posición de la pestaña actual
    copiaPestanias[pestaniaActual].diagrama = casoDeUSo;

    // Guarda la información Actualizada en el estado casosDeUSos.
    setPestanias(copiaPestanias);

    let indice = -1;

    casosDeUsos.forEach((element, index) => {
      if (isEqual(element.nombre, copiaPestanias[pestaniaActual].title)) {
        if (isEqual(element.key, copiaPestanias[pestaniaActual].clave)) {
          indice = index;
        }
      }
    });

    let diagramas = casosDeUsos;

    // guarda la nueva información en la posición de la pestaña actual
    diagramas[indice].diagrama = casoDeUSo;

    // Guarda la información Actualizada en el estado casosDeUSos.
    setCasosDeUsos(diagramas);
  };

  /**
   * Actualiza el estado casos de uso
   * @param {Array} diagramas
   */
  const actualizarDiagramas = (diagramas) => {
    setCasosDeUsos(diagramas);
  };

  return (
    <div className={classes.root}>
      <AlertDialog
        open={alerta}
        setOpen={setAlerta}
        title={"¿Desea cerrar la pestaña actual?"}
        description={
          "Si cierra la ventana y no ha guardado los cambios, estos serán perdidos."
        }
        setOption={setCerrarPestania}
      />
      <Container>
        <Tabs
          value={pestaniaActual}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {pestanias.map((pestania, index) => (
            <Tab
              key={pestania.id}
              label={
                <span>
                  {pestania.title}{" "}
                  {!pestania.id ? (
                    ""
                  ) : (
                    <IconButton>
                      <CloseIcon
                        fontSize="small"
                        onClick={(e) => {
                          handleClose(e, pestaniaActual);
                        }}
                      />
                    </IconButton>
                  )}
                </span>
              }
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Container>
      {pestanias.map((pestania, index) => (
        <TabPanel key={pestania.id} value={pestaniaActual} index={index}>
          {index === pestanias.length - 1 ? (
            <NuevaPestania
              pestaniaActual={pestaniaActual}
              diagramas={casosDeUsos}
              actualizarDiagramas={actualizarDiagramas}
              nuevoDiagrama={nuevoDiagrama}
              cargarDiagrama={cargarDiagrama}
            />
          ) : (
            <CasoDeUso
              requisitos={props.requisitos}
              casoDeUso={pestanias[index].diagrama}
              subirEstados={actualizarEstado}
            />
          )}
        </TabPanel>
      ))}
    </div>
  );
}

PestanasCasosDeUsos.propTypes = {
  casosDeUso: PropTypes.object.isRequired,
  actualizarCasosDeUso: PropTypes.func.isRequired,
};
