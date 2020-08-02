import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CasoDeUso from "./CasoDeUso";
import AlertDialog from "./AlertDialog";
import TabPanel from "./TabPanel";

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

const dataDefault = [
  { title: "caso de uso", id: 1 },
  { title: "Nueva Pestaña", id: "" },
];

export default function PestañasCasosDeUsos(props) {
  const classes = useStyles();
  const [pestanias, setPestanias] = useState(dataDefault);
  const [countPestanias, setCountPestanias] = useState(1);
  const [value, setValue] = useState(0);
  const [alerta, setAlerta] = useState(false);
  const [cerrarPestania, setCerrarPestania] = useState(false);
  const [pestaniaActual, setpestaniaActual] = useState(0);

  const handleChange = (event, newValue) => {
    var copiaPestanias = [];
    if (newValue === pestanias.length - 1) {
      pestanias.map((valor, index) =>
        index === pestanias.length - 1
          ? copiaPestanias.push({
              title: "caso de uso",
              id: countPestanias + 1,
            })
          : copiaPestanias.push(valor)
      );
      copiaPestanias.push({ title: "Nueva Pestaña", id: "" });
      setPestanias(copiaPestanias);
      setCountPestanias(countPestanias + 1);
    }
    setValue(newValue);
    setpestaniaActual(newValue);
  };

  const handleClose = async (event, indiceTab) => {
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
      }
    };

    setpestaniaActual(indiceTab);
    setAlerta(true); // abre la alerta
    cerrar(); // cierra la pestaña si presiono aceptar en la alerta.
  };

  useEffect(() => {
    if (cerrarPestania) handleClose(() => {}, pestaniaActual);
  }, [cerrarPestania]);

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
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          onDoubleClick={(e) => {
            handleClose(e, value);
          }}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {pestanias.map((pestania, index) => (
            <Tab
              key={pestania.id}
              label={pestania.title + " " + pestania.id}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>
      {pestanias.map((pestania, index) => (
        <TabPanel
          key={pestania.id}
          value={value}
          index={index}
          length={pestanias.length - 1}
        >
          <CasoDeUso />
        </TabPanel>
      ))}
    </div>
  );
}

PestañasCasosDeUsos.propTypes = {};
