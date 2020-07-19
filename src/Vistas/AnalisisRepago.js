import React from "react";
import TablaAnalisisRepago from '../components/TablaAnalisisRepago';
import Divider from '@material-ui/core/Divider';

const AnalisisRepago = () => {
    const hola = 'Vista analisi de repago';

    return(
        <>
         <h1>
             Tabla de análisis de repago
         </h1>
         <div><TablaAnalisisRepago/></div>
         <h1>
             Información de la tabla
         </h1>
         <p>
         Lorem ipsum dolor sit amet, consectetur 
         adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim 
          veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ¿por que sigues leyendo?. Duis aute 
          irure dolor in reprehenderit in voluptate velit esse 
          cillum dolore eu fugiat nulla pariatur. 
         </p>
        </>
        
    );
}


export default AnalisisRepago;
  