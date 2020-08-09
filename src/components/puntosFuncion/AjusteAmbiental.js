import React from 'react';
import { Typography, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, TextField } from '@material-ui/core'

class AjusteAmbiental extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          valores: [0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0],
          total: 0
        };
      };

    updateTabla = async (e) => {
        const valoresTabla = this.state.valores.slice();
        if (e.target.id === "CdD")
            valoresTabla[0] = parseInt(e.target.value);
        else if (e.target.id === "PdDD")
            valoresTabla[1] = parseInt(e.target.value);
        else if (e.target.id === "NdE")
            valoresTabla[2] = parseInt(e.target.value);
        else if (e.target.id === "CMU")
            valoresTabla[3] = parseInt(e.target.value);
        else if (e.target.id === "NdT")
            valoresTabla[4] = parseInt(e.target.value);
        else if (e.target.id === "CdDO")
            valoresTabla[5] = parseInt(e.target.value);
        else if (e.target.id === "EdUF")
            valoresTabla[6] = parseInt(e.target.value);
        else if (e.target.id === "AO")
            valoresTabla[7] = parseInt(e.target.value);
        else if (e.target.id === "PC")
            valoresTabla[8] = parseInt(e.target.value);
        else if (e.target.id === "R")
            valoresTabla[9] = parseInt(e.target.value);
        else if (e.target.id === "FdI")
            valoresTabla[10] = parseInt(e.target.value);
        else if (e.target.id === "FdO")
            valoresTabla[11] = parseInt(e.target.value);
        else if (e.target.id === "IM")
            valoresTabla[12] = parseInt(e.target.value);
        else if (e.target.id === "FdM")
            valoresTabla[13] = parseInt(e.target.value);
        await this.setState({ valores: valoresTabla });
        this.updateTotal();
        
      }

    updateTotal = async () => {
        const lista = this.state.valores;
        let totalTabla = 0;
        lista.forEach((item) => {
            totalTabla += item
        })
        totalTabla = (0.65 + totalTabla*(0.01)).toFixed(2);
        await this.setState({total: totalTabla});
      }
    
      

    render() {
      return (
        <>
            <TableContainer component={Paper} style={{margin: "3rem"}}>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell align="left">Factor</TableCell>
                <TableCell align="left"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                <TableCell align="left">Comunicación de Datos</TableCell>
                <TableCell align="left"><TextField id="CdD" type="number" onChange={this.updateTabla} inputProps={{ min: "0", max: "5"}} value={this.state.valores[0]} /></TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="left">Procesamiento de Datos Distribuídos</TableCell>
                <TableCell align="left"><TextField id="PdDD" type="number" onChange={this.updateTabla} inputProps={{ min: "0", max: "5"}} value={this.state.valores[1]} /></TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="left">Nivel de Ejecución</TableCell>
                <TableCell align="left"><TextField id="NdE" type="number" onChange={this.updateTabla} inputProps={{ min: "0", max: "5"}} value={this.state.valores[2]} /></TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="left">Configuración Más Usada</TableCell>
                <TableCell align="left"><TextField id="CMU" type="number" onChange={this.updateTabla} inputProps={{ min: "0", max: "5"}} value={this.state.valores[3]} /></TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="left">Nivel de Transacciones</TableCell>
                <TableCell align="left"><TextField id="NdT" type="number" onChange={this.updateTabla} inputProps={{ min: "0", max: "5"}} value={this.state.valores[4]} /></TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="left">Captura de Datos Online</TableCell>
                <TableCell align="left"><TextField id="CdDO" type="number" onChange={this.updateTabla} inputProps={{ min: "0", max: "5"}} value={this.state.valores[5]} /></TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="left">Eficiencia del Usuario Final</TableCell>
                <TableCell align="left"><TextField id="EdUF" type="number" onChange={this.updateTabla} inputProps={{ min: "0", max: "5"}} value={this.state.valores[6]} /></TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="left">Actualización Online</TableCell>
                <TableCell align="left"><TextField id="AO" type="number" onChange={this.updateTabla} inputProps={{ min: "0", max: "5"}} value={this.state.valores[7]} /></TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="left">Procesamiento Complejo</TableCell>
                <TableCell align="left"><TextField id="PC" type="number" onChange={this.updateTabla} inputProps={{ min: "0", max: "5"}} value={this.state.valores[8]} /></TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="left">Reusabilidad</TableCell>
                <TableCell align="left"><TextField id="R" type="number" onChange={this.updateTabla} inputProps={{ min: "0", max: "5"}} value={this.state.valores[9]} /></TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="left">Facilidad de Instalación</TableCell>
                <TableCell align="left"><TextField id="FdI" type="number" onChange={this.updateTabla} inputProps={{ min: "0", max: "5"}} value={this.state.valores[10]} /></TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="left">Facilidad de Operación</TableCell>
                <TableCell align="left"><TextField id="FdO" type="number" onChange={this.updateTabla} inputProps={{ min: "0", max: "5"}} value={this.state.valores[11]} /></TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="left">Instalaciones Múltiples</TableCell>
                <TableCell align="left"><TextField id="IM" type="number" onChange={this.updateTabla} inputProps={{ min: "0", max: "5"}} value={this.state.valores[12]} /></TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="left">Facilidad de Mantenimiento</TableCell>
                <TableCell align="left"><TextField id="FdM" type="number" onChange={this.updateTabla} inputProps={{ min: "0", max: "5"}} value={this.state.valores[13]} /></TableCell>
                </TableRow>
            </TableBody>
            </Table>
            </TableContainer>
      <Typography variant="h6" align="left" style={{margin: "3rem"}}>Factor de ajuste de complejidad: {this.state.total}</Typography>
        </>
      );
    }
  }

export default AjusteAmbiental