import React, { useEffect, useState } from "react";
import EditorConvertToJSON from "./EditorConvertToJSON.js";
import { Container, Typography, makeStyles } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import draftToHtml from 'draftjs-to-html';
import jsPDF from 'jspdf';

/*function useInformacionDers() {
  useEffect(() => {
    fetch("/InformacionDers.json")
      .then((response) => response.json())
      .then((datos) => {
        setInfoDers(datos.data);
      });
  }, []);

  return infoDers;
}*/

function toPDF()
{
  
  var data = JSON.parse(localStorage.getItem("ders"));
  var htmlContent = "";
  for(var i = 0; i< data.length; i++)
    htmlContent += "<div> <h1>" + data[i].title + "</h1>" + draftToHtml(data[i].description) + "</div>";
  var doc = new jsPDF("p", "mm", "a4", true, "smart");
  doc.fromHTML(htmlContent, 15, 15, {
      'width': 170,
  });

  doc.save("DERS.pdf");
  console.log(htmlContent);
}

const Ders = (props) => {
  const { datosPreCargados } = props;
  //localStorage.removeItem("ders");
  const [infoDers, setInfoDers] = useState(
    localStorage.getItem("ders") == null
      ? dataDefault
      : JSON.parse(localStorage.getItem("ders"))
  );

  useEffect(() => {
    if (!datosPreCargados == null) {
      //setInfoDers(datosPreCargados);
    }
  }, []);

  return (
    <Container
      style={{
        backgroundColor: "#ffffff",
        paddingBlockEnd: 50,
      }}
    >
      <div>
        <h1>Documento DERS</h1>
        <Button variant="outlined" onClick={toPDF}>Descargar como PDF</Button>
      </div>
      
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

export let dataDefault = [
  {
    title: "Introducción",
    description: {
      blocks: [
        {
          key: "637gr",
          text:
            " [En esta introducción se describe brevemente el contexto, objetivos y alcance del sistema a desarrollar, así como la documentación relativa al mismo. Esta información está basada en el Documentode Proposición de Proyecto (DPP) de Sistemade Ejemplo. ]",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 2,
              length: 247,
              style: "fontfamily-Arial, sans-serif",
            },
            {
              offset: 2,
              length: 249,
              style: "BOLD",
            },
          ],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    },
  },
  {
    title: "Propósito del Sistema",
    description: {
      blocks: [
        {
          key: "637gr",
          text:
            " [Describir aquí qué hace y qué es el sistema. Para  proyectos pequeños, media página debería ser más que suficiente.]  ",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 119,
              style: "BOLD",
            },
            {
              offset: 1,
              length: 117,
              style: "fontfamily-Arial, sans-serif",
            },
          ],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    },
  },
  {
    title: "Alcance del Proyecto",
    description: {
      blocks: [
        {
          key: "637gr",
          text:
            " [Describir hasta dónde llega el proyecto: qué es y qué no es. Para proyectos pequeños, media página debería ser más que suficiente.]  ",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 135,
              style: "BOLD",
            },
            {
              offset: 1,
              length: 132,
              style: "fontfamily-Arial, sans-serif",
            },
          ],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    },
  },
  {
    title: "Contexto",
    description: {
      blocks: [
        {
          key: "637gr",
          text:
            "[Dar información respecto del contexto del desarrollo y el contexto en el que se tiene que insertar el sistema. Tecnologías que estarán involucradas, trabajos previos, vínculos con otros sistemas, etc. Escriba lo que necesite, en general los gráficos son bienvenidos, pues ayudan mucho a la  comprensión]",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 304,
              style: "BOLD",
            },
          ],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    },
  },
  {
    title: "Definiciones, Acrónimos y Abreviaturas",
    description: {
      blocks: [
        {
          key: "637gr",
          text:
            "[Indique aquí la definición de las “palabras claves” (o keywords) que se emplearán en el documento, y que el lector no necesariamente conoce. De la misma manera, coloque el significado de todas siglas o abreviaturas que se empleen. Tanto las siglas como las definiciones tienen que expresar lo que el/los autores del documento entienden, y no necesariamente dar definiciones generales. La idea es poder entender en toda su magnitud el documento que se está leyendo, y nada más. La lista DEBE estar en orden alfabético para facilitar la búsqueda de conceptos. Ejemplos de definiciones, siglas y abreviaturas son las siguientes:",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 626,
              style: "BOLD",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "8738t",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: "alokg",
          text:
            "Comunicación Wireless: Tipo de comunicación de datos que se efectúa a través de antenas embebidas o adosadas a dispositivos computacionales.",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 140,
              style: "color-rgb(84,172,210)",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "a6a3m",
          text:
            "TCP (Transmisión Control Protocol): Protocolo de comunicación de datos orientado a la conexión. Generalmente usado en redes de computadoras.",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 140,
              style: "color-rgb(84,172,210)",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "deb1v",
          text:
            "URD (User Requirement Document): Documento que expresa los requisitos de los usuarios/clientes de un sistema.",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 109,
              style: "color-rgb(84,172,210)",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "5ksmq",
          text:
            "REP_1: Se le llamará de esta manera a los reportes de ventas que el sistema debe emitir al finalizar la jornada laboral.]",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 120,
              style: "color-rgb(84,172,210)",
            },
          ],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    },
  },
  {
    title: "Referencias",
    description: {
      blocks: [
        {
          key: "637gr",
          text:
            "[Enumere la documentación y bibliografía utilizada como apoyo para construir este documento. Coloque fechas y versiones de documentos cuando corresponda. Por ejemplo:",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 166,
              style: "BOLD",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "9ej7g",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: "feu3v",
          text:
            "1.\tESA Software Engineering Standards”. PSS-05-0 Issue 2. ESA Board for Software Standardization and Control (BSSC) - European Space Agency. (1991).  URL: www.ess.co.at/ECOSIM/ESA.txt. ",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 185,
              style: "BOLD",
            },
            {
              offset: 0,
              length: 185,
              style: "color-rgb(84,172,210)",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "d5jop",
          text: "2.\tURD (User Requirement Document) 3.1.",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 39,
              style: "BOLD",
            },
            {
              offset: 0,
              length: 39,
              style: "color-rgb(84,172,210)",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "17snc",
          text: "3.\tSRD (Software Requirement Document) 2.0.]",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 44,
              style: "BOLD",
            },
            {
              offset: 0,
              length: 43,
              style: "color-rgb(84,172,210)",
            },
          ],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    },
  },
  {
    title: "Descripción General",
    description: {
      blocks: [
        {
          key: "637gr",
          text:
            "Esta sección describe los requisitos funcionales de los Usuarios/Clientes (sección 2.1sistema, sus interfaces externa, las condiciones de excepción y las clases de pruebas que se harán para verificar que los requisitos se cumplen.",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 230,
              style: "BOLD",
            },
          ],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    },
  },
  {
    title: "Características de los Usuarios",
    description: {
      blocks: [
        {
          key: "637gr",
          text:
            "[Acá se deben identificar los tipos de usuarios, los atributos generales de cada tipo y la cantidad de personas en cada categoría. ]",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 132,
              style: "BOLD",
            },
          ],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    },
  },
  {
    title: "Perspectiva del Producto según los Usuarios/Clientes",
    description: {
      blocks: [
        {
          key: "637gr",
          text:
            "[Acá debe colocarse la perspectiva que tienen los clientes y los usuarios acerca del producto. Cada tipo de usuario tiene diferentes expectativas, y cada tipo de cliente también. El cliente es el que aporta la visión de la organización. Eso debería estar expresado acá. Basta con colocar una oración por cada tipo de usuario y cliente]",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 335,
              style: "BOLD",
            },
          ],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    },
  },
  {
    title: "Ambiente Operacional de la Solución",
    description: {
      blocks: [
        {
          key: "637gr",
          text:
            "[Acá se describen brevemente los componentes principales del ambiente operacional, donde deberá vivir la solución que está siendo desarrollada. Esto puede describir el escenario actual, o bien el futuro, si es que se realizará una compra de equipamiento. Por ejemplo:",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 267,
              style: "BOLD",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "1sctp",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: "ajp0f",
          text:
            "El ambiente operacional involucrado en este sistema es el siguiente:",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 68,
              style: "BOLD",
            },
            {
              offset: 0,
              length: 68,
              style: "color-rgb(44,130,201)",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "au2rr",
          text:
            "El sistema funcionará un servidor con las siguientes características:",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 69,
              style: "BOLD",
            },
            {
              offset: 0,
              length: 69,
              style: "color-rgb(44,130,201)",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "54k4c",
          text: "pentium de 2,4 Ghz, con ",
          type: "unordered-list-item",
          depth: 1,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 24,
              style: "BOLD",
            },
            {
              offset: 0,
              length: 24,
              style: "color-rgb(44,130,201)",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "6ifub",
          text: "mother board D845 ",
          type: "unordered-list-item",
          depth: 1,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 18,
              style: "BOLD",
            },
            {
              offset: 0,
              length: 18,
              style: "color-rgb(44,130,201)",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "6rea2",
          text: "1,5 G Ram DDR",
          type: "unordered-list-item",
          depth: 1,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 13,
              style: "BOLD",
            },
            {
              offset: 0,
              length: 13,
              style: "color-rgb(44,130,201)",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "1842e",
          text: "2 disco scsi 18 Gb Barracuda ",
          type: "unordered-list-item",
          depth: 1,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 29,
              style: "BOLD",
            },
            {
              offset: 0,
              length: 29,
              style: "color-rgb(44,130,201)",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "adhnj",
          text: "2 interfaces de red D-link 10/100 ",
          type: "unordered-list-item",
          depth: 1,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 34,
              style: "BOLD",
            },
            {
              offset: 0,
              length: 34,
              style: "color-rgb(44,130,201)",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "4si2b",
          text:
            "El servidor funciona con un sistema operativo Redhat 8 (con actualizaciones al dia). Este servidor posee una configuración orientada a la prestación de servicios web con características de seguridad y funcionalidad del más alto nivel. Como servidor web, SID utiliza Apache 2.0.40 con el módulo PHP4 y con el módulo SSL. Este último permite al servidor establecer conexiones seguras del tipo HTTPS. El sistema de gestión estará implementado en PHP4 y será accesible desde Internet y poseerá una base de datos propia. Además deberá mirar la información de la base de datos del Workflow, que estará presente en el mismo servidor.",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 626,
              style: "BOLD",
            },
            {
              offset: 0,
              length: 626,
              style: "color-rgb(44,130,201)",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "d4hoh",
          text:
            "Las bases de datos MySQL utilizadas por el sistema están funcionando en el mismo servidor SID. La versión instalada de MySQL es la 3.23.55a (mysql-max). La aplicación deberá ser usable desde los browsers MSIE 5.0, Netscape 4.78, Opera 7.0 y Konqueror 3.04.",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 256,
              style: "BOLD",
            },
            {
              offset: 0,
              length: 256,
              style: "color-rgb(44,130,201)",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "bfnl7",
          text:
            "Para un buen funcionamiento del sistema, el usuario deberá acceder a él a través de un computador que tenga por lo menos las capacidades de un PC pentium III de 300 MHz con 64 MB de RAM, con un monitor de 17 pulgadas con una resolución de 1024x768 pixeles.",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 256,
              style: "BOLD",
            },
            {
              offset: 0,
              length: 256,
              style: "color-rgb(44,130,201)",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "4uiq3",
          text:
            "La comunicación al interior de la organización se realiza a través de redes Ethernet a 100mbps cabladas con UTP, cat.5, y redes wireless IEEE 802.11b/g a 10Mbps. Ambos tipos de redes utilizan TCP/IP como protocolo de comunicación. Para la macro-distribución de paquetes se emplean mayoritariamente routers y switches inteligentes.]",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 331,
              style: "BOLD",
            },
            {
              offset: 0,
              length: 330,
              style: "color-rgb(44,130,201)",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "fkhk1",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    },
  },
  {
    title: "Relación con Otros Proyectos",
    description: {
      blocks: [
        {
          key: "637gr",
          text:
            "[Acá de debe especificar si este proyecto tiene relación con algún sistema ya implementado, con otro proyecto en ejecución o planificado. Por ejemplo:",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 150,
              style: "BOLD",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "6psn",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: "4ifnf",
          text:
            "El sistema no depende de otros sistemas, ni otros sistemas dependen de él. Sin embargo, por ser un proyecto para el DCC en el cual se involucran usuarios pertenecientes al DCC existe una relación de coordinación con otros sistemas asociados al manejo de perfiles de usuario, ya sea para académicos, alumnos, secretarias u otros.  ",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 330,
              style: "BOLD",
            },
            {
              offset: 0,
              length: 330,
              style: "color-rgb(44,130,201)",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "3png",
          text:
            "En particular, el manejo de usuarios del sistema estará integrado con otros 2 proyectos que se están desarrollando actualmente para el DCC, estos son: el sistema de administración de publicaciones científicas (grupo 6, curso cc51a) y el sistema contable del PEC (grupo 5, curso cc51a). Así el acceso al sistema se realizará en forma conjunta con los otros 2 sistemas a través del sitio Web del DCC cuya dirección es: www.dcc.uchile.cl, mediante el ingreso de un username y un password de cada usuario y en forma directa para académicos conectados desde su PC en el DCC. Esto creará una sesión del usuario, que podrá ingresar al sitio de nuestro proyecto con el rol que tenga asignado. Esto será muy conveniente para usuarios de los 3 sistemas, principalmente académicos ya que tendrán un identificador común para todos los sistemas ingresando a cualquiera de ellos en forma de una Intranet.",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 890,
              style: "BOLD",
            },
            {
              offset: 0,
              length: 890,
              style: "color-rgb(44,130,201)",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "2c3kv",
          text:
            "Esto significará una coordinación asociada a usuarios entre los 3 sistemas en cuanto a un manejo común de tablas asociadas a usuarios, la coordinación estará a cargo del auxiliar del curso Renzo Angles. Además los sistemas deberán tener un look & feel similar al sitio actual del DCC, ocupando los mismos CSS que el sitio del DCC.]",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 0,
              length: 331,
              style: "BOLD",
            },
            {
              offset: 0,
              length: 330,
              style: "color-rgb(44,130,201)",
            },
          ],
          entityRanges: [],
          data: {},
        },
        {
          key: "bs2vg",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
        {
          key: "fkhk1",
          text: "",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    },
  },
  {
    title: "Descripción del Modelo",
    description: {
      blocks: [
        {
          key: "637gr",
          text:
            " [Aquí hay que presentar un diagrama general de casos de uso, diagrama de bloques o bien un DFD de nivel 1 o 2, que refleje el funcionamiento actual. En caso de ser necesario, se puede agregar una explicación del funcionamiento general del sistema actual.]",
          type: "unordered-list-item",
          depth: 0,
          inlineStyleRanges: [
            {
              offset: 2,
              length: 247,
              style: "fontfamily-Arial, sans-serif",
            },
            {
              offset: 2,
              length: 249,
              style: "BOLD",
            },
          ],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    },
  },
];
