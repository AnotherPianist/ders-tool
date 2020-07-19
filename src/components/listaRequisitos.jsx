import React from 'react';
import CrearReq from './crearRequisito';
import VerReq from "./verRequisito";
import Grid from '@material-ui/core/Grid';

class ListaRequisitos extends React.Component 
{
    constructor(props) 
    {
        super(props);
    }

    render() 
    {
        //data dummy para testing
        const listRU = 
        [
            {
                id : 1,
                tipo : "Funcional",
                requisitoNombre : "RU1"
            },
            {
                id : 2,
                tipo : "No Funcional",
                requisitoNombre : "requisito de prueba"
            }
        ];
        return (
        <div>
            <Grid component="label" container alignItems="center" spacing = {2}>
                <Grid item xs>
                    {listRU.map(ru => <VerReq requisito = {ru}/>)}
                </Grid>                 
            </Grid>
            <Grid item xs>
                <CrearReq/>
            </Grid>
        </div>
        );
    }
} export default ListaRequisitos;