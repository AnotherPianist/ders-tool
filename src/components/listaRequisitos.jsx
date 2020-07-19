import React from 'react';
import VerReq from "./verRequisito";
import Grid from '@material-ui/core/Grid';
import CrearRequisito from './CrearRequisito';

class ListaRequisitos extends React.Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {
            requisitos: [],
        };
        this.agregarRequisito = this.agregarRequisito.bind(this);
    }
   
    async getRequisitos() {   
        this.setState({
            requisitos: JSON.parse(localStorage.getItem("requisitos")),
            isLoaded: true
        });  
    }

    agregarRequisito(requisito) {
        this.setState((prevState) => {
            prevState.requisitos.push(requisito);
        });
    }

    render() {
        let itemsRequisitos = this.state.requisitos.map((item) => {
            return (
                <VerReq requisito = {item}/>
            );
        });
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
                    {listRU.map(ru => <VerReq requisito = {ru}/>) /*itemsRequisitos*/}
                </Grid>                 
            </Grid>
            <Grid item xs>
                <CrearRequisito agregarRequisito={this.agregarRequisito} />
            </Grid>
        </div>
        );
    }
} export default ListaRequisitos;