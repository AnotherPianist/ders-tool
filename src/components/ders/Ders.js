import React, { useEffect } from "react";
import EditorConvertToJSON from "./EditorConvertToJSON.js";
import { Card, CardContent, Typography, Container } from "@material-ui/core";

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

const Ders = (props) => {
  
  useEffect( () => {
    if (props.textoDers.length === 0) props.actualizarInfoDers(titulos);
  });

  const setTextoDers = textoDers => {
    props.actualizarInfoDers(textoDers);
  };

  return (
    <Container>
      <Typography variant="h2" style={{margin: "3rem"}}>Documento de Especifición de Requisitos</Typography>
      {props.textoDers.map((info, index) => (
        <Card key={index} style={{marginLeft: "5rem", marginRight: "5rem", marginBottom: "2rem"}}>
          <CardContent>
            <Typography variant="h5" style={{float: "left"}}>{info.title}</Typography>
            <br/>
            <Typography variant="body2" component="p">
              <EditorConvertToJSON
                content={info.description}
                index={index}
                setInfoDers={setTextoDers}
                infoDers={props.textoDers}
              />
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default Ders;
