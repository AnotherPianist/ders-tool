import React, { useState } from "react";
import EditorConvertToJSON from "./EditorConvertToJSON.js";
import { Container, Typography, makeStyles } from "@material-ui/core";

const Ders = (props) => {
  const { datosPreCargados } = props;
  localStorage.removeItem("ders");
  const [infoDers, setInfoDers] = useState(
    localStorage.getItem("ders") == null
      ? JSON.stringify(datosPreCargados) === "{}"
        ? titulos
        : datosPreCargados
      : JSON.parse(localStorage.getItem("ders"))
  );

  return (
    <Container
      style={{
        backgroundColor: "#ffffff",
        paddingBlockEnd: 50,
      }}
    >
      <h1>Documento DERS</h1>
      <div className={useStyles.root}>
        {infoDers.map((info, index) => (
          <Container
            key={index}
            style={{
              backgroundColor: "#E8E8E8",
              paddingBlockEnd: 50,
              borderRadius: 10,
              borderBlockColor: "#000000",
            }}
          >
            <h1>{info.title}</h1>
            <Typography component="div" style={{ backgroundColor: "#ffffff" }}>
              <EditorConvertToJSON
                content={info.description}
                index={index}
                setInfoDers={setInfoDers}
                infoDers={infoDers}
              />
            </Typography>
          </Container>
        ))}
      </div>
    </Container>
  );
};

export default Ders;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  container: {
    //borderBottom: 10,
    borderTop: 100,
  },
}));

const titulos = [
  { title: "Introducción" },
  { title: "Propósito del Sistema" },
  { title: "Alcance del Proyecto" },
  { title: "Contexto" },
  { title: "Definiciones, Acrónimos y Abreviaturas" },
  { title: "Referencias" },
  { title: "Descripción General" },
  { title: "Características de los Usuarios" },
  { title: "Perspectiva del Producto según los Usuarios/Clientes" },
  { title: "Ambiente Operacional de la Solución" },
  { title: "Relación con Otros Proyectos" },
  { title: "Descripción del Modelo" },
];
