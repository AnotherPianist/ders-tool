import React from 'react';
import { Typography, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, Container, TextField } from '@material-ui/core'

class PuntosFuncion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entrada: [0, 0, 0, 0, 0],
            salidas: [0, 0, 0, 0, 0],
            consultas: [0, 0, 0, 0, 0],
            ali: [0, 0, 0, 0, 0],
            ie: [0, 0, 0, 0, 0],
            subTotales: [0, 0, 0, 0, 0],
            total: 0,
        };

        this.updateEntradas = this.updateEntradas.bind(this);
        this.updateSalidas = this.updateSalidas.bind(this);
        this.updateConsultas = this.updateConsultas.bind(this);
        this.updateAli = this.updateAli.bind(this);
        this.updateIe = this.updateIe.bind(this);
        this.updateTotal = this.updateTotal.bind(this);
    };

    updateEntradas(e) {
        const valoresEntrada = this.state.entrada.slice();
        if (e.target.id === "e-S")
            valoresEntrada[1] = parseInt(e.target.value);
        else if (e.target.id === "e-M")
            valoresEntrada[2] = parseInt(e.target.value);
        else if (e.target.id === "e-Co")
            valoresEntrada[3] = parseInt(e.target.value);
        valoresEntrada[0] = valoresEntrada[1] + valoresEntrada[2] + valoresEntrada[3];
        valoresEntrada[4] = valoresEntrada[1] * 3 + valoresEntrada[2] * 7 + valoresEntrada[3] * 15;
        this.setState({ entrada: valoresEntrada });
        this.updateTotal(valoresEntrada[4], "Entradas");
    }

    updateSalidas(e) {
        const valoresSalida = this.state.salidas.slice();
        if (e.target.id === "s-S")
            valoresSalida[1] = parseInt(e.target.value);
        else if (e.target.id === "s-M")
            valoresSalida[2] = parseInt(e.target.value);
        else if (e.target.id === "s-Co")
            valoresSalida[3] = parseInt(e.target.value);
        valoresSalida[0] = valoresSalida[1] + valoresSalida[2] + valoresSalida[3];
        valoresSalida[4] = valoresSalida[1] * 3 + valoresSalida[2] * 7 + valoresSalida[3] * 15;
        this.setState({ salidas: valoresSalida });
        this.updateTotal(valoresSalida[4], "Salidas");
    }

    updateConsultas(e) {
        const valoresConsulta = this.state.consultas.slice();
        if (e.target.id === "c-S")
            valoresConsulta[1] = parseInt(e.target.value);
        else if (e.target.id === "c-M")
            valoresConsulta[2] = parseInt(e.target.value);
        else if (e.target.id === "c-Co")
            valoresConsulta[3] = parseInt(e.target.value);
        valoresConsulta[0] = valoresConsulta[1] + valoresConsulta[2] + valoresConsulta[3];
        valoresConsulta[4] = valoresConsulta[1] * 3 + valoresConsulta[2] * 7 + valoresConsulta[3] * 15;
        this.setState({ consultas: valoresConsulta });
        this.updateTotal(valoresConsulta[4], "Consultas");
    }

    updateAli(e) {
        const valoresAli = this.state.ali.slice();
        if (e.target.id === "a-S")
            valoresAli[1] = parseInt(e.target.value);
        else if (e.target.id === "a-M")
            valoresAli[2] = parseInt(e.target.value);
        else if (e.target.id === "a-Co")
            valoresAli[3] = parseInt(e.target.value);
        valoresAli[0] = valoresAli[1] + valoresAli[2] + valoresAli[3];
        valoresAli[4] = valoresAli[1] * 3 + valoresAli[2] * 7 + valoresAli[3] * 15;
        this.setState({ ali: valoresAli });
        this.updateTotal(valoresAli[4], "Ali");

    }



    updateTotal(nuevoValor, fuente)
    {
        const valorSubtotales = this.state.subTotales.slice();
        var valorTotal = this.state.total;
        if(fuente === "Entradas")
            valorSubtotales[0]=nuevoValor;
        else if(fuente === "Salidas")
            valorSubtotales[1]=nuevoValor;
        else if(fuente === "Consultas")
            valorSubtotales[2]=nuevoValor;
        else if(fuente === "Ali")
            valorSubtotales[3]=nuevoValor;
        else if(fuente === "Ie")
            valorSubtotales[4]=nuevoValor;

        valorTotal = valorSubtotales[0] + valorSubtotales[1] + valorSubtotales[2] + valorSubtotales[3] + valorSubtotales[4];
        this.setState({subTotales: valorSubtotales})
        this.setState({total: valorTotal });
        console.log(this.state.total);
    }

    updateIe(e) {
        const valoresIe = this.state.ie.slice();
        this.updateTotal(valoresIe[4], "Ie");
    }

    render() {
        return (

            <container style={{ margin: "40px" }}>

                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <Typography variant="h6">Puntos de Función</Typography>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="right">Cantidad</TableCell>
                                <TableCell align="right">Simple</TableCell>
                                <TableCell align="right">Media</TableCell>
                                <TableCell align="right">Compleja</TableCell>
                                <TableCell align="right">Total</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Entradas</TableCell>
                                <TableCell align="right"><TextField id="e-Ca" type="number" inputProps={{ min: "0" }} value={this.state.entrada[0]}  /></TableCell>
                                <TableCell align="right"><TextField id="e-S" type="number" inputProps={{ min: "0" }} onChange={this.updateEntradas} defaultValue={0} /></TableCell>
                                <TableCell align="right"><TextField id="e-M" type="number" inputProps={{ min: "0" }} onChange={this.updateEntradas} defaultValue={0} /></TableCell>
                                <TableCell align="right"><TextField id="e-Co" type="number" inputProps={{ min: "0" }} onChange={this.updateEntradas} defaultValue={0} /></TableCell>
                                <TableCell align="right"><TextField id="e-T" type="number" inputProps={{ min: "0" }}  value={this.state.entrada[4]} /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Salidas</TableCell>
                                <TableCell align="right"><TextField id="s-Ca" type="number" inputProps={{ min: "0" }} value={this.state.salidas[0]} /></TableCell>
                                <TableCell align="right"><TextField id="s-S" type="number" inputProps={{ min: "0" }} onChange={this.updateSalidas} defaultValue={0} /></TableCell>
                                <TableCell align="right"><TextField id="s-M" type="number" inputProps={{ min: "0" }} onChange={this.updateSalidas} defaultValue={0} /></TableCell>
                                <TableCell align="right"><TextField id="s-Co" type="number" inputProps={{ min: "0" }} onChange={this.updateSalidas} defaultValue={0} /></TableCell>
                                <TableCell align="right"><TextField id="s-T" type="number" inputProps={{ min: "0" }} value={this.state.salidas[4]} /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Consultas</TableCell>
                                <TableCell align="right"><TextField id="c-Ca" type="number" inputProps={{ min: "0" }} value={this.state.consultas[0]} /></TableCell>
                                <TableCell align="right"><TextField id="c-S" type="number" inputProps={{ min: "0" }} onChange={this.updateConsultas} defaultValue={0} /></TableCell>
                                <TableCell align="right"><TextField id="c-M" type="number" inputProps={{ min: "0" }} onChange={this.updateConsultas} defaultValue={0} /></TableCell>
                                <TableCell align="right"><TextField id="c-Co" type="number" inputProps={{ min: "0" }} onChange={this.updateConsultas} defaultValue={0} /></TableCell>
                                <TableCell align="right"><TextField id="c-T" type="number" inputProps={{ min: "0" }} value={this.state.consultas[4]} /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Archivos Lógicos Internos</TableCell>
                                <TableCell align="right"><TextField id="a-Ca" type="number" inputProps={{ min: "0" }} value={this.state.ali[0]} /></TableCell>
                                <TableCell align="right"><TextField id="a-S" type="number" inputProps={{ min: "0" }} onChange={this.updateAli} defaultValue={0} /></TableCell>
                                <TableCell align="right"><TextField id="a-M" type="number" inputProps={{ min: "0" }} onChange={this.updateAli} defaultValue={0} /></TableCell>
                                <TableCell align="right"><TextField id="a-Co" type="number" inputProps={{ min: "0" }} onChange={this.updateAli} defaultValue={0} /></TableCell>
                                <TableCell align="right"><TextField id="a-T" type="number" inputProps={{ min: "0" }} value={this.state.ali[4]} /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Interfaces Externas</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right">Total <TextField value={this.state.total}/></TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </container>

        );
    }

}

export default PuntosFuncion;


