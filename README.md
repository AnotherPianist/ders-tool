Es importante tener instalado NodeJS para trabajar en el desarrollo del proyecto.
[Link a NodeJS](https://nodejs.org).

## Iniciar el proyecto

Para iniciar el proyecto, desde la terminal o línea de comandos navegar hacia el directorio del proyecto y ejecutar el comando

### `npm start`

Este comando levantará un servidor local en [http://localhost:3000](http://localhost:3000) para visualizar el proyecto en el navegador.<br />

La página se actualizará automáticamente cada vez que se guarda algún cambio en el código.<br />
También se puede acceder a la consola del navegador para visualizar los mensajes de errores que puedan surgir.


### `npm test`

Este comando inicia el proyecto, ejecutando también los tests que se hayan programado.<br />
Más información en [running tests](https://facebook.github.io/create-react-app/docs/running-tests).


### `npm run build`

Este comando compila el proyecto para ser puesto en un servidor. Solamente será utilizado cuando el proyecto esté en un grado de madurez suficiente, no tiene impacto para el desarrollo.

## Aprender más

Pueden tener más información en la [página oficial de React](https://reactjs.org/).

## Librerías de diseño

El proyecto sigue las líneas de diseño de Material Design. Para esto se utilizará la librería [material-ui](https://material-ui.com/). En la barra de la izquierda se muestra la lista de componentes que la librería ofrece, junto a su código correspondiente. Para añadir esos componentes se importa el componente en las primeras líneas del código con la instrucción `import { NombreComponenteMaterialUI } from '@material-ui/core';` y se utiliza dentro de la parte gráfica del componente a desarrollar (dentro del `return()` si es una función o en el return del método `render()` si es una clase) como si fuera una etiqueta HTML: `<NombreComponenteMaterialUI atributo="valor"/>`. De cualquier forma, la sección Components de la [página](https://material-ui.com/) tiene ejemplos para cada componente.<br/>

También, si lo desean, pueden utilizar `CSS` para darle un estilo propio al componente. Más información respecto a esto [aquí](https://material-ui.com/styles/basics/).

Por último, Material-UI también ofrece su propia lista de íconos acorde a la línea de diseño. Información de cómo usarlos se encuentra [aquí](https://material-ui.com/components/icons/) y la lista completa de íconos disponibles se encuentra [aquí](https://material-ui.com/components/material-icons/).
