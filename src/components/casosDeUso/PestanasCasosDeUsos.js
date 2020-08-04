import React, { useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CasoDeUso from "./CasoDeUso";
import AlertDialog from "./AlertDialog";
import TabPanel from "./TabPanel";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

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
  const [pestanias, setPestanias] = useState(dataDefault);
  const [countPestanias, setCountPestanias] = useState(1);
  const [alerta, setAlerta] = useState(false);
  const [cerrarPestania, setCerrarPestania] = useState(false);
  const [pestaniaActual, setpestaniaActual] = useState(0);
  const [casosDeUsos, setCasosDeUsos] = useState(
    [] /* Aqui deberia recibir el prop de casos de usos guardados anteriormente */
  );

  const handleChange = (event, newValue) => {
    var copiaPestanias = [];
    if (newValue === pestanias.length - 1) {
      pestanias.map((valor, index) =>
        index === pestanias.length - 1
          ? copiaPestanias.push({
              title: "Diagrama " + (countPestanias + 1),
              id: countPestanias + 1,
              diagrama: {},
            })
          : copiaPestanias.push(valor)
      );
      copiaPestanias.push({ title: "Nueva Pestaña", id: "" });
      setPestanias(copiaPestanias);
      setCountPestanias(countPestanias + 1);
    }
    setpestaniaActual(newValue);
  };

  const handleClose = useCallback(
    async (event, indiceTab) => {
      var copiaPestanias = [];

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
          setPestanias(copiaPestanias);
          setCerrarPestania(false); // resetea al valor de cerrar pestaña
          setAlerta(false); // cierra la alerta

          setCasosDeUsos(
            casosDeUsos.concat({
              nombre: pestanias[indiceTab].title,
              diagrama: pestanias[indiceTab].diagrama,
            })
          );
        }
      };

      setpestaniaActual(indiceTab);
      setAlerta(true); // abre la alerta
      cerrar(); // cierra la pestaña si presiono aceptar en la alerta.
    },
    [cerrarPestania, pestanias, casosDeUsos]
  );

  useEffect(() => {
    if (cerrarPestania) handleClose(() => {}, pestaniaActual);
  }, [cerrarPestania, pestaniaActual, handleClose]);

  useEffect(() => {
    console.log(pestanias);
    console.log(casosDeUsos);
  }, [pestanias, casosDeUsos]);

  /**
   * Actualiza el estado del diagrama que esta siendo renderizado en la pestaña actual.
   * @param {*} casoDeUSo
   */
  const actualizarEstado = (casoDeUSo) => {
    let copiaPestanias = pestanias;

    // guarda la nueva información en la posición de la pestaña actual
    copiaPestanias[pestaniaActual].diagrama = casoDeUSo;

    // Guarda la información Actualizada en el estado casosDeUSos.
    setPestanias(copiaPestanias);
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
        <TabPanel
          key={pestania.id}
          value={pestaniaActual}
          index={index}
          length={pestanias.length - 1}
        >
          <CasoDeUso
            requisitos={props.requisitos}
            casoDeUso={pestanias[index].diagrama}
            subirEstados={actualizarEstado}
          />
        </TabPanel>
      ))}
    </div>
  );
}

PestanasCasosDeUsos.propTypes = {};
